"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { SurveyIntroCard } from "@/components/survey/SurveyIntroCard";
import { SurveyLoadingState } from "@/components/survey/SurveyLoadingState";
import { SurveyNavigation } from "@/components/survey/SurveyNavigation";
import { SurveyProgressBar } from "@/components/survey/SurveyProgressBar";
import { SurveyQuestionCard } from "@/components/survey/SurveyQuestionCard";
import { SurveySectionTitle } from "@/components/survey/SurveySectionTitle";
import { SurveyBackground } from "@/components/survey/SurveyBackground";
import { getChildForCurrentParent } from "@/lib/children";
import { getSurveyQuestions, submitSurvey } from "@/lib/survey";
import type { ChildProfile } from "@/types/child";
import type {
  SurveyAnswerOption,
  SurveyAnswers,
  SurveyArea,
  SurveyQuestion,
} from "@/types/survey";

const answerOptions: SurveyAnswerOption[] = [
  { label: "Never", score: 0 },
  { label: "Rarely", score: 1 },
  { label: "Sometimes", score: 2 },
  { label: "Often", score: 3 },
  { label: "Always", score: 4 },
];

const areaOrder: SurveyArea[] = [
  "emotion",
  "cognitive",
  "self_awareness",
  "mathematical",
];

function sortQuestions(questions: SurveyQuestion[]) {
  return [...questions].sort((first, second) => {
    const areaDifference =
      areaOrder.indexOf(first.area) - areaOrder.indexOf(second.area);

    if (areaDifference !== 0) {
      return areaDifference;
    }

    return first.sort_order - second.sort_order;
  });
}

export default function SurveyPage() {
  const params = useParams<{ childId: string }>();
  const router = useRouter();
  const [child, setChild] = useState<ChildProfile | null>(null);
  const [questions, setQuestions] = useState<SurveyQuestion[]>([]);
  const [answers, setAnswers] = useState<SurveyAnswers>({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [savingStage, setSavingStage] = useState<"calculating" | "saving" | null>(null);

  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function loadSurvey() {
      try {
        const childResult = await getChildForCurrentParent(params.childId);
        const activeQuestions = await getSurveyQuestions();

        if (activeQuestions.length === 0) {
          throw new Error("empty_survey");
        }

        if (isMounted) {
          setChild(childResult.child);
          setQuestions(sortQuestions(activeQuestions));
        }
      } catch (error) {
        if (error instanceof Error && error.message === "not_authenticated") {
          router.replace("/login");
          return;
        }

        if (isMounted) {
          setErrorMessage("We could not load the survey.");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadSurvey();

    return () => {
      isMounted = false;
    };
  }, [params.childId, router]);

  const currentQuestion = questions[currentIndex];
  const answeredCount = useMemo(
    () =>
      questions.filter((question) => answers[question.id] !== undefined)
        .length,
    [answers, questions],
  );
  const isLastQuestion = currentIndex === questions.length - 1;

  function handleSelectAnswer(score: number) {
    if (!currentQuestion) {
      return;
    }

    setAnswers((currentAnswers) => ({
      ...currentAnswers,
      [currentQuestion.id]: score,
    }));
  }

  function handleBack() {
    setCurrentIndex((index) => Math.max(index - 1, 0));
  }

  async function handleNext() {
    if (!currentQuestion || answers[currentQuestion.id] === undefined) {
      toast.error("Please answer this question before continuing.");
      return;
    }

    if (!isLastQuestion) {
      setCurrentIndex((index) => index + 1);
      return;
    }

    if (answeredCount !== questions.length) {
      toast.error("Please answer all questions before submitting.");
      return;
    }

    setIsSaving(true);
    setErrorMessage("");
    setSavingStage("calculating");

    try {
      await submitSurvey({
        answers,
        childId: params.childId,
        questions,
      });
      setSavingStage("saving");
      toast.success("Survey completed! Great work!");
      router.push(`/assessment-result/${params.childId}`);
      router.refresh();
    } catch (err) {
      const message =
        err instanceof Error && err.message === "prediction_failed"
          ? "We could not calculate the support level right now. Please try again."
          : err instanceof Error && err.message === "assessment_save_failed"
            ? "We could not save your survey result. Please try again."
            : "Something went wrong. Please try again.";
      toast.error(message);
      setErrorMessage(message);
    } finally {
      setIsSaving(false);
      setSavingStage(null);
    }
  }

  return (
    <main className="min-h-screen relative overflow-hidden bg-gradient-to-br from-fuchsia-50 via-rose-50/60 to-amber-50/40 px-4 py-8 sm:py-10 pb-20">
      {/* Calm Parent Survey Background (No Stars / No Rainbows) */}
      <SurveyBackground />

      {/* Background color blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-5">
        <div className="absolute top-[-10%] left-[-5%] w-[45vw] h-[45vw] rounded-full bg-fuchsia-200/35 blur-[100px]" style={{ animation: 'blob 18s ease-in-out infinite' }}></div>
        <div className="absolute bottom-[-15%] right-[-10%] w-[45vw] h-[45vw] rounded-full bg-rose-200/30 blur-[100px]" style={{ animation: 'blob 22s ease-in-out infinite', animationDelay: '5s' }}></div>
        <div className="absolute top-[40%] right-[5%] w-[30vw] h-[30vw] rounded-full bg-amber-200/25 blur-[80px]" style={{ animation: 'drift 20s ease-in-out infinite' }}></div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes blob { 0% { transform: translate(0,0) scale(1); } 25% { transform: translate(40px,-50px) scale(1.08); } 50% { transform: translate(-30px,30px) scale(0.92); } 75% { transform: translate(20px,-20px) scale(1.04); } 100% { transform: translate(0,0) scale(1); } }
        @keyframes drift { 0%,100% { transform: translate(0,0); } 25% { transform: translate(15px,-25px); } 50% { transform: translate(-10px,15px); } 75% { transform: translate(20px,10px); } }
      `}} />

      <Toaster position="top-center" />
      <section className="relative z-10 mx-auto w-full max-w-3xl">
        <Link
          className="mb-6 inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/80 backdrop-blur-md border border-fuchsia-200/60 text-xs font-black uppercase tracking-widest text-fuchsia-700 hover:text-fuchsia-900 hover:bg-white hover:border-fuchsia-300 shadow-sm transition-all duration-300"
          href={`/children/${params.childId}`}
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
          </svg>
          Back to child profile
        </Link>

        {isLoading ? <SurveyLoadingState message="Loading survey..." /> : null}

        {!isLoading && errorMessage && !isSaving ? (
          <div
            className="rounded-3xl border-2 border-rose-200 bg-rose-50/90 backdrop-blur-md p-6 text-center text-sm font-extrabold text-rose-700 shadow-lg"
            role="alert"
          >
            {errorMessage}
          </div>
        ) : null}

        {!isLoading && child && !errorMessage && !hasStarted ? (
          <SurveyIntroCard
            childName={child.child_name}
            onStart={() => setHasStarted(true)}
          />
        ) : null}

        {!isLoading && child && currentQuestion && hasStarted ? (
          <div className="space-y-6">
            <SurveyProgressBar current={answeredCount} total={questions.length} />
            <SurveySectionTitle
              area={currentQuestion.area}
              current={currentIndex + 1}
              total={questions.length}
            />
            <SurveyQuestionCard
              answerOptions={answerOptions}
              onSelectAnswer={handleSelectAnswer}
              question={currentQuestion}
              selectedScore={answers[currentQuestion.id]}
            />

            {/* Staged saving indicator */}
            {isSaving && savingStage && (
              <div className="rounded-2xl bg-fuchsia-50/90 backdrop-blur-md border-2 border-fuchsia-200 px-6 py-4 flex items-center gap-4 shadow-md">
                <div className="w-6 h-6 rounded-full border-3 border-fuchsia-500 border-t-transparent animate-spin flex-shrink-0" />
                <p className="text-sm font-extrabold text-fuchsia-900">
                  {savingStage === "calculating"
                    ? "Calculating support level..."
                    : "Saving survey result..."}
                </p>
              </div>
            )}

            <SurveyNavigation
              canGoBack={currentIndex > 0 && !isSaving}
              isLastQuestion={isLastQuestion}
              isSaving={isSaving}
              onBack={handleBack}
              onNext={handleNext}
            />
          </div>
        ) : null}
      </section>
    </main>
  );
}
