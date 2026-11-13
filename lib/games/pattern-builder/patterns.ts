export interface PatternQuestion {
  id: string;
  level: number;
  pattern: string[];
  correctAnswer: string;
  options: string[];
  instruction: string;
}

export function shuffleArray<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export const PATTERN_BANK: PatternQuestion[] = [
  // ==========================================
  // LEVEL 1 (Simple AB repeating patterns)
  // ==========================================
  {
    id: "p1-1",
    level: 1,
    pattern: ["🔵", "🔴", "🔵"],
    correctAnswer: "🔴",
    options: ["🔵", "🔴"],
    instruction: "What comes next?",
  },
  {
    id: "p1-2",
    level: 1,
    pattern: ["⭐", "🌙", "⭐"],
    correctAnswer: "🌙",
    options: ["🌙", "⭐"],
    instruction: "Find the next one.",
  },
  {
    id: "p1-3",
    level: 1,
    pattern: ["🌸", "🍃", "🌸"],
    correctAnswer: "🍃",
    options: ["🌸", "🍃"],
    instruction: "Choose the next card.",
  },
  {
    id: "p1-4",
    level: 1,
    pattern: ["🍎", "🍐", "🍎"],
    correctAnswer: "🍐",
    options: ["🍐", "🍎"],
    instruction: "What follows?",
  },
  {
    id: "p1-5",
    level: 1,
    pattern: ["🐶", "🐱", "🐶"],
    correctAnswer: "🐱",
    options: ["🐶", "🐱"],
    instruction: "Match the pattern.",
  },
  {
    id: "p1-6",
    level: 1,
    pattern: ["☀️", "🌧️", "☀️"],
    correctAnswer: "🌧️",
    options: ["🌧️", "☀️"],
    instruction: "What comes next?",
  },
  {
    id: "p1-7",
    level: 1,
    pattern: ["🚗", "🚲", "🚗"],
    correctAnswer: "🚲",
    options: ["🚗", "🚲"],
    instruction: "Find the next vehicle.",
  },
  {
    id: "p1-8",
    level: 1,
    pattern: ["🍦", "🍩", "🍦"],
    correctAnswer: "🍩",
    options: ["🍩", "🍦"],
    instruction: "What sweet treat is next?",
  },

  // ==========================================
  // LEVEL 2 (ABC and AABB patterns, 3 options)
  // ==========================================
  {
    id: "p2-1",
    level: 2,
    pattern: ["🔵", "🔴", "🟡", "🔵", "🔴"],
    correctAnswer: "🟡",
    options: ["🔴", "🟡", "🔵"],
    instruction: "Complete the sequence.",
  },
  {
    id: "p2-2",
    level: 2,
    pattern: ["⭐", "🌙", "☀️", "⭐", "🌙"],
    correctAnswer: "☀️",
    options: ["🌙", "☀️", "⭐"],
    instruction: "What's missing?",
  },
  {
    id: "p2-3",
    level: 2,
    pattern: ["🟦", "🟨", "🟦", "🟨"],
    correctAnswer: "🟦",
    options: ["🟨", "🟩", "🟦"],
    instruction: "Look closely at the shapes.",
  },
  {
    id: "p2-4",
    level: 2,
    pattern: ["🚗", "🚲", "🚗", "🚲"],
    correctAnswer: "🚗",
    options: ["🚲", "🚗", "🚂"],
    instruction: "What comes next?",
  },
  {
    id: "p2-5",
    level: 2,
    pattern: ["🎈", "🎁", "🎈", "🎁"],
    correctAnswer: "🎈",
    options: ["🎁", "🎈", "🧁"],
    instruction: "Finish the pattern.",
  },
  {
    id: "p2-6",
    level: 2,
    pattern: ["🍎", "🍌", "🍇", "🍎", "🍌"],
    correctAnswer: "🍇",
    options: ["🍌", "🍎", "🍇"],
    instruction: "Which fruit comes next?",
  },
  {
    id: "p2-7",
    level: 2,
    pattern: ["🐶", "🐱", "🐰", "🐶", "🐱"],
    correctAnswer: "🐰",
    options: ["🐰", "🐶", "🐱"],
    instruction: "Find the next friendly animal.",
  },
  {
    id: "p2-8",
    level: 2,
    pattern: ["🌸", "🌻", "🌸", "🌻"],
    correctAnswer: "🌸",
    options: ["🌻", "🌸", "🌹"],
    instruction: "Which flower blooms next?",
  },
  {
    id: "p2-9",
    level: 2,
    pattern: ["⚽", "🏀", "🎾", "⚽", "🏀"],
    correctAnswer: "🎾",
    options: ["⚽", "🎾", "🏀"],
    instruction: "Choose the next sports ball.",
  },
  {
    id: "p2-10",
    level: 2,
    pattern: ["🧁", "🍰", "🧁", "🍰"],
    correctAnswer: "🧁",
    options: ["🍰", "🧁", "🍪"],
    instruction: "What bakery treat comes next?",
  },

  // ==========================================
  // LEVEL 3 (Complex repeating patterns, 4 options)
  // ==========================================
  {
    id: "p3-1",
    level: 3,
    pattern: ["🔵", "🔴", "🟡", "🔵", "🔴", "🟡", "🔵"],
    correctAnswer: "🔴",
    options: ["🟡", "🔴", "🔵", "🟢"],
    instruction: "Carefully find the next item.",
  },
  {
    id: "p3-2",
    level: 3,
    pattern: ["⭐", "🌙", "☀️", "⭐", "🌙", "☀️"],
    correctAnswer: "⭐",
    options: ["🌙", "☀️", "⭐", "☁️"],
    instruction: "What starts the pattern again?",
  },
  {
    id: "p3-3",
    level: 3,
    pattern: ["🟦", "🟨", "🟩", "🟦", "🟨"],
    correctAnswer: "🟩",
    options: ["🟨", "🟦", "🟥", "🟩"],
    instruction: "Which shape follows?",
  },
  {
    id: "p3-4",
    level: 3,
    pattern: ["🦁", "🐯", "🐻", "🦁", "🐯"],
    correctAnswer: "🐻",
    options: ["🦁", "🐻", "🐯", "🐘"],
    instruction: "Complete the animal sequence.",
  },
  {
    id: "p3-5",
    level: 3,
    pattern: ["🍭", "🍬", "🍫", "🍭", "🍬"],
    correctAnswer: "🍫",
    options: ["🍬", "🍭", "🍩", "🍫"],
    instruction: "What's the next treat?",
  },
  {
    id: "p3-6",
    level: 3,
    pattern: ["🍎", "🍌", "🍇", "🍓", "🍎", "🍌", "🍇"],
    correctAnswer: "🍓",
    options: ["🍌", "🍓", "🍎", "🍇"],
    instruction: "Which sweet fruit finishes the line?",
  },
  {
    id: "p3-7",
    level: 3,
    pattern: ["🚗", "🚀", "⛵", "🚗", "🚀", "⛵", "🚗"],
    correctAnswer: "🚀",
    options: ["⛵", "🚗", "🚀", "🚲"],
    instruction: "What vehicle travels next?",
  },
  {
    id: "p3-8",
    level: 3,
    pattern: ["🔷", "🔶", "🔷", "🔶", "🔷"],
    correctAnswer: "🔶",
    options: ["🔷", "🟢", "🔶", "🟣"],
    instruction: "Find the next gem shape.",
  },
  {
    id: "p3-9",
    level: 3,
    pattern: ["🐶", "🐱", "🐭", "🐹", "🐶", "🐱", "🐭"],
    correctAnswer: "🐹",
    options: ["🐶", "🐹", "🐱", "🐭"],
    instruction: "Which cute pet is next?",
  },
  {
    id: "p3-10",
    level: 3,
    pattern: ["🌸", "🌹", "🌻", "🌸", "🌹"],
    correctAnswer: "🌻",
    options: ["🌹", "🌸", "🌻", "🌼"],
    instruction: "Pick the next bright flower.",
  },
  {
    id: "p3-11",
    level: 3,
    pattern: ["🔴", "🔴", "🔵", "🔵", "🔴", "🔴"],
    correctAnswer: "🔵",
    options: ["🟡", "🔵", "🔴", "🟢"],
    instruction: "Double red, double blue... what's next?",
  },
  {
    id: "p3-12",
    level: 3,
    pattern: ["☀️", "🌤️", "⛅", "☁️", "☀️", "🌤️", "⛅"],
    correctAnswer: "☁️",
    options: ["⛅", "☀️", "☁️", "🌤️"],
    instruction: "Watch the sky: what comes next?",
  },
];

export function getQuestionsForLevel(level: number, count: number): PatternQuestion[] {
  const levelQuestions = PATTERN_BANK.filter((q) => q.level === level);
  const selectedQuestions = shuffleArray(levelQuestions).slice(0, count);

  // Guarantee that every question has its answer options randomized
  // so the correct answer never sits in the same slot
  return selectedQuestions.map((q) => ({
    ...q,
    options: shuffleArray(q.options),
  }));
}
