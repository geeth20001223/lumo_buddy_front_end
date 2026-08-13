"use client";

import { useSearchParams, useRouter, useParams } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { getChildForCurrentParent } from "@/lib/children";
import { getGameBySlugAndLevel } from "@/lib/games";
import { saveGameScore } from "@/lib/game-scores";

import { playGameSound } from "@/lib/game-sounds";

import { LoadingState } from "@/components/ui/LoadingState";

import { CalmCompletionScreen } from "@/components/games/CalmCompletionScreen";
import { CountingAtmosphere } from "@/components/games/count-the-objects/CountingAtmosphere";
import { GameIntroScreen } from "@/components/games/redesign/GameIntroScreen";

// Components
import { CountingGameHeader } from "@/components/games/count-the-objects/CountingGameHeader";
import { CountingDisplayArea } from "@/components/games/count-the-objects/CountingDisplayArea";
import { NumberChoiceGrid } from "@/components/games/count-the-objects/NumberChoiceGrid";
import { CountingProgress } from "@/components/games/count-the-objects/CountingProgress";
import { MascotFeedbackBar } from "@/components/games/redesign/MascotFeedbackBar";
import { LumiMascot } from "@/components/games/redesign/LumiMascot";

// Logic
import { getCountingLevelConfig } from "@/lib/games/count-the-objects/levels";
import { generateCountingQuestions, CountingQuestion } from "@/lib/games/count-the-objects/questions";
import { calculateCountingScore } from "@/lib/games/count-the-objects/scoring";
import { getRandomCountingFeedback } from "@/lib/games/count-the-objects/helpers";
import { COUNT_OBJECTS_CONFIG } from "@/lib/games/count-the-objects/config";

// Types
import { ChildProfile } from "@/types/child";
import { Game } from "@/types/game";

export default function CountTheObjectsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = useParams<{ childId: string }>();
  const level = parseInt(searchParams?.get("level") || "1");
  const levelConfig = getCountingLevelConfig(level);

  // Core State
  const [child, setChild] = useState<ChildProfile | null>(null);
  const [gameData, setGameData] = useState<Game | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const [gameState, setGameState] = useState<"start" | "playing" | "saving" | "completed">("start");
  const [resultHref, setResultHref] = useState<string | null>(null);

  // Gameplay State
  const [questions, setQuestions] = useState<CountingQuestion[]>([]);
  const [currentRound, setCurrentRound] = useState(0);
  const [isAnswered, setIsAnswered] = useState(false);
  const [feedback, setFeedback] = useState<{ message: string; type: "correct" | "incorrect" | null }>({
    message: "",
    type: null,
  });

  // Performance Metrics (Refs for sync updates)
  const correctCountRef = useRef(0);
  const wrongCountRef = useRef(0);
  const attemptsRef = useRef(0);
  const startTimeRef = useRef<number>(0);

  const [displayScore, setDisplayScore] = useState(0);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState(false);

  const mobileMascotState =
    feedback.type === "correct"
      ? "correct"
      : feedback.type === "incorrect"
        ? "incorrect"
        : "normal";
  const mobileMascotMessage = feedback.message || "Choose the number.";

  // Load Data
  useEffect(() => {
    async function init() {
      try {
        const [childRes, gameRes] = await Promise.all([
          getChildForCurrentParent(params.childId),
          getGameBySlugAndLevel(COUNT_OBJECTS_CONFIG.gameSlug, level),
        ]);

        setChild(childRes.child);
        setGameData(childRes.child ? gameRes : null);

        const generatedQuestions = generateCountingQuestions(
          level,
          levelConfig.rounds,
          levelConfig.maxQuantity,
          levelConfig.optionsCount
        );
        setQuestions(generatedQuestions);
      } catch (error) {
        console.error("[CountObjects] Initialization failed:", error);
      } finally {
        setIsLoading(false);
      }
    }
    init();
  }, [params.childId, level, levelConfig]);

  const startGame = () => {
    startTimeRef.current = Date.now();
    setGameState("playing");
  };

  // Interaction
  const handleSelectAnswer = (value: number) => {
    if (isAnswered) return;
    setIsAnswered(true);
    attemptsRef.current += 1;

    const currentQuestion = questions[currentRound];
    const isCorrect = value === currentQuestion.count;

    if (isCorrect) {
      playGameSound("correct");
      correctCountRef.current += 1;
      setFeedback({
        message: getRandomCountingFeedback("correct"),
        type: "correct"
      });

      // Update local score
      const newScore = calculateCountingScore({
        correctAnswers: correctCountRef.current,
        wrongAnswers: wrongCountRef.current,
        timeTaken: Math.floor((Date.now() - startTimeRef.current) / 1000),
        timePenaltyDivisor: levelConfig.timePenaltyDivisor,
      });
      setDisplayScore(newScore);

      // Next round after delay
      setTimeout(() => {
        if (currentRound + 1 < levelConfig.rounds) {
          const nextIndex = currentRound + 1;
          setCurrentRound(nextIndex);
          setIsAnswered(false);
          setFeedback({ message: "", type: null });
        } else {
          finishGame();
        }
      }, 2000);
    } else {
      playGameSound("wrong");
      wrongCountRef.current += 1;
      setFeedback({
        message: getRandomCountingFeedback("incorrect"),
        type: "incorrect"
      });

      // Allow retry after delay
      setTimeout(() => {
        setIsAnswered(false);
        setFeedback({ message: "", type: null });
      }, 2000);
    }
  };

  const finishGame = async () => {
    setGameState("saving");
    if (!child || !gameData) return;
    await handleSaveScore();
  };

  const handleSaveScore = async () => {
    if (!gameData) return;

    setIsSaving(true);
    setSaveError(false);

    const endTime = Date.now();
    const timeTaken = Math.max(Math.floor((endTime - startTimeRef.current) / 1000), 1);

    try {
      const finalScore = calculateCountingScore({
        correctAnswers: correctCountRef.current,
        wrongAnswers: wrongCountRef.current,
        timeTaken,
        timePenaltyDivisor: levelConfig.timePenaltyDivisor,
      });

      const sessionId = await saveGameScore({
        child_id: params.childId,
        game_id: gameData.id,
        area: "mathematical",
        level,
        correct_answers: correctCountRef.current,
        wrong_answers: wrongCountRef.current,
        attempts: attemptsRef.current,
        time_taken: timeTaken,
        final_score: finalScore,
      });

      playGameSound("levelWin");
      setResultHref(`/game-result/${sessionId}`);
    } catch (error) {
      console.error("[CountObjects] Failed to save score:", error);
      setIsSaving(false);
      setSaveError(true);
      setGameState("completed");
    }
  };

  if (isLoading) return <LoadingState message="Setting up your counting activity..." />;

  if (resultHref) {
    return (
      <CalmCompletionScreen
        onShowResults={() => router.push(resultHref)}
      />
    );
  }

  return (
    <main className="relative flex h-screen overflow-hidden flex-col bg-[#f0fdff]">
      <CountingAtmosphere />

      {gameState !== "start" && (
        <CountingGameHeader
          childId={params.childId}
          score={displayScore}
          level={level}
        />
      )}

      <div className="relative z-10 flex flex-1 min-h-0 flex-col px-3 sm:px-6 py-2">
        {gameState === "start" && (
          <GameIntroScreen
            gameTitle="Count Objects"
            title="Count the Objects"
            description="Look closely at the fun objects on screen and choose the correct number! Let's practice counting together."
            level={level}
            levelLabel={`Up to ${levelConfig.maxQuantity}`}
            mascotImage="/images/games/emotion-face-match.png"
            buttonText="Start Counting Activity"
            onStart={startGame}
            onBack={() => router.push(`/games/${params.childId}`)}
            accentColor="blue"
            chips={[
              { icon: "🔢", text: "Number Recognition" },
              { icon: "👀", text: "Visual Focus" }
            ]}
          />
        )}

        {gameState === "playing" && questions.length > 0 && (
          <div className="mx-auto flex w-full max-w-[1180px] flex-1 flex-col justify-between overflow-y-auto rounded-[2.2rem] border border-white/80 bg-white/75 p-4 shadow-[0_26px_74px_rgba(34,211,238,0.12)] backdrop-blur-xl sm:p-6 gap-4">
            <div className="w-full space-y-3.5">
              <CountingDisplayArea
                emoji={questions[currentRound].emoji}
                count={questions[currentRound].count}
              />

              <MascotFeedbackBar feedbackType={feedback.type} childName={child?.child_name} />

              <NumberChoiceGrid
                options={questions[currentRound].options}
                onSelect={handleSelectAnswer}
                disabled={isAnswered}
              />
            </div>

            <div className="w-full pt-2">
              <CountingProgress
                current={currentRound + 1}
                total={levelConfig.rounds}
              />
            </div>
          </div>
        )}

        {gameState === "saving" && (
          <div className="flex-1 flex items-center justify-center p-6">
            <LoadingState message="Saving your wonderful counting progress..." />
          </div>
        )}

        {gameState === "completed" && (
          <div className="flex-1 flex items-center justify-center p-6">
            <div className="w-full max-w-xl bg-white/40 backdrop-blur-xl rounded-[3rem] border border-white/80 p-12 sm:p-20 shadow-premium text-center space-y-10">
              <div className="w-24 h-24 rounded-full bg-cyan-100 flex items-center justify-center text-5xl mx-auto shadow-sm">{"\uD83D\uDD22"}</div>
              <div className="space-y-4">
                <h2 className="text-4xl font-black text-slate-900 leading-tight">Great Counting!</h2>
                {saveError ? (
                  <div className="space-y-6 pt-4">
                    <p className="text-lg text-slate-500 font-medium leading-relaxed max-w-sm mx-auto">
                      You did a wonderful job counting today. We're having a little trouble saving your score right now.
                    </p>
                    <button
                      onClick={handleSaveScore}
                      disabled={isSaving}
                      className="inline-flex items-center gap-2 px-10 py-5 rounded-full bg-cyan-600 text-white font-black uppercase tracking-widest text-xs shadow-xl hover:bg-cyan-700 transition-all"
                    >
                      {isSaving ? "Trying again..." : "Try Saving Again"}
                    </button>
                  </div>
                ) : (
                  <p className="text-xl text-slate-500 font-medium leading-relaxed max-w-sm mx-auto">
                    Wonderful work! We're preparing your result...
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
