import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Clock, ShieldCheck, Sparkles, HeartHandshake } from "lucide-react";

type SurveyIntroCardProps = {
  childName: string;
  onStart: () => void;
};

export function SurveyIntroCard({ childName, onStart }: SurveyIntroCardProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="rounded-[3rem] border-2 border-fuchsia-100/90 bg-white/95 backdrop-blur-xl p-8 sm:p-12 text-center shadow-2xl shadow-purple-900/10 space-y-8 relative overflow-hidden group"
    >
      {/* Decorative Top Accent Glow */}
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-48 bg-gradient-to-r from-fuchsia-300/30 via-rose-300/30 to-amber-300/30 rounded-full blur-3xl -z-10" />

      {/* Floating Animated Avatar Banner */}
      <div className="relative inline-block">
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="w-24 h-24 rounded-[2.5rem] bg-gradient-to-br from-fuchsia-400 via-purple-500 to-pink-500 p-1 shadow-lg shadow-purple-400/30 mx-auto"
        >
          <div className="w-full h-full rounded-[2.3rem] bg-white flex items-center justify-center text-4xl shadow-inner">
            📋
          </div>
        </motion.div>
        <div className="absolute -bottom-2 -right-2 px-3 py-1 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-[10px] font-black uppercase tracking-widest rounded-full shadow-md border-2 border-white flex items-center gap-1">
          <Sparkles size={12} /> Easy
        </div>
      </div>

      <div className="space-y-3">
        <span className="inline-flex items-center gap-2 rounded-full border border-fuchsia-200 bg-fuchsia-50/90 px-4 py-1.5 text-xs font-black uppercase tracking-[0.2em] text-fuchsia-700 shadow-xs">
          <HeartHandshake size={14} className="text-fuchsia-600" /> Parent Assessment Survey
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
          Supportive Learning Survey
        </h1>
        <p className="text-slate-600 font-extrabold text-base sm:text-lg mx-auto max-w-2xl leading-relaxed">
          Answer a few quick questions to help us personalize supportive learning
          activities tailored specifically for <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-600 to-purple-600 font-black">{childName}</span>.
        </p>
      </div>

      {/* Trust Highlights Checklist */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-xl mx-auto pt-2">
        <div className="bg-fuchsia-50/70 border border-fuchsia-100 rounded-2xl p-3.5 flex items-center justify-center gap-2.5 shadow-xs">
          <Clock size={18} className="text-fuchsia-600 shrink-0" />
          <span className="text-xs font-extrabold text-slate-800">5-8 Minutes</span>
        </div>
        <div className="bg-purple-50/70 border border-purple-100 rounded-2xl p-3.5 flex items-center justify-center gap-2.5 shadow-xs">
          <ShieldCheck size={18} className="text-purple-600 shrink-0" />
          <span className="text-xs font-extrabold text-slate-800">Private & Secure</span>
        </div>
        <div className="bg-rose-50/70 border border-rose-100 rounded-2xl p-3.5 flex items-center justify-center gap-2.5 shadow-xs">
          <Sparkles size={18} className="text-rose-600 shrink-0" />
          <span className="text-xs font-extrabold text-slate-800">Personalized</span>
        </div>
      </div>

      <div className="pt-4 flex justify-center">
        <Button className="sm:w-auto px-12 py-5 text-base shadow-xl shadow-purple-500/25" onClick={onStart} type="button" variant="primary">
          Start Survey 📋
        </Button>
      </div>
    </motion.section>
  );
}
