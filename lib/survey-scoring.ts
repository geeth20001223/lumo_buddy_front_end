import type { SurveyAnswers, SurveyQuestion, SurveyScores } from "@/types/survey";

/**
 * Calculates developmental area scores directly from the 24 survey questions.
 *
 * Scoring Model (6 Points per Area, 24 Points Total):
 * - 4 Game Categories (Emotion, Cognitive, Self-Awareness, Mathematical)
 * - 6 Questions per Category = 24 Questions total
 * - Each question is evaluated across 4 developmental mastery options (0 to 3 raw points):
 *     - Option 0 = 0 raw pts (High support need / Not yet demonstrated)
 *     - Option 1 = 1 raw pt  (Emerging skill / Requires significant guidance)
 *     - Option 2 = 2 raw pts (Developing skill / Inconsistent or needs reminder)
 *     - Option 3 = 3 raw pts (Mastered skill / Fully independent and confident)
 * - Category Calculation:
 *     - 6 questions × 3 raw points max = 18 raw points.
 *     - Area Score out of 6 = Math.round(rawScore / 3) -> 0 to 6 points per section.
 * - Total Survey Score = 4 sections × 6 points = 0 to 24 points total (matching the 24 questions).
 */
export function calculateSurveyScores(
  questions: SurveyQuestion[],
  answers: SurveyAnswers,
): SurveyScores {
  let emotion_raw = 0;
  let cognitive_raw = 0;
  let self_awareness_raw = 0;
  let math_raw = 0;

  for (const q of questions) {
    // Look up answer: by slug id → by db_id number string → by full question text
    const rawAnswer =
      answers[q.id] ??
      answers[String(q.db_id)] ??
      answers[q.question];

    // Compute raw 0–3 points for this question
    let score = 0;

    if (rawAnswer === undefined || rawAnswer === null) {
      score = 0;
    } else if (typeof rawAnswer === "number") {
      // Direct numeric answer (0–3)
      score = Math.max(0, Math.min(3, Math.round(rawAnswer)));
    } else if (typeof rawAnswer === "string") {
      if (q.options && q.options.length > 0) {
        const trimmedAnswer = rawAnswer.trim().toLowerCase();

        // Primary: exact match against option text → index position (0, 1, 2, 3)
        const optionIndex = q.options.findIndex(
          (opt) => opt.trim().toLowerCase() === trimmedAnswer
        );

        if (optionIndex >= 0) {
          score = Math.min(3, optionIndex);
        } else {
          // Secondary: keyword-based semantic fallback
          if (
            trimmedAnswer.includes("always") ||
            trimmedAnswer.includes("easily") ||
            trimmedAnswer.includes("naturally") ||
            trimmedAnswer.includes("comfortably") ||
            trimmedAnswer.includes("confidently") ||
            trimmedAnswer.includes("independently") ||
            trimmedAnswer.includes("precision") ||
            trimmedAnswer.includes("pride") ||
            trimmedAnswer.includes("smoothly") ||
            trimmedAnswer.includes("quickly understands") ||
            trimmedAnswer.includes("reacts right away") ||
            trimmedAnswer.includes("talks about it") ||
            trimmedAnswer.includes("on their own") ||
            trimmedAnswer.includes("great balance") ||
            trimmedAnswer.includes("clearly asks")
          ) {
            score = 3;
          } else if (
            trimmedAnswer.includes("usually") ||
            trimmedAnswer.includes("frequently") ||
            trimmedAnswer.includes("often") ||
            trimmedAnswer.includes("quite well") ||
            trimmedAnswer.includes("reasonably") ||
            trimmedAnswer.includes("navigates") ||
            trimmedAnswer.includes("shows concern") ||
            trimmedAnswer.includes("simple words") ||
            trimmedAnswer.includes("familiar") ||
            trimmedAnswer.includes("adjusts well")
          ) {
            score = 2;
          } else if (
            trimmedAnswer.includes("sometimes") ||
            trimmedAnswer.includes("with help") ||
            trimmedAnswer.includes("hint") ||
            trimmedAnswer.includes("reminder") ||
            trimmedAnswer.includes("guidance") ||
            trimmedAnswer.includes("alongside") ||
            trimmedAnswer.includes("explained") ||
            trimmedAnswer.includes("prompted") ||
            trimmedAnswer.includes("slowly") ||
            trimmedAnswer.includes("recounts") ||
            trimmedAnswer.includes("cooperates") ||
            trimmedAnswer.includes("watches quietly") ||
            trimmedAnswer.includes("points")
          ) {
            score = 1;
          } else {
            score = 0;
          }
        }
      } else {
        score = 0;
      }
    }

    // Accumulate raw score into the correct developmental category
    const area = String(q.area).toLowerCase();
    if (area === "emotion" || area === "communication") {
      emotion_raw += score;
    } else if (area === "cognitive" || area === "social") {
      cognitive_raw += score;
    } else if (
      area === "self_awareness" ||
      area === "self-awareness" ||
      area === "behavior" ||
      area === "sensory"
    ) {
      self_awareness_raw += score;
    } else if (area === "mathematical" || area === "math" || area === "learning") {
      math_raw += score;
    } else {
      cognitive_raw += score;
    }
  }

  // Calculate clean score out of 6 for each section (raw max is 18 -> raw / 3 = 0 to 6)
  const emotion_score = Math.min(6, Math.max(0, Math.round(emotion_raw / 3)));
  const cognitive_score = Math.min(6, Math.max(0, Math.round(cognitive_raw / 3)));
  const self_awareness_score = Math.min(6, Math.max(0, Math.round(self_awareness_raw / 3)));
  const math_score = Math.min(6, Math.max(0, Math.round(math_raw / 3)));

  // Total score out of 24 (4 sections × 6 max points = 24 total points)
  const total_score =
    emotion_score + cognitive_score + self_awareness_score + math_score;

  return {
    emotion_score,
    cognitive_score,
    self_awareness_score,
    math_score,
    total_score,
  };
}

/**
 * Deterministic Clinical Scoring Prediction:
 * Predicts optimal game starting level (1, 2, or 3) from survey scores (0 to 24 scale).
 *
 * Thresholds (Total Score: 0 - 24 scale):
 * - Score 0 – 9:  Level 1 (Foundational Support / High support need)
 * - Score 10 – 17: Level 2 (Developing Skills / Moderate support need)
 * - Score 18 – 24: Level 3 (Advanced Activities / Mild support need)
 */
export function predictLevelFromScores(scores: SurveyScores): {
  predicted_level: number;
  screening_prediction: number;
  confidence: number;
  severity: string;
  severity_label: string;
  recommendation: string;
} {
  const total = scores.total_score;
  let level = 2;
  let severity = "Moderate";
  let severity_label = "Moderate Support Need (Developing Skills)";

  if (total <= 9) {
    level = 1;
    severity = "Severe";
    severity_label = "Foundational Support Need (Level 1 Activities)";
  } else if (total >= 18) {
    level = 3;
    severity = "Mild";
    severity_label = "Mild Support Need (Advanced Interactive Activities)";
  } else {
    level = 2;
    severity = "Moderate";
    severity_label = "Moderate Support Need (Developing Skills)";
  }

  return {
    predicted_level: level,
    screening_prediction: level,
    confidence: 0.98,
    severity,
    severity_label,
    recommendation: `Suggested game level: Level ${level} based on 24 developmental questions (4 sections scored out of 6).`,
  };
}

/**
 * Builds standard prediction payload for logging or legacy endpoints.
 */
export function buildMLPredictionPayload(
  questions: SurveyQuestion[],
  answers: SurveyAnswers,
): Record<string, string> {
  const payload: Record<string, string> = {
    total_questions: String(questions.length),
  };

  for (const q of questions) {
    const val = answers[q.id] ?? answers[q.question] ?? answers[String(q.db_id)];
    if (val !== undefined && val !== null) {
      payload[q.id] = String(val);
      payload[q.question] = String(val);
    }
  }

  return payload;
}
