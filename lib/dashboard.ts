import { supabase } from "./supabase";
import { getChildForCurrentParent } from "./children";
import { getLatestAssessmentForCurrentParent } from "./survey";
import { getActiveGames } from "./games";
import { ChildProfile } from "@/types/child";
import { AssessmentResult } from "@/types/survey";
import { Game, GameScore } from "@/types/game";

export interface DashboardData {
  child: ChildProfile;
  assessment: AssessmentResult | null;
  scores: GameScore[];
  games: Game[];
  summary: DashboardSummary;
  areaStats: AreaStat[];
  recommendedActivity: RecommendedActivity | null;
}

export interface DashboardSummary {
  totalActivities: number;
  averageScore: number;
  averageTime: number;
  highestScore: number;
  latestActivity: GameScore | null;
  mostPlayedArea: string | null;
}

export interface AreaStat {
  area: string;
  gamesPlayed: number;
  averageScore: number;
  averageTime: number;
  latestLevel: number | null;
  progressPercent: number;
}

export interface RecommendedActivity {
  game: Game;
  reason: string;
}

export async function getChildDashboardData(childId: string): Promise<DashboardData | null> {
  // 1. Get child profile (verifies parent ownership implicitly via getChildForCurrentParent)
  const { child } = await getChildForCurrentParent(childId);
  if (!child) return null;

  // 2. Get latest assessment
  const assessment = await getLatestAssessmentForCurrentParent(childId).catch(() => null);

  // 3. Get all active games
  const games = await getActiveGames();

  // 4. Get all game scores for child
  const { data: scoresData, error: scoresError } = await supabase
    .from("game_scores")
    .select("*")
    .eq("child_id", childId)
    .order("played_at", { ascending: false });

  const scores = (scoresError ? [] : scoresData) as GameScore[];

  // 5. Calculate metrics
  const summary = calculateDashboardSummary(scores);
  const areaStats = calculateAreaStats(scores);
  const recommendedActivity = getRecommendedNextActivity(child, assessment, scores, games, areaStats);

  return {
    child,
    assessment,
    scores,
    games,
    summary,
    areaStats,
    recommendedActivity,
  };
}

export function calculateDashboardSummary(scores: GameScore[]): DashboardSummary {
  if (!scores || scores.length === 0) {
    return {
      totalActivities: 0,
      averageScore: 0,
      averageTime: 0,
      highestScore: 0,
      latestActivity: null,
      mostPlayedArea: null,
    };
  }

  const totalActivities = scores.length;
  let totalScore = 0;
  let totalTime = 0;
  let highestScore = 0;
  const latestActivity = scores[0]; // Already ordered by played_at desc
  const areaCounts: Record<string, number> = {};

  scores.forEach(score => {
    totalScore += score.final_score;
    totalTime += score.time_taken;
    if (score.final_score > highestScore) {
      highestScore = score.final_score;
    }
    areaCounts[score.area] = (areaCounts[score.area] || 0) + 1;
  });

  const averageScore = Math.round(totalScore / totalActivities);
  const averageTime = Math.round(totalTime / totalActivities);
  
  let mostPlayedArea = null;
  let maxCount = 0;
  for (const [area, count] of Object.entries(areaCounts)) {
    if (count > maxCount) {
      mostPlayedArea = area;
      maxCount = count;
    }
  }

  return {
    totalActivities,
    averageScore,
    averageTime,
    highestScore,
    latestActivity,
    mostPlayedArea,
  };
}

export function calculateAreaStats(scores: GameScore[]): AreaStat[] {
  const areas = ["emotion", "cognitive", "self_awareness", "mathematical"];
  const stats: AreaStat[] = [];

  areas.forEach(area => {
    const areaScores = scores.filter(s => s.area === area);
    if (areaScores.length === 0) {
      stats.push({
        area,
        gamesPlayed: 0,
        averageScore: 0,
        averageTime: 0,
        latestLevel: null,
        progressPercent: 0,
      });
      return;
    }

    let totalScore = 0;
    let totalTime = 0;
    let latestLevel = areaScores[0].level;

    areaScores.forEach(score => {
      totalScore += score.final_score;
      totalTime += score.time_taken;
    });

    const averageScore = Math.round(totalScore / areaScores.length);
    const averageTime = Math.round(totalTime / areaScores.length);
    const progressPercent = Math.min(averageScore, 100);

    stats.push({
      area,
      gamesPlayed: areaScores.length,
      averageScore,
      averageTime,
      latestLevel,
      progressPercent,
    });
  });

  return stats;
}

const GAME_REASONS: Record<string, string> = {
  "emotion-story-choice": "Help characters navigate real feelings and make kind choices in guided stories.",
  "emotion-face-match": "Recognize facial expressions and connect with different feelings.",
  "memory-match": "Train your memory and focus with fun, colorful matching cards.",
  "pattern-builder": "Complete shape and color patterns to build logic and problem-solving skills.",
  "count-the-objects": "Count colorful items together to strengthen early math and attention skills.",
  "shape-number-match": "Match numbers with shapes to build foundational math confidence.",
  "daily-routine-order": "Organize daily activities step-by-step for independence and self-awareness.",
  "emotion-reflection-board": "Explore your daily emotions and reflect on how you feel.",
  "personal-choice-adventure": "Make positive choices in everyday scenarios and discover the outcomes.",
};

export function getRecommendedNextActivity(
  child: ChildProfile,
  assessment: AssessmentResult | null,
  scores: GameScore[],
  games: Game[],
  areaStats: AreaStat[]
): RecommendedActivity | null {
  if (!games || games.length === 0) return null;

  // Filter unlocked games based on assessment predicted level
  const predictedLevel = assessment?.predicted_level || 1;
  const unlockedGames = games.filter(g => g.level <= predictedLevel);

  if (unlockedGames.length === 0) {
    return {
      game: games[0],
      reason: "Start your first activity to begin your developmental learning journey!",
    };
  }

  // 1. If child did exceptionally well in the latest game (score >= 40), prioritize its next level if available
  const latestScore = scores[0];
  const latestGameIdStr = latestScore && latestScore.game_id ? String(latestScore.game_id) : "";

  if (latestScore && latestScore.final_score >= 40 && latestGameIdStr) {
    const searchSlug = latestGameIdStr.toLowerCase().replace(/-/g, " ");
    const nextLevelGame = unlockedGames.find(
      g =>
        (g.game_slug === latestGameIdStr || g.id === latestGameIdStr || g.game_name.toLowerCase().includes(searchSlug)) &&
        g.level === latestScore.level + 1
    );
    if (nextLevelGame) {
      return {
        game: nextLevelGame,
        reason: `Awesome progress! Ready to try Level ${nextLevelGame.level} in ${nextLevelGame.game_name}.`,
      };
    }
  }

  // 2. Rotate dynamically every 2 minutes (120,000 ms) through all unlocked games for variety
  const timeSlot = Math.floor(Date.now() / (2 * 60 * 1000));
  const selectedIndex = timeSlot % unlockedGames.length;
  const selectedGame = unlockedGames[selectedIndex];

  // Tailored recommendation quote matching the specific game details
  const customReason = GAME_REASONS[selectedGame.game_slug] ||
    (assessment?.main_support_area && selectedGame.area === assessment.main_support_area
      ? `Recommended activity in ${formatAreaName(assessment.main_support_area)} for targeted developmental support.`
      : `Recommended Level ${selectedGame.level} activity to build ${formatAreaName(selectedGame.area)} skills.`);

  return {
    game: selectedGame,
    reason: customReason,
  };
}

export function formatTime(seconds: number): string {
  if (!seconds || seconds <= 0) return "0s";
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  if (m > 0) {
    return `${m}m ${s}s`;
  }
  return `${s}s`;
}

export function formatDate(dateString: string): string {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export function formatAreaName(area: string): string {
  const map: Record<string, string> = {
    emotion: "Emotion Skills",
    cognitive: "Cognitive Skills",
    self_awareness: "Self-awareness",
    mathematical: "Mathematical Skills"
  };
  return map[area] || area;
}
