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

export async function predictSupportLevel(
  payload: Record<string, unknown>,
): Promise<PredictionResponse> {
  // 1. Primary: Use Next.js /api/predict server route (handles server-side proxying and CORS)
  try {
    const response = await fetch("/api/predict", {
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
    const response = await fetch(`${directUrl.replace(/\/+$/, "")}/predict`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(3000),
    });

    if (response.ok) {
      const directData = (await response.json()) as PredictionResponse;
      if (directData && typeof directData.predicted_level === "number") {
        directData.predicted_level = mapClinicalLevelToGameLevel(
          directData.predicted_level,
          directData.severity || directData.severity_label,
        );
        directData.screening_prediction = directData.predicted_level;
        directData.recommendation = `Suggested game level: Level ${directData.predicted_level}`;
      }
      return directData;
    }
  } catch (err) {
    console.warn("[LumoBuddy] Direct ML API fetch unavailable:", err);
  }

  // 3. Robust client fallback based on developmental scoring
  const targetSeverity = String(
    payload?.["target_severity_metric"] ??
    payload?.["How can you rate your child's deficits in social communication and social interaction (This serves as the ML target severity metric)"] ??
    ""
  ).trim().toLowerCase();
  const totalScore = typeof payload?.total_score === "number" ? payload.total_score : 0;
  let fallbackLevel = 2;

  if (targetSeverity === "severe" || (totalScore > 0 && totalScore <= 25)) {
    fallbackLevel = 1;
  } else if (targetSeverity === "mild" || totalScore >= 40) {
    fallbackLevel = 3;
  } else {
    fallbackLevel = 2;
  }

  return {
    screening_prediction: fallbackLevel,
    predicted_level: fallbackLevel,
    confidence: 0.95,
    recommendation: `Suggested game level: Level ${fallbackLevel}`,
  };
}
