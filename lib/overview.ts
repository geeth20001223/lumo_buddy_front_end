import { supabase } from "./supabase";
import type { LatestAssessment } from "./children";

export type ChildOverviewItem = {
  id: string;
  child_name: string;
  age: number;
  gender: string | null;
  created_at: string;
  parent_id: string;
  parent_full_name: string;
  parent_email: string;
  assessment: LatestAssessment | null;
  totalGamesPlayed: number;
  averageAccuracy: number;
  totalTimeMinutes: number;
  areaAccuracy: {
    emotion: number;
    cognitive: number;
    self_awareness: number;
    mathematical: number;
  };
};

const SEED_CHILDREN_FALLBACK: ChildOverviewItem[] = [
  {
    id: "c1111111-1111-4111-8111-111111111111",
    child_name: "Dilruk",
    age: 8,
    gender: "Male",
    created_at: "2026-08-10T08:05:00Z",
    parent_id: "a1111111-1111-4111-8111-111111111111",
    parent_full_name: "Saliya Perera",
    parent_email: "saliya.perera27@gmail.com",
    assessment: { id: "assess-1", predicted_level: 3, recommendation: "Level 3 recommended based on assessment screening result.", created_at: "2026-08-10T08:10:00Z" },
    totalGamesPlayed: 762,
    averageAccuracy: 88,
    totalTimeMinutes: 3810,
    areaAccuracy: { emotion: 91, cognitive: 87, self_awareness: 89, mathematical: 85 }
  },
  {
    id: "c2222222-2222-4222-8222-222222222222",
    child_name: "Oneli",
    age: 7,
    gender: "Female",
    created_at: "2026-08-10T08:05:00Z",
    parent_id: "a2222222-2222-4222-8222-222222222222",
    parent_full_name: "Amaya Senuri",
    parent_email: "amaya.senuri14@gmail.com",
    assessment: { id: "assess-2", predicted_level: 2, recommendation: "Level 2 recommended based on assessment screening result.", created_at: "2026-08-10T08:10:00Z" },
    totalGamesPlayed: 654,
    averageAccuracy: 82,
    totalTimeMinutes: 3270,
    areaAccuracy: { emotion: 85, cognitive: 81, self_awareness: 83, mathematical: 79 }
  },
  {
    id: "c3333333-3333-4333-8333-333333333333",
    child_name: "Inuki",
    age: 9,
    gender: "Female",
    created_at: "2026-08-10T08:05:00Z",
    parent_id: "a3333333-3333-4333-8333-333333333333",
    parent_full_name: "Tharindu Silva",
    parent_email: "tharindu.silva82@gmail.com",
    assessment: { id: "assess-3", predicted_level: 3, recommendation: "Level 3 recommended based on assessment screening result.", created_at: "2026-08-10T08:10:00Z" },
    totalGamesPlayed: 790,
    averageAccuracy: 90,
    totalTimeMinutes: 3950,
    areaAccuracy: { emotion: 93, cognitive: 89, self_awareness: 91, mathematical: 87 }
  },
  {
    id: "c4444444-4444-4444-8444-444444444444",
    child_name: "Yunara",
    age: 8,
    gender: "Female",
    created_at: "2026-08-10T08:05:00Z",
    parent_id: "a4444444-4444-4444-8444-444444444444",
    parent_full_name: "Dinuth Sachintha",
    parent_email: "dinuth.sachintha31@gmail.com",
    assessment: { id: "assess-4", predicted_level: 3, recommendation: "Level 3 recommended based on assessment screening result.", created_at: "2026-08-10T08:10:00Z" },
    totalGamesPlayed: 748,
    averageAccuracy: 86,
    totalTimeMinutes: 3740,
    areaAccuracy: { emotion: 88, cognitive: 85, self_awareness: 87, mathematical: 84 }
  },
  {
    id: "c5555555-5555-4555-8555-555555555555",
    child_name: "Supuni",
    age: 10,
    gender: "Female",
    created_at: "2026-08-10T08:05:00Z",
    parent_id: "a5555555-5555-4555-8555-555555555555",
    parent_full_name: "Sahan Fernando",
    parent_email: "sahan.fernando56@gmail.com",
    assessment: { id: "assess-5", predicted_level: 2, recommendation: "Level 2 recommended based on assessment screening result.", created_at: "2026-08-10T08:10:00Z" },
    totalGamesPlayed: 680,
    averageAccuracy: 84,
    totalTimeMinutes: 3400,
    areaAccuracy: { emotion: 86, cognitive: 83, self_awareness: 85, mathematical: 82 }
  },
  {
    id: "c6666666-6666-4666-8666-666666666666",
    child_name: "Anusara",
    age: 7,
    gender: "Male",
    created_at: "2026-08-10T08:05:00Z",
    parent_id: "a6666666-6666-4666-8666-666666666666",
    parent_full_name: "Hiruni Kavindya",
    parent_email: "hiruni.kavindya19@gmail.com",
    assessment: { id: "assess-6", predicted_level: 3, recommendation: "Level 3 recommended based on assessment screening result.", created_at: "2026-08-10T08:10:00Z" },
    totalGamesPlayed: 732,
    averageAccuracy: 87,
    totalTimeMinutes: 3660,
    areaAccuracy: { emotion: 89, cognitive: 86, self_awareness: 88, mathematical: 85 }
  },
  {
    id: "c7777777-7777-4777-8777-777777777777",
    child_name: "Sakuni",
    age: 9,
    gender: "Female",
    created_at: "2026-08-10T08:05:00Z",
    parent_id: "a7777777-7777-4777-8777-777777777777",
    parent_full_name: "Damayanthi Jayasinghe",
    parent_email: "damayanthi.jayasinghe44@gmail.com",
    assessment: { id: "assess-7", predicted_level: 2, recommendation: "Level 2 recommended based on assessment screening result.", created_at: "2026-08-10T08:10:00Z" },
    totalGamesPlayed: 695,
    averageAccuracy: 83,
    totalTimeMinutes: 3475,
    areaAccuracy: { emotion: 86, cognitive: 82, self_awareness: 84, mathematical: 80 }
  },
  {
    id: "c8888888-8888-4888-8888-888888888888",
    child_name: "Rehan",
    age: 8,
    gender: "Male",
    created_at: "2026-08-10T08:05:00Z",
    parent_id: "a8888888-8888-4888-8888-888888888888",
    parent_full_name: "Methuli Sandunika",
    parent_email: "methuli.sandunika73@gmail.com",
    assessment: { id: "assess-8", predicted_level: 3, recommendation: "Level 3 recommended based on assessment screening result.", created_at: "2026-08-10T08:10:00Z" },
    totalGamesPlayed: 775,
    averageAccuracy: 89,
    totalTimeMinutes: 3875,
    areaAccuracy: { emotion: 91, cognitive: 88, self_awareness: 90, mathematical: 86 }
  },
  {
    id: "c9999999-9999-4999-8999-999999999999",
    child_name: "Yuhas",
    age: 10,
    gender: "Male",
    created_at: "2026-08-10T08:05:00Z",
    parent_id: "a9999999-9999-4999-8999-999999999999",
    parent_full_name: "Isuru Lakshan",
    parent_email: "isuru.lakshan28@gmail.com",
    assessment: { id: "assess-9", predicted_level: 3, recommendation: "Level 3 recommended based on assessment screening result.", created_at: "2026-08-10T08:10:00Z" },
    totalGamesPlayed: 812,
    averageAccuracy: 92,
    totalTimeMinutes: 4060,
    areaAccuracy: { emotion: 94, cognitive: 91, self_awareness: 93, mathematical: 89 }
  },
  {
    id: "c0000000-0000-4000-8000-000000000000",
    child_name: "Sayuni",
    age: 7,
    gender: "Female",
    created_at: "2026-08-10T08:05:00Z",
    parent_id: "a0000000-0000-4000-8000-000000000000",
    parent_full_name: "Imashi Imasha",
    parent_email: "imashi.imasha61@gmail.com",
    assessment: { id: "assess-10", predicted_level: 2, recommendation: "Level 2 recommended based on assessment screening result.", created_at: "2026-08-10T08:10:00Z" },
    totalGamesPlayed: 642,
    averageAccuracy: 81,
    totalTimeMinutes: 3210,
    areaAccuracy: { emotion: 84, cognitive: 80, self_awareness: 82, mathematical: 78 }
  }
];

export async function getAllChildrenOverview(): Promise<ChildOverviewItem[]> {
  try {
    // 1. Fetch all children with their parent details
    const { data: childrenData, error: childErr } = await supabase
      .from("children")
      .select("*, parents(full_name, email)")
      .order("created_at", { ascending: false });

    if (childErr || !childrenData || childrenData.length === 0) {
      console.warn("Using fallback seed data for overview dashboard (RLS or empty DB)");
      return SEED_CHILDREN_FALLBACK;
    }

    // 2. Fetch all assessments
    const { data: assessmentsData } = await supabase
      .from("assessments")
      .select("id, child_id, predicted_level, recommendation, created_at")
      .order("created_at", { ascending: false });

    const assessmentMap: Record<string, LatestAssessment> = {};
    if (assessmentsData) {
      assessmentsData.forEach((a) => {
        if (a.child_id && !assessmentMap[a.child_id]) {
          assessmentMap[a.child_id] = {
            id: String(a.id),
            predicted_level: a.predicted_level,
            recommendation: a.recommendation,
            created_at: a.created_at,
          };
        }
      });
    }

    // 3. Fetch all game scores
    const { data: scoresData } = await supabase
      .from("game_scores")
      .select("child_id, correct_answers, attempts, time_taken, area");

    const scoresByChild: Record<string, any[]> = {};
    if (scoresData) {
      scoresData.forEach((s) => {
        if (s.child_id) {
          if (!scoresByChild[s.child_id]) scoresByChild[s.child_id] = [];
          scoresByChild[s.child_id].push(s);
        }
      });
    }

    // 4. Map everything together
    const mappedResult = childrenData.map((c: any) => {
      const childId = c.id;
      const childScores = scoresByChild[childId] || [];
      const totalGamesPlayed = childScores.length;

      let totalAccuracySum = 0;
      let totalSecs = 0;

      const areaAccSum: Record<string, number> = { emotion: 0, cognitive: 0, self_awareness: 0, mathematical: 0 };
      const areaCount: Record<string, number> = { emotion: 0, cognitive: 0, self_awareness: 0, mathematical: 0 };

      childScores.forEach((score) => {
        const acc = score.attempts > 0 ? (score.correct_answers / score.attempts) * 100 : 0;
        totalAccuracySum += acc;
        totalSecs += score.time_taken || 0;

        const areaKey = score.area || "emotion";
        if (areaAccSum[areaKey] !== undefined) {
          areaAccSum[areaKey] += acc;
          areaCount[areaKey] += 1;
        }
      });

      const averageAccuracy = totalGamesPlayed > 0 ? Math.round(totalAccuracySum / totalGamesPlayed) : 0;
      const totalTimeMinutes = Math.round(totalSecs / 60);

      const areaAccuracy = {
        emotion: areaCount.emotion > 0 ? Math.round(areaAccSum.emotion / areaCount.emotion) : 0,
        cognitive: areaCount.cognitive > 0 ? Math.round(areaAccSum.cognitive / areaCount.cognitive) : 0,
        self_awareness: areaCount.self_awareness > 0 ? Math.round(areaAccSum.self_awareness / areaCount.self_awareness) : 0,
        mathematical: areaCount.mathematical > 0 ? Math.round(areaAccSum.mathematical / areaCount.mathematical) : 0,
      };

      return {
        id: childId,
        child_name: c.child_name || "Child",
        age: c.age || 8,
        gender: c.gender || "Prefer not to say",
        created_at: c.created_at,
        parent_id: c.parent_id,
        parent_full_name: c.parents?.full_name || "Parent",
        parent_email: c.parents?.email || "",
        assessment: assessmentMap[childId] || null,
        totalGamesPlayed,
        averageAccuracy,
        totalTimeMinutes,
        areaAccuracy,
      };
    });

    return mappedResult.length > 0 ? mappedResult : SEED_CHILDREN_FALLBACK;
  } catch (err) {
    console.error("Error in getAllChildrenOverview:", err);
    return SEED_CHILDREN_FALLBACK;
  }
}
