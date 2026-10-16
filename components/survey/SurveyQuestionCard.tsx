import { motion, AnimatePresence } from "framer-motion";
import { SurveyAnswerOption } from "./SurveyAnswerOption";
import type { SurveyQuestion } from "@/types/survey";
import { HelpCircle } from "lucide-react";

type SurveyQuestionCardProps = {
  question: SurveyQuestion;
  selectedAnswer?: string | number;
  onSelectAnswer: (answer: string) => void;
};

export function SurveyQuestionCard({
  question,
  selectedAnswer,
  onSelectAnswer,
}: SurveyQuestionCardProps) {
  const options = question.options && question.options.length > 0
    ? question.options
    : ["Yes", "No"];

  return (
    <AnimatePresence mode="wait">
      <motion.section
        key={question.id || question.question}
        initial={{ opacity: 0, x: 20, scale: 0.98 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        exit={{ opacity: 0, x: -20, scale: 0.98 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="rounded-[2.5rem] border-2 border-fuchsia-100/90 bg-white/95 backdrop-blur-xl p-6 sm:p-9 shadow-2xl shadow-purple-900/10 space-y-6 relative overflow-hidden"
      >
        {/* Decorative Ambient Background Circle */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-fuchsia-100/40 to-rose-100/20 rounded-full blur-2xl pointer-events-none -z-10" />

        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-fuchsia-50 border border-fuchsia-200 text-fuchsia-700 text-xs font-black uppercase tracking-wider">
            <HelpCircle size={14} className="text-fuchsia-600" />
            {question.area_label || "Screening Question"}
          </div>
          <p className="text-xl sm:text-2xl font-black text-slate-900 leading-snug tracking-tight">
            {question.question}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-3 pt-2">
          {options.map((option) => (
            <SurveyAnswerOption
              isSelected={String(selectedAnswer) === option}
              key={option}
              label={option}
              onSelect={() => onSelectAnswer(option)}
            />
          ))}
        </div>
      </motion.section>
    </AnimatePresence>
  );
}
