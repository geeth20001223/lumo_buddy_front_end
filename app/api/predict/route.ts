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
          // Map clinical severity levels to game activity levels:
          // Level 1 (Mild) -> Game Level 3 (Advanced)
          // Level 2 (Moderate) -> Game Level 2 (Developing)
          // Level 3 (Severe) -> Game Level 1 (Foundational)
          if (data && (data.predicted_level !== undefined || data.severity !== undefined)) {
            const rawVal = String(data.predicted_level ?? data.severity ?? "").trim().toLowerCase();
            let mapped = 2;
            if (rawVal === "1" || rawVal === "mild") {
              mapped = 3;
            } else if (rawVal === "3" || rawVal === "severe") {
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

    return NextResponse.json(
      { error: `All ML API endpoints failed. Last detail: ${lastErrorMsg}` },
      { status: lastStatus }
    );
  } catch (err) {
    return NextResponse.json(
      { error: `Internal predict proxy error: ${(err as Error).message}` },
      { status: 500 }
    );
  }
}
