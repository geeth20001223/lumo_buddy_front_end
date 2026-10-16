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

export function mapClinicalLevelToGameLevel(level: number): number {
  if (level === 1) return 3;
  if (level === 3) return 1;
  return 2;
}

export async function predictSupportLevel(
  payload: Record<string, unknown>,
): Promise<PredictionResponse> {
  let response: Response;

  try {
    // 1. Primary: Use Next.js /api/predict server route (handles server-side proxying and CORS)
    response = await fetch("/api/predict", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      return (await response.json()) as PredictionResponse;
    }

    const errData = await response.text();
    console.warn(
      `[LumoBuddy] /api/predict returned status ${response.status}:`,
      errData,
    );
  } catch (proxyErr) {
    console.warn(
      "[LumoBuddy] Proxy route fetch failed, trying direct ML API:",
      proxyErr,
    );
  }

  // 2. Direct fetch fallback to ML API URL (defaulting to local port 8000)
  const directUrl =
    process.env.NEXT_PUBLIC_ML_API_URL || "http://127.0.0.1:8000";
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
    const directErrText = await response.text();
    console.error(
      `[LumoBuddy] ML API responded with status: ${response.status}`,
      directErrText,
    );
    throw new MLApiError("prediction_failed");
  }

  const directData = (await response.json()) as PredictionResponse;
  if (directData && typeof directData.predicted_level === "number") {
    directData.predicted_level = mapClinicalLevelToGameLevel(directData.predicted_level);
    directData.screening_prediction = directData.predicted_level;
    directData.recommendation = `Suggested game level: Level ${directData.predicted_level}`;
  }
  return directData;
}
