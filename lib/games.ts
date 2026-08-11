import { supabase } from "./supabase";
import { getLatestAssessmentForCurrentParent } from "./survey";
import { isGameUnlocked } from "./game-unlock";
import { getGameSlugVariants } from "./game-routes";
import { Game, GameWithUnlockState } from "@/types/game";

export async function getActiveGames() {
  const { data, error } = await supabase
    .from("games")
    .select("*")
    .eq("is_active", true)
    .order("area", { ascending: true })
    .order("level", { ascending: true });

  if (error) {
    console.error("[Lumo Buddy] Error fetching games:", error);
    return [];
  }

  console.log("[Lumo Buddy] Active games fetched from DB:", data);
  return data as Game[];
}

export async function getGamesForChild(childId: string) {
  // 1. Fetch latest assessment (handles child ownership internally)
  const assessment = await getLatestAssessmentForCurrentParent(childId).catch(() => null);

  // 2. Fetch all active games
  const games = await getActiveGames();

  // 3. Fetch played game scores for this child from Supabase DB within the last 1 hour (3600 seconds)
  const ONE_HOUR_MS = 60 * 60 * 1000;
  const oneHourAgoISO = new Date(Date.now() - ONE_HOUR_MS).toISOString();

  let dbPlayedGameIds = new Set<string>();
  let dbPlayedSlugLevels = new Set<string>();

  if (childId) {
    const { data: playedScores, error } = await supabase
      .from("game_scores")
      .select("game_id, level, area, played_at")
      .eq("child_id", childId)
      .gte("played_at", oneHourAgoISO);

    if (!error && playedScores) {
      playedScores.forEach((score) => {
        if (score.game_id) {
          dbPlayedGameIds.add(String(score.game_id));
          dbPlayedSlugLevels.add(`${score.game_id}-${score.level}`);
        }
      });
    }
  }

  // 4. Read session-played games from browser sessionStorage (within 1 hour threshold)
  let sessionPlayedSet = new Set<string>();
  if (typeof window !== "undefined") {
    try {
      const sessionKey = `lumo_session_played_${childId}`;
      const rawData = sessionStorage.getItem(sessionKey);
      if (rawData) {
        const sessionPlayed: Array<{ id: string; timestamp: number } | string> = JSON.parse(rawData);
        const now = Date.now();
        
        sessionPlayed.forEach((item) => {
          if (typeof item === "string") {
            sessionPlayedSet.add(item);
          } else if (item && typeof item === "object" && item.id) {
            if (!item.timestamp || (now - item.timestamp < ONE_HOUR_MS)) {
              sessionPlayedSet.add(item.id);
            }
          }
        });
      }
    } catch (e) {
      console.error("[Lumo Buddy] Error reading sessionStorage:", e);
    }
  }

  // 5. Apply unlock & exact game played logic (ONLY exact game ID or exact game_slug + level)
  const gamesWithStatus: GameWithUnlockState[] = games.map((game) => {
    const { isUnlocked, message } = isGameUnlocked(game, assessment);
    const isPlayed =
      dbPlayedGameIds.has(String(game.id)) ||
      dbPlayedSlugLevels.has(`${game.id}-${game.level}`) ||
      sessionPlayedSet.has(String(game.id)) ||
      sessionPlayedSet.has(`${game.game_slug}-${game.level}`) ||
      sessionPlayedSet.has(`${game.id}-${game.level}`);

    return {
      ...game,
      is_unlocked: isUnlocked,
      unlock_message: message,
      is_played: isPlayed,
    };
  });

  // Return all games so locked games remain visible as disabled/locked cards
  return {
    games: gamesWithStatus,
    assessment,
  };
}

export async function getGameBySlugAndLevel(gameSlug: string, level: number) {
  const { data, error } = await supabase
    .from("games")
    .select("*")
    .in("game_slug", getGameSlugVariants(gameSlug))
    .eq("level", level)
    .eq("is_active", true)
    .limit(1)
    .maybeSingle();

  if (error) {
    console.error("[Lumo Buddy] Error fetching single game:", error);
    return null;
  }

  return data as Game;
}
