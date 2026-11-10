import { predictLevelFromScores } from "./survey-scoring";

export type PredictionResponse = {
  screening_prediction: number;
  predicted_level: number;
  confidence: number;
  recommendation: string;
  severity?: string;
  severity_label?: string;
  probabilities?: Record<string, number>;
};

export class MLApiError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "MLApiError";
  }
}

export function mapClinicalLevelToGameLevel(level: number | string, _severity?: string): number {
  const num = Number(level);
  if (num === 3) return 3;
  if (num === 1) return 1;
  return 2; // Moderate / Level 2
}

/**
 * Predicts the optimal game starting level (1, 2, or 3) using deterministic
 * psychometric scoring directly from the 24 questions (4 categories x 6 questions).
 * Completely unplugged from any external ML model.
 */
export async function predictSupportLevel(
  payload: Record<string, unknown>,
): Promise<PredictionResponse> {
  const emotion_score = Number(payload?.emotion_score || 0);
  const cognitive_score = Number(payload?.cognitive_score || 0);
  const self_awareness_score = Number(payload?.self_awareness_score || 0);
  const math_score = Number(payload?.math_score || 0);
  const total_score =
    typeof payload?.total_score === "number"
      ? payload.total_score
      : emotion_score + cognitive_score + self_awareness_score + math_score;

  // Direct in-code scoring calculation (instant, 100% reliable, zero network dependency)
  const scoringResult = predictLevelFromScores({
    emotion_score,
    cognitive_score,
    self_awareness_score,
    math_score,
    total_score,
  });

  return {
    screening_prediction: scoringResult.predicted_level,
    predicted_level: scoringResult.predicted_level,
    confidence: scoringResult.confidence,
    severity: scoringResult.severity,
    severity_label: scoringResult.severity_label,
    recommendation: scoringResult.recommendation,
  };
}
