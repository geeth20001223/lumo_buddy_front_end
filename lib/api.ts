import type { SurveyScores } from "@/types/survey";

export type PredictionResponse = {
  screening_prediction: number;
  predicted_level: number;
  confidence: number;
  recommendation: string;
};

export class MLApiError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "MLApiError";
  }
}

export async function predictSupportLevel(
  scores: SurveyScores,
): Promise<PredictionResponse> {
  const payload = {
    emotion_score: scores.emotion_score,
    cognitive_score: scores.cognitive_score,
    self_awareness_score: scores.self_awareness_score,
    math_score: scores.math_score,
    total_score: scores.total_score,
  };

  let response: Response;

  try {
    // 1. Primary: Use Next.js /api/predict server route (bypasses browser CORS restrictions completely)
    response = await fetch("/api/predict", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    // If proxy endpoint is ok, return parsed json prediction
    if (response.ok) {
      return (await response.json()) as PredictionResponse;
    }
  } catch (proxyErr) {
    console.warn("[LumoBuddy] Proxy route fetch failed, trying direct ML API:", proxyErr);
  }

  // 2. Direct fetch fallback to ML API URL
  const directUrl = process.env.NEXT_PUBLIC_ML_API_URL || "http://127.0.0.1:8000";
  try {
    response = await fetch(`${directUrl.replace(/\/+$/, "")}/predict`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  } catch (err) {
    console.error("[LumoBuddy] Direct ML API fetch failed:", err);
    throw new MLApiError("prediction_network_error");
  }

  if (!response.ok) {
    console.error("[LumoBuddy] ML API responded with status:", response.status);
    throw new MLApiError("prediction_failed");
  }

  return response.json() as Promise<PredictionResponse>;
}
