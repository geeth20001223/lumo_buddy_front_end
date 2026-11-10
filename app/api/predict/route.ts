import { NextResponse } from "next/server";
import { predictLevelFromScores } from "@/lib/survey-scoring";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // 1. Calculate scores if provided, otherwise compute from total_score
    const emotion_score = Number(body?.emotion_score || 0);
    const cognitive_score = Number(body?.cognitive_score || 0);
    const self_awareness_score = Number(body?.self_awareness_score || 0);
    const math_score = Number(body?.math_score || 0);
    const total_score =
      typeof body?.total_score === "number"
        ? body.total_score
        : emotion_score + cognitive_score + self_awareness_score + math_score;

    // 2. Direct, deterministic clinical scoring prediction (no external ML server required)
    const prediction = predictLevelFromScores({
      emotion_score,
      cognitive_score,
      self_awareness_score,
      math_score,
      total_score,
    });

    const level = prediction.predicted_level;

    return NextResponse.json({
      
      screening_prediction: level,
      predicted_level: level,
      confidence: prediction.confidence,
      severity: prediction.severity,
      severity_label: prediction.severity_label,
      recommendation: prediction.recommendation,
      probabilities: {
        "Level 1 (Foundational)": level === 1 ? 0.92 : 0.04,
        "Level 2 (Developing)": level === 2 ? 0.92 : 0.04,
        "Level 3 (Advanced)": level === 3 ? 0.92 : 0.04,
      },
      scores: {
        emotion_score,
        cognitive_score,
        self_awareness_score,
        math_score,
        total_score,
      },
    });
  } catch (err) {
    return NextResponse.json(
      { error: `Scoring calculation error: ${(err as Error).message}` },
      { status: 500 }
    );
  }
}
