"use client";

import { useParams, useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";

import { getChildForCurrentParent } from "@/lib/children";
import { getGameBySlugAndLevel } from "@/lib/games";
import { saveGameScore } from "@/lib/game-scores";
import { playGameSound } from "@/lib/game-sounds";

import { LoadingState } from "@/components/ui/LoadingState";
import { CalmBackground } from "@/components/ui/CalmBackground";

import { EMOTION_STORY_CHOICE_CONFIG } from "@/lib/games/emotion-story-choice/config";
import { getStoryLevelConfig } from "@/lib/games/emotion-story-choice/levels";
import { getStoriesForLevel } from "@/lib/games/emotion-story-choice/stories";
import { calculateStoryChoiceScore, shuffleStories } from "@/lib/games/emotion-story-choice/scoring";

import { CalmCompletionScreen } from "@/components/games/CalmCompletionScreen";
import { StoryProgressBar } from "@/components/games/emotion-story-choice/StoryProgressBar";
import { StoryCard } from "@/components/games/emotion-story-choice/StoryCard";
import { StoryAnswerGrid } from "@/components/games/emotion-story-choice/StoryAnswerGrid";
import { MascotFeedbackBar } from "@/components/games/redesign/MascotFeedbackBar";
import { StoryAtmosphere } from "@/components/games/emotion-story-choice/StoryAtmosphere";
import { GameIntroScreen } from "@/components/games/redesign/GameIntroScreen";

import type { ChildProfile } from "@/types/child";
import type { Game } from "@/types/game";
import type { Story } from "@/types/games/emotion-story-choice";
import type { EmotionId } from "@/types/games/emotion-face-match";

export default function EmotionStoryChoicePage() {
  const params = useParams<{ childId: string }>();
  const searchParams = useSearchParams();
  const router = useRouter();

  const level = parseInt(searchParams.get("level") || "1");
  const levelConfig = getStoryLevelConfig(level);

  const [gameState, setGameState] = useState<"loading" | "start" | "playing" | "saving" | "error">("loading");
  const [resultHref, setResultHref] = useState<string | null>(null);
  const [child, setChild] = useState<ChildProfile | null>(null);
  const [gameRecord, setGameRecord] = useState<Game | null>(null);

  const [stories, setStories] = useState<Story[]>([]);
  const [currentRound, setCurrentRound] = useState(1);
  const [story, setStory] = useState<Story | null>(null);
  const [feedback, setFeedback] = useState<{
    type: "correct" | "incorrect" | null;
    visible: boolean;
  }>({ type: null, visible: false });
  const [selectedEmotion, setSelectedEmotion] = useState<EmotionId | null>(null);
  const [uiStage, setUiStage] = useState({
    showMascot: false,
    showBubble: false,
    showAnswers: false,
  });

  const [correctCount, setCorrectCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [startTime, setStartTime] = useState<number>(0);

  useEffect(() => {
    async function init() {
      try {
        const [c, g] = await Promise.all([
          getChildForCurrentParent(params.childId),
          getGameBySlugAndLevel(EMOTION_STORY_CHOICE_CONFIG.gameSlug, level),
        ]);

        const levelStories = shuffleStories(getStoriesForLevel(level));

        setChild(c.child);
        setGameRecord(g);
        setStories(levelStories);
        setGameState("start");
      } catch (err) {
        console.error("[Lumo Buddy] Initialization failed:", err);
        setGameState("error");
      }
    }
    init();
  }, [params.childId, level]);

  useEffect(() => {
    if (gameState !== "playing" || !story) return;

    setUiStage({
      showMascot: true,
      showBubble: true,
      showAnswers: true,
    });
  }, [gameState, story?.id]);

  const startGame = () => {
    setGameState("playing");
    setStartTime(Date.now());
    setUiStage({
      showMascot: true,
      showBubble: true,
      showAnswers: true,
    });
    nextRound(1);
  };

  const nextRound = useCallback(
    (roundNumber: number) => {
      const nextStory = stories[roundNumber - 1];
      if (!nextStory) {
        console.error(
          `[Lumo Buddy] Missing Emotion Story Choice content for level ${level}, round ${roundNumber}.`,
        );
        setGameState("error");
        return;
      }

      setStory(nextStory);
      setFeedback({ type: null, visible: false });
      setSelectedEmotion(null);
    },
    [level, stories],
  );

  const handleAnswer = async (selectedId: EmotionId) => {
    if (feedback.visible || !story) return;

    setSelectedEmotion(selectedId);
    setAttempts((prev) => prev + 1);

    if (selectedId === story.correctEmotion) {
      playGameSound("correct");
      setCorrectCount((prev) => prev + 1);
      setFeedback({ type: "correct", visible: true });

      setTimeout(() => {
        if (currentRound < levelConfig.rounds) {
          const nextRoundNumber = currentRound + 1;
          setCurrentRound(nextRoundNumber);
          nextRound(nextRoundNumber);
        } else {
          finishGame(correctCount + 1, wrongCount, attempts + 1);
        }
      }, 2500);
    } else {
      playGameSound("wrong");
      setWrongCount((prev) => prev + 1);
      setFeedback({ type: "incorrect", visible: true });

      setTimeout(() => {
        setFeedback({ type: null, visible: false });
      }, 2500);
    }
  };

  const finishGame = async (
    finalCorrect: number,
    finalWrong: number,
    finalAttempts: number,
  ) => {
    setGameState("saving");
    const endTime = Date.now();
    const timeTaken = Math.floor((endTime - startTime) / 1000);

    const result = calculateStoryChoiceScore(
      levelConfig,
      finalCorrect,
      finalWrong,
      timeTaken,
    );

    try {
      const sessionId = await saveGameScore({
        child_id: params.childId,
        game_id: gameRecord?.id || "",
        area: "emotion",
        level,
        correct_answers: finalCorrect,
        wrong_answers: finalWrong,
        attempts: finalAttempts,
        time_taken: timeTaken,
        final_score: result.finalScore,
      });

      playGameSound("levelWin");
      setResultHref(`/game-result/${sessionId}`);
    } catch (err) {
      setGameState("error");
    }
  };

  if (gameState === "loading") {
    return (
      <main className="min-h-screen flex items-center justify-center p-4">
        <LoadingState message={`Opening Storybook Level ${level}...`} />
      </main>
    );
  }

  if (resultHref) {
    return (
      <CalmCompletionScreen
        onShowResults={() => router.push(resultHref)}
      />
    );
  }

  if (gameState === "start") {
    return (
      <GameIntroScreen
        gameTitle="Story Choice"
        title="Story Choice"
        description={`Hello ${child?.child_name ?? "friend"}! Let's read some short stories and find the feelings together.`}
        level={level}
        levelLabel={levelConfig.label}
        mascotImage="/images/games/emotion-story.png"
        buttonText="Open Storybook"
        onStart={startGame}
        onBack={() => router.push(`/games/${params.childId}`)}
        accentColor="orange"
        chips={[
          { icon: "⭐", text: "Earn Stars" },
          { icon: "📖", text: "Read Stories" },
        ]}
      />
    );
  }

  if (gameState === "saving") {
    return (
      <main className="min-h-screen flex items-center justify-center p-4">
        <LoadingState message="Closing the storybook gently..." />
      </main>
    );
  }

  if (gameState === "error") {
    return (
      <main className="min-h-screen relative flex items-center justify-center p-4">
        {story ? <StoryAtmosphere story={story} /> : <CalmBackground />}
        <div className="text-center space-y-4">
          <p className="text-slate-500 font-bold tracking-widest uppercase text-xs">
            Something went wrong
          </p>
          <button
            onClick={() => window.location.reload()}
            className="text-blue-500 font-bold underline"
          >
            Try Again
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="relative flex h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-[#FEF9F3] via-orange-50/20 to-sky-50 px-2 py-3 sm:px-4 xl:py-5">
      {story ? <StoryAtmosphere story={story} /> : <CalmBackground />}

      {story && (
        <section className="relative z-10 mx-auto flex w-full max-w-[1150px] max-h-[calc(100vh-1.25rem)] flex-col overflow-hidden rounded-[2rem] border border-white bg-white/92 shadow-[0_22px_70px_rgba(251,146,60,0.14)] ring-1 ring-white/70 backdrop-blur-sm xl:max-w-[1280px] xl:rounded-[2.25rem]">
          <header className="border-b border-orange-100 px-4 py-3 sm:px-6">
            <div className="flex items-center justify-between gap-4">
              <div className="flex-1">
                <StoryProgressBar
                  currentRound={currentRound}
                  totalRounds={levelConfig.rounds}
                />
              </div>

              <button
                onClick={() => router.push(`/games/${params.childId}`)}
                className="group flex flex-shrink-0 items-center justify-center gap-2 rounded-2xl bg-white px-3.5 py-2.5 text-xs font-black uppercase tracking-widest text-slate-500 shadow-sm ring-1 ring-orange-100 transition-all hover:bg-rose-50 hover:text-rose-600 hover:ring-rose-200"
              >
                <svg
                  className="size-3.5 transition-transform group-hover:-translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 8.959 8.959 0 01-9 9"
                  />
                </svg>
                Exit
              </button>
            </div>
          </header>

          <div className="flex min-h-0 flex-1 flex-col justify-center gap-3 overflow-y-auto p-3 sm:gap-3.5 sm:p-4.5 xl:gap-4 xl:p-5">
            <div className="relative overflow-hidden rounded-[1.5rem] border border-orange-100 bg-gradient-to-br from-orange-50/70 via-white to-white p-3 shadow-sm sm:p-4 xl:rounded-[1.75rem] xl:p-4.5">
              <div className="pointer-events-none absolute left-10 top-8 size-24 rounded-full bg-orange-100/35 blur-3xl" />
              <div className="pointer-events-none absolute bottom-4 right-10 size-28 rounded-full bg-sky-100/35 blur-3xl" />
              <StoryCard story={story} />
            </div>

            <MascotFeedbackBar
              feedbackType={feedback.visible ? (feedback.type === "correct" ? "correct" : "incorrect") : null}
            />

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{
                opacity: uiStage.showAnswers ? 1 : 0,
                y: uiStage.showAnswers ? 0 : 12,
              }}
              transition={{ duration: 0.35 }}
              className="min-h-0"
            >
              <StoryAnswerGrid
                options={story.options}
                onAnswer={handleAnswer}
                disabled={feedback.visible}
                selectedEmotion={selectedEmotion}
                correctEmotion={story.correctEmotion}
                feedbackType={feedback.type}
              />
            </motion.div>
          </div>
        </section>
      )}
    </main>
  );
}
