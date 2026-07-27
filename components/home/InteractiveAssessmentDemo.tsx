"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, CheckCircle2, ArrowRight, Play, Gamepad2, ShieldCheck } from "lucide-react";
import Link from "next/link";

const DEMO_QUESTIONS = [
  {
    area: "Emotion Recognition",
    question: "How easily does your child identify feelings on faces?",
    options: [
      { label: "Needs Help", level: 1 },
      { label: "Sometimes", level: 2 },
      { label: "Very Easily", level: 3 },
    ],
  },
  {
    area: "Cognitive Matching",
    question: "How well does your child solve visual shape puzzles?",
    options: [
      { label: "Learning", level: 1 },
      { label: "Good Focus", level: 2 },
      { label: "Mastered", level: 3 },
    ],
  },
  {
    area: "Daily Routines",
    question: "How independently does your child complete routine steps?",
    options: [
      { label: "Step-by-step guidance", level: 1 },
      { label: "Moderate independence", level: 2 },
      { label: "High independence", level: 3 },
    ],
  },
];

export function InteractiveAssessmentDemo() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);

  const handleOptionSelect = (level: number) => {
    const updated = [...answers, level];
    setAnswers(updated);
    if (currentStep < DEMO_QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const resetDemo = () => {
    setCurrentStep(0);
    setAnswers([]);
    setIsCompleted(false);
  };

  const calculatedLevel = answers.length > 0
    ? Math.round(answers.reduce((a, b) => a + b, 0) / answers.length)
    : 1;

  return (
    <div className="w-full max-w-4xl mx-auto p-6 sm:p-10 rounded-[3rem] bg-gradient-to-br from-white via-sky-50/90 to-fuchsia-50/80 backdrop-blur-2xl border-4 border-white shadow-[0_25px_60px_rgba(56,189,248,0.2)] text-left relative overflow-hidden">
      {/* Header Badge */}
      <div className="flex items-center justify-between mb-6">
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-sky-500/15 via-fuchsia-500/15 to-indigo-500/15 border border-sky-300/80 text-xs font-black uppercase tracking-[0.2em] text-sky-700">
          <Sparkles size={14} className="text-amber-500 animate-spin" style={{ animationDuration: '6s' }} />
          INTERACTIVE DEMO PREVIEW
        </span>

        <button
          onClick={resetDemo}
          className="text-xs font-black uppercase tracking-wider text-slate-400 hover:text-sky-600 transition-colors"
        >
          Reset Demo 🔄
        </button>
      </div>

      {!isCompleted ? (
        <div className="space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-black uppercase tracking-widest text-fuchsia-600">
              Sample Question 0{currentStep + 1} of 03 • {DEMO_QUESTIONS[currentStep].area}
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 leading-snug">
              {DEMO_QUESTIONS[currentStep].question}
            </h3>
          </div>

          {/* Interactive Options */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            {DEMO_QUESTIONS[currentStep].options.map((option, idx) => (
              <motion.button
                key={idx}
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => handleOptionSelect(option.level)}
                className="p-5 rounded-2xl bg-white border-2 border-slate-200/80 hover:border-sky-400 hover:bg-sky-50/70 text-slate-800 text-sm font-black text-center shadow-xs transition-all flex flex-col items-center justify-center gap-2 group"
              >
                <span>{option.label}</span>
                <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-slate-100 text-slate-500 group-hover:bg-sky-500 group-hover:text-white transition-colors">
                  Level {option.level}
                </span>
              </motion.button>
            ))}
          </div>

          {/* Progress bar */}
          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-sky-400 via-fuchsia-500 to-indigo-500 h-full transition-all duration-500"
              style={{ width: `${((currentStep + 1) / 3) * 100}%` }}
            />
          </div>
        </div>
      ) : (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-6 text-center py-4"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-gradient-to-r from-emerald-400 to-teal-500 text-white shadow-lg shadow-teal-200">
              <CheckCircle2 size={36} />
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900">
                Predicted Support Level: <span className="text-emerald-600">Level {calculatedLevel}</span>
              </h3>
              <p className="text-sm font-bold text-slate-600 max-w-lg mx-auto leading-relaxed">
                Based on sample assessment, Level {calculatedLevel} adaptive learning games are unlocked for your child!
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <Link
                href="/register"
                className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-sky-500 via-indigo-600 to-fuchsia-600 text-white font-black text-sm uppercase tracking-widest shadow-xl hover:scale-105 transition-all flex items-center gap-2"
              >
                <span>Take Full Parent Survey</span>
                <ArrowRight size={18} />
              </Link>
              <button
                onClick={resetDemo}
                className="px-6 py-3.5 rounded-2xl bg-white border-2 border-slate-200 text-slate-700 font-black text-sm uppercase tracking-widest hover:bg-slate-50 transition-all"
              >
                Try Demo Again
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
}
