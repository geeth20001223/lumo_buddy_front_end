import { getChildForCurrentParent } from "./children";
import { supabase } from "./supabase";
import { calculateSurveyScores, predictLevelFromScores } from "./survey-scoring";
import { calculateAreaRecommendations } from "./area-recommendations";
import { SURVEY_QUESTIONS_DATA, AREA_CONFIG } from "./survey-questions-data";

import type {
  AssessmentResult,
  SurveyAnswers,
  SurveyQuestion,
} from "@/types/survey";

export class SurveyFlowError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "SurveyFlowError";
  }
}

/**
 * Returns the active 24 survey questions (6 per game category).
 * Loads from Supabase `survey_questions` if updated with all 24 questions & options.
 * Falls back safely to authoritative local questions data if DB has not run migration yet.
 */
export async function getSurveyQuestions(): Promise<SurveyQuestion[]> {
  try {
    const { data, error } = await supabase
      .from("survey_questions")
      .select("id, area, question, sort_order, is_active, options, feature_name")
      .eq("is_active", true)
      .order("sort_order", { ascending: true });

    // Check if Supabase contains the questions with options and at least 20 items
    if (!error && data && data.length >= 20) {
      const hasValidOptions = data.some(
        (row: Record<string, unknown>) => Array.isArray(row.options) && row.options.length > 0,
      );

      if (hasValidOptions) {
        return data.map((row: Record<string, unknown>, idx: number) => {
          // Match by sort_order first (most reliable), then by db_id, then by question text
          const fallbackMatch = SURVEY_QUESTIONS_DATA.find(
            (q) => q.sort_order === Number(row.sort_order)
          ) || SURVEY_QUESTIONS_DATA.find(
            (q) => q.db_id === Number(row.id)
          ) || SURVEY_QUESTIONS_DATA.find(
            (q) => q.question.toLowerCase() === String(row.question).toLowerCase()
          );

          let parsedOptions: string[] = [];
          if (Array.isArray(row.options)) {
            parsedOptions = row.options as string[];
          } else if (typeof row.options === "string") {
            try {
              parsedOptions = JSON.parse(row.options);
            } catch {
              parsedOptions = fallbackMatch?.options || [];
            }
          } else {
            parsedOptions = fallbackMatch?.options || [];
          }

          const areaKey = (row.area as string) || fallbackMatch?.area || "emotion";
          const areaCfg = AREA_CONFIG[areaKey];

          // Always use the local slug as `id` so answers keyed by slug are found during scoring
          const questionId = fallbackMatch?.id || `q_${Number(row.id) || idx + 1}`;

          return {
            id: questionId,
            db_id: Number(row.id) || idx + 1,
            area: areaKey,
            area_label: fallbackMatch?.area_label || areaCfg?.label || "Development Area",
            area_icon: fallbackMatch?.area_icon || areaCfg?.icon || "✨",
            question: (row.question as string) || fallbackMatch?.question || "",
            feature_name: (row.feature_name as string) || fallbackMatch?.feature_name || (row.question as string),
            sort_order: Number(row.sort_order) || idx + 1,
            is_active: Boolean(row.is_active ?? true),
            options: parsedOptions.length > 0 ? parsedOptions : (fallbackMatch?.options || []),
          };
        });
      }
    }
  } catch (err) {
    console.warn("[Lumo Buddy] DB questions fetch fallback to local questions:", err);
  }

  // Authoritative fallback: Local 24 questions (6 questions x 4 game categories)
  return SURVEY_QUESTIONS_DATA.map((q) => ({
    id: q.id,
    db_id: q.db_id,
    area: q.area,
    area_label: q.area_label,
    area_icon: q.area_icon,
    question: q.question,
    feature_name: q.feature_name,
    sort_order: q.sort_order,
    is_active: true,
    options: q.options,
  }));
}

export async function submitSurvey({
  answers,
  childId,
  questions,
}: {
  answers: SurveyAnswers;
  childId: string;
  questions: SurveyQuestion[];
}) {
  await getChildForCurrentParent(childId);

  // ── Step 1: Calculate developmental area scores (0-18 each) & total (0-72) ─
  const scores = calculateSurveyScores(questions, answers);

  const areaRecommendations = calculateAreaRecommendations({
    emotion_score: scores.emotion_score,
    cognitive_score: scores.cognitive_score,
    self_awareness_score: scores.self_awareness_score,
    math_score: scores.math_score,
  });

  // ── Step 2: Unplugged model - Predict level directly from 24 question scores ─
  const prediction = predictLevelFromScores(scores);

  // ── Step 3: Save assessment to Supabase ──────────────────────────────────
  const { data: assessment, error: assessmentError } = await supabase
    .from("assessments")
    .insert({
      child_id: childId,
      emotion_score: scores.emotion_score,
      cognitive_score: scores.cognitive_score,
      self_awareness_score: scores.self_awareness_score,
      math_score: scores.math_score,
      total_score: scores.total_score,
      predicted_level: prediction.predicted_level,
      recommendation: prediction.recommendation,
      emotion_level: areaRecommendations.emotion_level,
      cognitive_level: areaRecommendations.cognitive_level,
      self_awareness_level: areaRecommendations.self_awareness_level,
      math_level: areaRecommendations.math_level,
      main_support_area: areaRecommendations.main_support_area,
      strongest_area: areaRecommendations.strongest_area,
    })
    .select(
      "id, child_id, emotion_score, cognitive_score, self_awareness_score, math_score, total_score, predicted_level, recommendation, emotion_level, cognitive_level, self_awareness_level, math_level, main_support_area, strongest_area, created_at",
    )
    .single<AssessmentResult>();

  if (assessmentError || !assessment) {
    try {
      const errObj: Record<string, unknown> = {};
      Object.getOwnPropertyNames(assessmentError ?? {}).forEach((k) => {
        errObj[k] = (assessmentError as unknown as Record<string, unknown>)[k];
      });
      console.error("[Lumo Buddy] Assessment insert failed:", JSON.stringify(errObj, null, 2));
    } catch {
      console.error("[Lumo Buddy] Assessment insert failed (could not serialize error)");
    }
    throw new SurveyFlowError("assessment_save_failed");
  }

  // ── Step 4: Silently save confidence metadata if column exists ───────────
  if (prediction.confidence != null) {
    supabase
      .from("assessments")
      .update({ confidence: prediction.confidence })
      .eq("id", assessment.id)
      .then(({ error }) => {
        if (error) {
          console.warn("[Lumo Buddy] Could not save confidence:", error.message);
        }
      });
  }

  // ── Step 5: Save individual survey responses ─────────────────────────────
  const responseRows = questions.map((question, index) => {
    const rawVal = answers[question.id] ?? answers[question.question];
    const optionIndex = question.options.findIndex((opt) => opt === rawVal);

    return {
      assessment_id: assessment.id,
      child_id: childId,
      question_id: question.db_id || index + 1,
      answer_score: optionIndex >= 0 ? optionIndex + 1 : 1,
      answer_text: typeof rawVal === "string" ? rawVal : String(rawVal ?? ""),
    };
  });

  const { error: responsesError } = await supabase
    .from("survey_responses")
    .insert(responseRows);

  if (responsesError) {
    console.error("[Lumo Buddy] Survey responses save failed:", {
      code: responsesError.code,
      message: responsesError.message,
    });
    // If responses fail due to FK mismatch (e.g. old question IDs vs new), we still let the assessment succeed
    // so the parent is not blocked from game unlocks and results.
  }

  return assessment;
}

export async function getLatestAssessmentForCurrentParent(childId: string) {
  await getChildForCurrentParent(childId);

  const { data, error } = await supabase
    .from("assessments")
    .select(
      "id, child_id, emotion_score, cognitive_score, self_awareness_score, math_score, total_score, predicted_level, recommendation, emotion_level, cognitive_level, self_awareness_level, math_level, main_support_area, strongest_area, created_at",
    )
    .eq("child_id", childId)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle<AssessmentResult>();

  if (error) {
    throw new SurveyFlowError("assessment_load_failed");
  }

  return data;
}
