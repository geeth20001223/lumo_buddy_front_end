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

  // 3. Read session-played games from browser sessionStorage (cleared when app is closed)
  let sessionPlayedSet = new Set<string>();
  if (typeof window !== "undefined") {
    try {
      const sessionKey = `lumo_session_played_${childId}`;
      const sessionPlayed: string[] = JSON.parse(sessionStorage.getItem(sessionKey) || "[]");
      sessionPlayedSet = new Set(sessionPlayed.map(String));
    } catch (e) {
      console.error("[Lumo Buddy] Error reading sessionStorage:", e);
    }
  }

  // 4. Apply unlock & session-played logic
  const gamesWithStatus: GameWithUnlockState[] = games.map((game) => {
    const { isUnlocked, message } = isGameUnlocked(game, assessment);
    const isPlayed =
      sessionPlayedSet.has(String(game.id)) ||
      sessionPlayedSet.has(game.game_slug) ||
      sessionPlayedSet.has(`${game.game_slug}-${game.level}`) ||
      sessionPlayedSet.has(`${game.area}-${game.level}`) ||
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
