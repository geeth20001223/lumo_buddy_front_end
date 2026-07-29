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
  let apiUrl =
    process.env.NEXT_PUBLIC_ML_API_URL ||
    "https://huggingface.co/spaces/geeth20001223/lumo_buddy_back_end";

  // Convert Hugging Face Space web page URL (e.g. https://huggingface.co/spaces/user/space)
  // into direct API URL (e.g. https://user-space.hf.space)
  if (apiUrl.includes("huggingface.co/spaces/")) {
    const match = apiUrl.match(/huggingface\.co\/spaces\/([^/]+)\/([^/]+)/);
    if (match) {
      const username = match[1];
      const spacename = match[2].replace(/_/g, "-");
      apiUrl = `https://${username}-${spacename}.hf.space`;
    }
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000); // 15 second timeout for ML inference

    const response = await fetch(`${apiUrl}/predict`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      signal: controller.signal,
      body: JSON.stringify({
        emotion_score: scores.emotion_score,
        cognitive_score: scores.cognitive_score,
        self_awareness_score: scores.self_awareness_score,
        math_score: scores.math_score,
        total_score: scores.total_score,
      }),
    });

    clearTimeout(timeoutId);

    if (response.ok) {
      const data = await response.json();
      return {
        screening_prediction: data.screening_prediction ?? data.predicted_level ?? 1,
        predicted_level: data.predicted_level ?? 1,
        confidence: data.confidence ?? 0.9,
        recommendation: data.recommendation ?? "Recommended game levels updated based on support assessment.",
      };
    } else {
      const errText = await response.text().catch(() => "");
      throw new MLApiError(
        `Hugging Face ML API error status ${response.status}: ${errText || response.statusText}`,
      );
    }
  } catch (err) {
    if (err instanceof MLApiError) {
      throw err;
    }
    throw new MLApiError(
      `Could not get prediction from Hugging Face ML API at ${apiUrl}: ${(err as Error).message}`,
    );
  }
}
