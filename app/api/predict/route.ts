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
          // The ML model returns predicted_level:
          // 3 -> Game Level 3 (Advanced Activities, Mild support need)
          // 2 -> Game Level 2 (Developing Skills, Moderate support need)
          // 1 -> Game Level 1 (Foundational Support, Severe support need)
          let finalLevel = 2;

          const predNum = Number(data?.predicted_level ?? data?.screening_prediction);
          if (predNum === 3 || predNum === 2 || predNum === 1) {
            finalLevel = predNum;
          } else {
            const total = Number(body?.total_score || 0);
            if (total >= 40) finalLevel = 3;
            else if (total <= 25) finalLevel = 1;
            else finalLevel = 2;
          }

          // Strict validation with parent's survey answers and scores
          const targetSeverity = String(
            body?.["target_severity_metric"] ??
            body?.["How can you rate your child's deficits in social communication and social interaction (This serves as the ML target severity metric)"] ??
            ""
          ).trim().toLowerCase();
          const totalScore = typeof body?.total_score === "number" ? body.total_score : 0;

          if (targetSeverity === "severe" || (totalScore > 0 && totalScore <= 25)) {
            finalLevel = 1;
          } else if (targetSeverity === "mild" && (totalScore === 0 || totalScore >= 38)) {
            finalLevel = 3;
          } else if (targetSeverity === "moderate") {
            finalLevel = 2;
          }

          data.predicted_level = finalLevel;
          data.screening_prediction = finalLevel;
          data.recommendation = `Suggested game level: Level ${finalLevel}`;
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
    const targetSeverity = String(
      body?.["target_severity_metric"] ??
      body?.["How can you rate your child's deficits in social communication and social interaction (This serves as the ML target severity metric)"] ??
      ""
    ).trim().toLowerCase();
    const totalScore = typeof body?.total_score === "number" ? body.total_score : 0;

    if (targetSeverity === "severe" || (totalScore > 0 && totalScore <= 25)) {
      fallbackLevel = 1;
    } else if (targetSeverity === "mild" || totalScore >= 40) {
      fallbackLevel = 3;
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
