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

/**
 * Calculates a fallback support level based on survey total score if ML API is offline or unreachable.
 */

function calculateFallbackPrediction(scores: SurveyScores): PredictionResponse {
  // Max possible score for 20 questions (0-4 each) is 80
  const total = scores.total_score;
  let level = 1;
  let recommendation = "Recommended Level 1: Gentle guided activities focusing on core emotional recognition and foundational skills.";

  if (total > 50) {
    level = 3;
    recommendation = "Recommended Level 3: Advanced interactive challenges across emotional, cognitive, and mathematical growth areas.";
  } else if (total > 25) {
    level = 2;
    recommendation = "Recommended Level 2: Intermediate developmental games supporting progressive pattern matching and daily routines.";
  }

  return {
    screening_prediction: level,
    predicted_level: level,
    confidence: 0.85,
    recommendation,
  };
}

export async function predictSupportLevel(
  scores: SurveyScores,
): Promise<PredictionResponse> {
  let apiUrl = process.env.NEXT_PUBLIC_ML_API_URL || "https://huggingface.co/spaces/geeth20001223/lumo_buddy_back_end";

  // In browser on mobile devices accessing via LAN IP (e.g. 192.168.x.x),
  // replace 'localhost' in apiUrl with the current window host IP so fetch reaches the host machine!
  if (typeof window !== "undefined" && apiUrl.includes("localhost")) {
    const hostName = window.location.hostname;
    if (hostName && hostName !== "localhost" && hostName !== "127.0.0.1") {
      apiUrl = apiUrl.replace("localhost", hostName);
    }
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000); // 4 second timeout

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
      console.warn("[BrightPath] ML API responded with error status:", response.status, "— Using rule-based fallback.");
      return calculateFallbackPrediction(scores);
    }
  } catch (err) {
    console.warn("[BrightPath] ML API fetch failed or timed out:", err, "— Using rule-based fallback.");
    return calculateFallbackPrediction(scores);
  }
}
