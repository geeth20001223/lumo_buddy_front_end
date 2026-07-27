import { Button } from "@/components/ui/Button";

type SurveyNavigationProps = {
  canGoBack: boolean;
  isLastQuestion: boolean;
  isSaving: boolean;
  onBack: () => void;
  onNext: () => void;
};

export function SurveyNavigation({
  canGoBack,
  isLastQuestion,
  isSaving,
  onBack,
  onNext,
}: SurveyNavigationProps) {
  return (
    <div className="sticky bottom-[72px] sm:bottom-0 -mx-4 mt-8 border-t border-fuchsia-100/80 bg-white/95 px-4 py-4 backdrop-blur-md sm:static sm:mx-0 sm:border-0 sm:bg-transparent sm:px-0 sm:py-0 z-40">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Button
          disabled={!canGoBack || isSaving}
          onClick={onBack}
          type="button"
          variant="secondary"
          className="py-4 text-base shadow-sm"
        >
          ← Previous
        </Button>
        <Button
          isLoading={isSaving}
          loadingText={
            isLastQuestion ? "Calculating support level..." : "Saving responses..."
          }
          onClick={onNext}
          type="button"
          variant="primary"
          className="py-4 text-base shadow-lg shadow-purple-500/25"
        >
          {isLastQuestion ? "Submit Survey ✨" : "Next Question →"}
        </Button>
      </div>
    </div>
  );
}
