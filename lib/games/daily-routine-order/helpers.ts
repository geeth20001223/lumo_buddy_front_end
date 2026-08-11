import { RoutineStep } from "./routines";

export const SUPPORTIVE_FEEDBACK = {
  correct: [
    "Nice routine order 🌟",
    "Great sequencing 💛",
    "You found the steps 😊",
    "Wonderful routine practice 🌈",
  ],
  incorrect: [
    "That’s okay 💛",
    "Let’s look at the steps again 🌼",
    "Good try 😊",
    "We can practice the order gently 🌈",
  ],
};

export function getRandomFeedback(type: 'correct' | 'incorrect'): string {
  const list = SUPPORTIVE_FEEDBACK[type];
  return list[Math.floor(Math.random() * list.length)];
}

export function shuffleSteps(steps: RoutineStep[]): RoutineStep[] {
  return [...steps].sort(() => Math.random() - 0.5);
}

export function isOrderCorrect(selectedSteps: RoutineStep[], originalSteps: RoutineStep[]): boolean {
  if (selectedSteps.length !== originalSteps.length) return false;

  // 1. Strict sequence check
  const correctSequence = [...originalSteps].sort((a, b) => a.order - b.order);
  const isStrictMatch = selectedSteps.every((step, index) => step.id === correctSequence[index].id);

  if (isStrictMatch) return true;

  // 2. Flexible sequence check for routines with interchangeable pre-steps
  // Meal Time: "Wash hands" & "Sit at table" both must be BEFORE "Eat food", and "Clean plate" must be AFTER "Eat food"
  const selectedTextOrder = selectedSteps.map(s => s.text);
  if (originalSteps.some(s => s.text === "Clean plate") && originalSteps.some(s => s.text === "Eat food")) {
    const washIdx = selectedTextOrder.indexOf("Wash hands");
    const sitIdx = selectedTextOrder.indexOf("Sit at table");
    const eatIdx = selectedTextOrder.indexOf("Eat food");
    const cleanIdx = selectedTextOrder.indexOf("Clean plate");

    if (washIdx !== -1 && sitIdx !== -1 && eatIdx !== -1 && cleanIdx !== -1) {
      if (washIdx < eatIdx && sitIdx < eatIdx && eatIdx < cleanIdx) {
        return true;
      }
    }
  }

  // Going Outside: "Wear shoes" & "Take water" can be in any order before "Say goodbye", and "Go outside" is last
  if (originalSteps.some(s => s.text === "Go outside") && originalSteps.some(s => s.text === "Say goodbye")) {
    const shoesIdx = selectedTextOrder.indexOf("Wear shoes");
    const waterIdx = selectedTextOrder.findIndex(t => t.includes("water"));
    const byeIdx = selectedTextOrder.indexOf("Say goodbye");
    const outIdx = selectedTextOrder.indexOf("Go outside");

    if (shoesIdx !== -1 && waterIdx !== -1 && byeIdx !== -1 && outIdx !== -1) {
      if (shoesIdx < byeIdx && waterIdx < byeIdx && byeIdx < outIdx) {
        return true;
      }
    }
  }

  // Morning routine: "Wake up" first, then "Brush teeth" & "Eat breakfast" in any order
  if (originalSteps.some(s => s.text === "Wake up")) {
    const wakeIdx = selectedTextOrder.indexOf("Wake up");
    const eatIdx = selectedTextOrder.indexOf("Eat breakfast");
    const brushIdx = selectedTextOrder.indexOf("Brush teeth");

    if (wakeIdx === 0 && eatIdx !== -1 && brushIdx !== -1) {
      if (originalSteps.length === 3) return true;
      const schoolIdx = selectedTextOrder.indexOf("Go to school");
      if (schoolIdx !== -1 && eatIdx < schoolIdx && brushIdx < schoolIdx) return true;
    }
  }

  return false;
}
