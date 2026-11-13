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
    <div className="mt-4 sm:mt-5 pt-1 sm:pt-2 pb-6 sm:pb-2">
      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        <Button
          disabled={!canGoBack || isSaving}
          onClick={onBack}
          type="button"
          variant="secondary"
          className="py-3 sm:py-4 text-xs sm:text-base font-extrabold shadow-xs rounded-xl sm:rounded-2xl"
        >
          ← Previous
        </Button>
        <Button
          isLoading={isSaving}
          loadingText={
            isLastQuestion ? "Calculating..." : "Saving..."
          }
          onClick={onNext}
          type="button"
          variant="primary"
          className="py-3 sm:py-4 text-xs sm:text-base font-extrabold shadow-lg shadow-purple-500/25 rounded-xl sm:rounded-2xl"
        >
          {isLastQuestion ? "Submit ✨" : "Next →"}
        </Button>
      </div>
    </div>
  );
}
