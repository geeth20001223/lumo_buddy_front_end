"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { updateChildNotes } from "@/lib/children";

type ChildNotesCardProps = {
  childId: string;
  notes: string | null;
  childName?: string;
};

export function ChildNotesCard({ childId, notes: initialNotes, childName = "your child" }: ChildNotesCardProps) {
  const [notes, setNotes] = useState<string>("");
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [saveStatus, setSaveStatus] = useState<"idle" | "saved" | "saving">("idle");

  useEffect(() => {
    // Check localStorage fallback first, otherwise use initialNotes
    if (typeof window !== "undefined") {
      const savedLocal = localStorage.getItem(`child_notes_${childId}`);
      if (savedLocal !== null) {
        setNotes(savedLocal);
        return;
      }
    }
    setNotes(initialNotes || "");
  }, [childId, initialNotes]);

  const handleSave = async () => {
    setIsSaving(true);
    setSaveStatus("saving");

    await updateChildNotes(childId, notes);

    setIsSaving(false);
    setSaveStatus("saved");
    setTimeout(() => setSaveStatus("idle"), 3500);
  };

  return (
    <div className="w-full rounded-[2.2rem] border-2 border-white/80 bg-white/85 p-5 sm:p-6 shadow-[0_12px_32px_rgba(30,58,138,0.06)] backdrop-blur-xl space-y-3">
      {/* Header Row */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span className="w-8 h-8 rounded-xl bg-amber-100/80 border border-amber-200/80 flex items-center justify-center text-sm shadow-xs">
            📝
          </span>
          <div>
            <h2 className="font-display text-lg font-bold text-slate-900 leading-none">
              Parent Notes & Observations
            </h2>
            <p className="text-[11px] font-bold text-slate-400 mt-1">
              Keep quick notes on {childName}&apos;s learning progress and daily milestones
            </p>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {saveStatus === "saved" && (
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="inline-flex items-center gap-1 rounded-full bg-emerald-50 border border-emerald-200/80 px-3 py-1 text-xs font-black text-emerald-700 shadow-xs"
            >
              ✓ Saved
            </motion.span>
          )}
          {saveStatus === "saving" && (
            <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 border border-blue-200/80 px-3 py-1 text-xs font-black text-blue-700 animate-pulse">
              Saving...
            </span>
          )}
        </AnimatePresence>
      </div>

      {/* Horizontal Input & Save Action */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Type notes here... (e.g. Completed Emotion Level 1 today! Enjoys memory matching games.)"
          rows={2}
          className="flex-1 rounded-2xl border-2 border-slate-200/80 bg-slate-50/60 px-4 py-2.5 text-xs sm:text-sm font-semibold text-slate-800 placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-100 transition-all duration-200 resize-none min-h-[58px]"
        />

        <div className="flex sm:flex-col items-center justify-between sm:justify-center gap-1.5 flex-shrink-0">
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-2.5 text-xs font-black uppercase tracking-widest text-white shadow-md transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] hover:shadow-lg disabled:opacity-50 min-w-[130px]"
          >
            <span>💾</span> Save Notes
          </button>
          <span className="text-[10px] font-extrabold text-slate-400">
            {notes.length} chars
          </span>
        </div>
      </div>
    </div>
  );
}
