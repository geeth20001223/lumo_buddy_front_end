import { Game, GameWithUnlockState } from "@/types/game";
import { AssessmentResult } from "@/types/survey";

export function isGameDevModeEnabled(): boolean {
  return process.env.NEXT_PUBLIC_ENABLE_GAME_DEV_MODE === "true";
}

export function isGameUnlocked(
  game: Game,
  assessment: AssessmentResult | null
): { isUnlocked: boolean; message?: string } {
  // 1. Dev mode check (all games unlocked if dev mode explicitly turned on)
  if (isGameDevModeEnabled()) {
    return { isUnlocked: true, message: "Unlocked for testing" };
  }

  // 2. No assessment check
  if (!assessment) {
    return { isUnlocked: false, message: "Complete survey to unlock" };
  }

  // 3. Strict level-based unlock rule according to child's predicted_level
  // Level 1 child -> can only play Level 1 games across all categories
  // Level 2 child -> can play Level 1 and Level 2 games across all categories
  // Level 3 child -> can play Level 1, Level 2, and Level 3 games across all categories
  const childLevel = assessment.predicted_level ?? 1;

  if (game.level <= childLevel) {
    return { isUnlocked: true };
  }

  return {
    isUnlocked: false,
    message: `Unlocks at Level ${game.level}`
  };
}

export function getGameLevelForArea(
  gameArea: string,
  assessment: AssessmentResult | null
): number {
  if (!assessment) return 0;
  // Consistently return predicted_level across all categories
  return assessment.predicted_level ?? 1;
}
