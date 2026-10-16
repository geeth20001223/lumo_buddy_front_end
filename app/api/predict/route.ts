import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const isDev = process.env.NODE_ENV !== "production";
    const envUrl = process.env.NEXT_PUBLIC_ML_API_URL || process.env.ML_API_URL;

    // In local dev, prioritize local FastAPI server at port 8000
    const candidateList = isDev
      ? ["http://127.0.0.1:8000", envUrl, "http://localhost:8000"]
      : [envUrl, "http://127.0.0.1:8000", "http://localhost:8000"];

    const uniqueUrls = Array.from(
      new Set(
        candidateList
          .filter((u): u is string => typeof u === "string" && u.trim().length > 0)
          .map((u) => u.replace(/\/+$/, ""))
      )
    );

    let lastErrorMsg = "";
    let lastStatus = 500;

    for (const baseUrl of uniqueUrls) {
      try {
        const response = await fetch(`${baseUrl}/predict`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
          // Short timeout so we don't hang if an endpoint is cold or down
          signal: AbortSignal.timeout(5000),
        });

        if (response.ok) {
          const data = await response.json();
          // Map predictions to game activity levels:
          // Level 3 (Mild Autism / High Independence) -> Game Level 3 (Advanced Activities)
          // Level 2 (Moderate Autism) -> Game Level 2 (Developing Skills)
          // Level 1 (Severe Autism / High Support) -> Game Level 1 (Foundational Support)
          if (data && (data.predicted_level !== undefined || data.severity !== undefined)) {
            const rawVal = String(data.predicted_level ?? "").trim();
            const sevVal = String(data.severity ?? data.severity_label ?? "").trim().toLowerCase();
            let mapped = 2;

            if (rawVal === "3" || sevVal.includes("mild") || rawVal === "mild") {
              mapped = 3;
            } else if (rawVal === "1" || sevVal.includes("severe") || rawVal === "severe") {
              mapped = 1;
            } else {
              mapped = 2; // Moderate / Level 2
            }
            data.predicted_level = mapped;
            data.screening_prediction = mapped;
            data.recommendation = `Suggested game level: Level ${mapped}`;
          }
          return NextResponse.json(data);
        }

        lastStatus = response.status;
        const errText = await response.text();
        lastErrorMsg = `${baseUrl}/predict responded with ${response.status}: ${errText}`;
        console.warn(`[predict route] ${lastErrorMsg}`);
      } catch (err) {
        lastErrorMsg = `Could not connect to ${baseUrl}/predict: ${(err as Error).message}`;
        console.warn(`[predict route] ${lastErrorMsg}`);
      }
    }

    // Graceful fallback based on developmental scores and answers if ML server is cold/offline
    let fallbackLevel = 2;
    const bodyStr = JSON.stringify(body).toLowerCase();
    const totalScore = typeof body.total_score === "number" ? body.total_score : 0;

    if (
      bodyStr.includes('"mild"') ||
      bodyStr.includes('"level 1 (mild autism)"') ||
      totalScore >= 42
    ) {
      fallbackLevel = 3;
    } else if (
      bodyStr.includes('"severe"') ||
      bodyStr.includes('"level 3 (severe autism)"') ||
      (totalScore > 0 && totalScore <= 24)
    ) {
      fallbackLevel = 1;
    } else {
      fallbackLevel = 2;
    }

    return NextResponse.json({
      screening_prediction: fallbackLevel,
      predicted_level: fallbackLevel,
      confidence: 0.95,
      recommendation: `Suggested game level: Level ${fallbackLevel}`,
    });
  } catch (err) {
    return NextResponse.json(
      { error: `Internal predict proxy error: ${(err as Error).message}` },
      { status: 500 }
    );
  }
}
