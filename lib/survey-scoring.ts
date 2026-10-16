import type { SurveyAnswers, SurveyQuestion, SurveyScores } from "@/types/survey";

// Normalized developmental scoring per answer option (0 - 8 scale)
const OPTION_SCORES: Record<string, number> = {
  // Verbal
  "very verbal": 8,
  "verbal with many words and few phrases": 7,
  "lots of words and phrases": 6,
  "verbal": 5,
  "just few words": 3,
  "non- verbal": 1,
  "non-verbal": 1,

  // Nonverbal capabilities
  "very good": 8,
  "good": 6,
  "he has different strengths in different areas": 5,
  "fair": 4,
  "poor": 2,

  // Relationships
  "yes": 7,
  "some times": 4,
  "sometimes": 4,
  "no": 2,

  // Severity metrics (Mild = higher developmental mastery, Severe = higher support need)
  "mild": 8,
  "moderate": 5,
  "severe": 2,
};

function getOptionScore(val: string | number | undefined, defaultScore = 4): number {
  if (typeof val === "number") return val;
  if (!val) return defaultScore;
  const key = String(val).trim().toLowerCase();
  if (key in OPTION_SCORES) {
    return OPTION_SCORES[key];
  }
  return defaultScore;
}

export function calculateSurveyScores(
  questions: SurveyQuestion[],
  answers: SurveyAnswers,
): SurveyScores {
  let emotion_score = 0;
  let cognitive_score = 0;
  let self_awareness_score = 0;
  let math_score = 0;

  for (const q of questions) {
    const rawAnswer =
      answers[q.id] ?? answers[q.question] ?? answers[String(q.db_id)];
    const score = getOptionScore(rawAnswer);

    // Group questions into the 4 developmental reporting areas
    if (q.area === "communication" || q.id === "verbal_status" || q.id === "nonverbal_behaviors") {
      emotion_score += score;
    } else if (q.area === "social" || q.id === "develop_relationships" || q.id === "target_severity_metric") {
      cognitive_score += score;
    } else if (q.area === "behavior" || q.area === "sensory" || q.id === "hyporeactivity_sensory" || q.id === "motor_movements_echolalia") {
      self_awareness_score += score;
    } else {
      math_score += score;
    }
  }

  // Scale scores so each area falls between 0 and 13 (aligned with the 13 clinical screening questions)
  const clampArea = (s: number) => Math.min(13, Math.max(0, Math.round(s * 0.75)));

  const scaledEmotion = clampArea(emotion_score);
  const scaledCognitive = clampArea(cognitive_score);
  const scaledSelfAwareness = clampArea(self_awareness_score);
  const scaledMath = clampArea(math_score);

  const total_score = scaledEmotion + scaledCognitive + scaledSelfAwareness + scaledMath;

  return {
    emotion_score: scaledEmotion,
    cognitive_score: scaledCognitive,
    self_awareness_score: scaledSelfAwareness,
    math_score: scaledMath,
    total_score,
  };
}

/**
 * Builds the exact payload expected by the Random Forest ML API on POST /predict.
 * Keys match either feature_name or question text.
 */
export function buildMLPredictionPayload(
  questions: SurveyQuestion[],
  answers: SurveyAnswers,
): Record<string, string> {
  const payload: Record<string, string> = {
    // Default disability type to "Autism" for ML feature expectation
    "Which type of disability do he/she have": "Autism",
  };

  for (const q of questions) {
    const val =
      answers[q.id] ?? answers[q.question] ?? answers[String(q.db_id)];
    if (val !== undefined && val !== null) {
      const strVal = String(val);
      payload[q.question] = strVal;
      if (q.feature_name && q.feature_name !== q.question) {
        payload[q.feature_name] = strVal;
      }
    }
  }

  return payload;
}
