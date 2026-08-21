export const GAME_SOUNDS = {
  correct: "/sounds/correct answer.mp3",
  wrong: "/sounds/wrong answer.mp3",
  levelWin: "/sounds/level win .mp3",
} as const;

export type GameSound = keyof typeof GAME_SOUNDS | "chime";

export function playWebAudioChime() {
  if (typeof window === "undefined") return;
  try {
    const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();

    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6 (Bright Major Chime)
    const now = ctx.currentTime;

    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, now + idx * 0.08);

      gain.gain.setValueAtTime(0, now + idx * 0.08);
      gain.gain.linearRampToValueAtTime(0.25, now + idx * 0.08 + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.6);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + idx * 0.08);
      osc.stop(now + idx * 0.08 + 0.65);
    });
  } catch (err) {
    // Ignore audio context errors
  }
}

export function playGameSound(sound: GameSound) {
  if (typeof window === "undefined") return;

  if (sound === "chime") {
    playWebAudioChime();
    return;
  }

  const soundPath = GAME_SOUNDS[sound as keyof typeof GAME_SOUNDS];
  if (!soundPath) return;

  const audio = new Audio(soundPath);
  audio.volume = 0.4;
  audio.play().catch(() => {
    // Fallback to web audio chime if audio file playback is restricted
    playWebAudioChime();
  });
}
