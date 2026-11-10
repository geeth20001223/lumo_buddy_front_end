import { SurveyArea } from "@/types/survey";

/**
 * Rules (6-point scale per section):
 * Each section max score = 6 (6 questions, evaluated out of 6).
 *
 * Section level mapping (0–6 scale):
 * 0–2 = Level 1 (Foundational Support)
 * 3–4 = Level 2 (Developing Skills)
 * 5–6 = Level 3 (Advanced Activities)
 */
export function calculateAreaLevel(score: number): number {
  if (score <= 0) return 1;

  // Normalize if legacy score on 18-point or 24-point scale was recorded
  const normalized =
    score <= 6
      ? score
      : score <= 18
      ? Math.min(6, Math.round((score / 18) * 6))
      : score <= 24
      ? Math.min(6, Math.round((score / 24) * 6))
      : Math.min(6, Math.round((score / 32) * 6));

  if (normalized <= 2) return 1;
  if (normalized <= 4) return 2;
  return 3;
}

/**
 * Calculates area-specific levels and identifies main support/strongest areas.
 * Priority order for ties: emotion, cognitive, self_awareness, mathematical.
 */
export function calculateAreaRecommendations(scores: {
  emotion_score: number;
  cognitive_score: number;
  self_awareness_score: number;
  math_score: number;
}) {
  const emotion_level = calculateAreaLevel(scores.emotion_score);
  const cognitive_level = calculateAreaLevel(scores.cognitive_score);
  const self_awareness_level = calculateAreaLevel(scores.self_awareness_score);
  const math_level = calculateAreaLevel(scores.math_score);

  const areas: { area: SurveyArea; score: number }[] = [
    { area: "emotion", score: scores.emotion_score },
    { area: "cognitive", score: scores.cognitive_score },
    { area: "self_awareness", score: scores.self_awareness_score },
    { area: "mathematical", score: scores.math_score },
  ];

  // Find main support area (lowest score).
  let main_support_area: SurveyArea = "emotion";
  let minScore = Infinity;
  for (const item of areas) {
    if (item.score < minScore) {
      minScore = item.score;
      main_support_area = item.area;
    }
  }

  // Find strongest area (highest score).
  let strongest_area: SurveyArea = "emotion";
  let maxScore = -Infinity;
  for (const item of areas) {
    if (item.score > maxScore) {
      maxScore = item.score;
      strongest_area = item.area;
    }
  }

  return {
    emotion_level,
    cognitive_level,
    self_awareness_level,
    math_level,
    main_support_area,
    strongest_area,
  };
}

export function getAreaLabel(area: SurveyArea | string): string {
  switch (area) {
    case "emotion":
      return "Communication & Emotion";
    case "cognitive":
      return "Social & Cognitive";
    case "self_awareness":
      return "Behavior & Sensory";
    case "mathematical":
    case "math":
      return "Learning & Logic";
    default:
      return typeof area === "string" ? area : "General Development";
  }
}

export function isAreaRecommendationsEnabled(): boolean {
  return process.env.NEXT_PUBLIC_ENABLE_AREA_RECOMMENDATIONS !== "false";
}
