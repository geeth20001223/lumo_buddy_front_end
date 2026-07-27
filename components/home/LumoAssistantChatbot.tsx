"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Sparkles, User, HelpCircle, RotateCcw } from "lucide-react";

interface ChatMessage {
  id: string;
  sender: "bot" | "user";
  text: string;
  timestamp: string;
}

const DEFAULT_SUGGESTIONS = [
  "How does the screening survey work?",
  "Tell me about the 8 learning games",
  "How do game unlock levels work?",
  "How do parents track child progress?",
  "Can parents retake the survey?",
  "How do boy & girl avatar profiles work?",
  "What if my child makes a mistake?",
  "Is Lumo Buddy completely free?",
];

// Next-Level Animated Cyber-Bee Mascot Icon Component
function NextLevelCyberBee({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <style>{`
        @keyframes beeWingLeft {
          0%, 100% { transform: rotate(0deg) scale(1); }
          50% { transform: rotate(-32deg) translateY(-6px) scale(1.08); }
        }
        @keyframes beeWingRight {
          0%, 100% { transform: rotate(0deg) scale(1); }
          50% { transform: rotate(32deg) translateY(-6px) scale(1.08); }
        }
        @keyframes beeFloat {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-4px) rotate(2deg); }
        }
        @keyframes beeBlink {
          0%, 90%, 100% { transform: scaleY(1); }
          95% { transform: scaleY(0.1); }
        }
        @keyframes auraPulse {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 0.9; transform: scale(1.12); }
        }
        @keyframes lightPulse {
          0%, 100% { opacity: 0.6; stroke-dashoffset: 0; }
          50% { opacity: 1; stroke-dashoffset: 20; }
        }
        .cyber-wing-left { transform-origin: 36px 30px; animation: beeWingLeft 0.2s infinite ease-in-out; }
        .cyber-wing-right { transform-origin: 64px 30px; animation: beeWingRight 0.2s infinite ease-in-out; }
        .cyber-bee-body { animation: beeFloat 2.8s infinite ease-in-out; }
        .cyber-bee-eye { transform-origin: center; animation: beeBlink 3.8s infinite; }
        .cyber-bee-aura { transform-origin: 50px 88px; animation: auraPulse 2.2s infinite ease-in-out; }
        .cyber-light-strip { animation: lightPulse 2s infinite linear; }
      `}</style>

      {/* Honey Emerald Levitation Aura Ring */}
      <ellipse className="cyber-bee-aura" cx="50" cy="88" rx="26" ry="6" fill="url(#honeyAura)" opacity="0.8" />

      <g className="cyber-bee-body">
        {/* Flapping Iridescent Left Wing */}
        <ellipse className="cyber-wing-left" cx="24" cy="24" rx="17" ry="27" fill="url(#glassWing)" stroke="#ffffff" strokeWidth="2.5" opacity="0.95" transform="rotate(-35 24 24)" />

        {/* Flapping Iridescent Right Wing */}
        <ellipse className="cyber-wing-right" cx="76" cy="24" rx="17" ry="27" fill="url(#glassWing)" stroke="#ffffff" strokeWidth="2.5" opacity="0.95" transform="rotate(35 76 24)" />

        {/* Antennae with Glowing Emerald Bulbs */}
        <path d="M42 24 C 36 14, 26 10, 22 8" stroke="#18181b" strokeWidth="4" strokeLinecap="round" />
        <circle cx="21" cy="7" r="5" fill="#10b981" stroke="#ffffff" strokeWidth="2" />
        <circle cx="21" cy="7" r="2" fill="#a7f3d0" />

        <path d="M58 24 C 64 14, 74 10, 78 8" stroke="#18181b" strokeWidth="4" strokeLinecap="round" />
        <circle cx="79" cy="7" r="5" fill="#10b981" stroke="#ffffff" strokeWidth="2" />
        <circle cx="79" cy="7" r="2" fill="#a7f3d0" />

        {/* Cute Honey-Amber Bee Body */}
        <ellipse cx="50" cy="54" rx="32" ry="36" fill="url(#cyberBeeBody)" stroke="#ffffff" strokeWidth="3.5" />

        {/* Metallic Dark Cyber Stripes */}
        <path d="M20 44 C 30 50, 70 50, 80 44 C 78 56, 22 56, 20 44 Z" fill="#18181b" />
        <path d="M22 62 C 32 68, 68 68, 78 62 C 74 73, 26 73, 22 62 Z" fill="#18181b" />

        {/* MODERN NEON LIGHT STRIP CIRCUITS */}
        <path className="cyber-light-strip" d="M24 47 C 34 52, 66 52, 76 47" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" fill="none" strokeDasharray="4 2" />
        <path className="cyber-light-strip" d="M26 65 C 34 70, 66 70, 74 65" stroke="#fbbf24" strokeWidth="2.5" strokeLinecap="round" fill="none" strokeDasharray="4 2" />

        {/* Stinger Tip */}
        <path d="M45 88 L50 98 L55 88 Z" fill="#18181b" stroke="#10b981" strokeWidth="1.5" />

        {/* Dark Visor Face Screen */}
        <rect x="28" y="32" width="44" height="24" rx="12" fill="#18181b" stroke="#10b981" strokeWidth="2" />

        {/* Expressive Glowing Emerald LED Visor Eyes */}
        <g className="cyber-bee-eye">
          <circle cx="39" cy="44" r="5" fill="#10b981" />
          <circle cx="41" cy="42" r="2" fill="#ffffff" />

          <circle cx="61" cy="44" r="5" fill="#10b981" />
          <circle cx="63" cy="42" r="2" fill="#ffffff" />
        </g>

        {/* Rosy Blush LED Cheeks */}
        <ellipse cx="32" cy="49" rx="3" ry="2" fill="#f43f5e" opacity="0.8" />
        <ellipse cx="68" cy="49" rx="3" ry="2" fill="#f43f5e" opacity="0.8" />

        {/* Cute LED Smile */}
        <path d="M45 49 Q 50 54, 55 49" stroke="#34d399" strokeWidth="2" strokeLinecap="round" fill="none" />

        {/* Specular Highlight Reflection */}
        <ellipse cx="42" cy="28" rx="15" ry="6" fill="#ffffff" opacity="0.5" transform="rotate(-15 42 28)" />
      </g>

      <defs>
        <radialGradient id="honeyAura" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.8" />
          <stop offset="60%" stopColor="#10b981" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
        </radialGradient>

        <linearGradient id="cyberBeeBody" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fef08a" />
          <stop offset="35%" stopColor="#fbbf24" />
          <stop offset="70%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>

        <linearGradient id="glassWing" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
          <stop offset="50%" stopColor="#fef08a" stopOpacity="0.75" />
          <stop offset="100%" stopColor="#fbcfe8" stopOpacity="0.65" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function playBotChimeSound() {
  if (typeof window === "undefined") return;
  try {
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    const now = ctx.currentTime;
    osc.frequency.setValueAtTime(659.25, now);
    osc.frequency.setValueAtTime(880, now + 0.08);

    gain.gain.setValueAtTime(0.08, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.3);
  } catch (err) { }
}

export function LumoAssistantChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputQuery, setInputQuery] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      sender: "bot",
      text: "Bzzzz-beep! 👋 Hi there! I'm Lumo Buddy AI 🐝✨ Welcome to Lumo Buddy! Ask me any question about screening surveys, games, child profiles, or progress reports!",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);

  const chatContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Lock body scroll when chatbot is open on mobile
  useEffect(() => {
    const isMobile = window.innerWidth < 640;
    if (isOpen && isMobile) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const scrollChatToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    if (isOpen) {
      scrollChatToBottom();
    }
  }, [messages, isTyping, isOpen]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || inputQuery;
    if (!text.trim() || isTyping) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: "user",
      text: text,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputQuery("");
    setIsTyping(true);

    try {
      const history = messages.map((m) => ({
        role: m.sender === "user" ? "user" : "model",
        text: m.text,
      }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: text, history }),
      });

      const data = await res.json();
      const reply = data?.reply || "I'm Lumo, your friendly Lumo Buddy AI Assistant! How can I help you and your child today?";

      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: "bot",
        text: reply,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: "bot",
        text: "I'm Lumo, your friendly Lumo Buddy AI Assistant! Ask me anything about our parent screening survey, child games, unlock levels, or progress reports!",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, botMsg]);
    } finally {
      setIsTyping(false);
      playBotChimeSound();
    }
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: "welcome-" + Date.now(),
        sender: "bot",
        text: "Bzzzz-beep! 👋 Hi there! I'm Lumo AI 🐝✨ Ask me any question about screening surveys, games, child profiles, or progress reports!",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      },
    ]);
  };

  return (
    <>
      {/* Dynamic Keyframes CSS for Shimmering Light Strip Beam */}
      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes lightBeamSweeper {
          0% { transform: translateX(-100%) rotate(20deg); }
          100% { transform: translateX(250%) rotate(20deg); }
        }
        .animate-light-strip {
          animation: lightBeamSweeper 3s infinite ease-in-out;
        }
      `}} />

      {/* ===== FLOATING WIDGET TRIGGER BUTTON (BOTTOM RIGHT) ===== */}
      {/* On mobile: sits above MobileBottomNav (bottom-[5.5rem]). On desktop: bottom-6. */}
      <div className="fixed bottom-[5.5rem] sm:bottom-6 right-3 sm:right-6 z-40">
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
          onClick={() => setIsOpen(!isOpen)}
          className="relative overflow-hidden flex items-center gap-2 px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-full bg-gradient-to-r from-amber-400 via-amber-500 to-emerald-600 text-slate-950 font-black text-[11px] sm:text-xs uppercase tracking-wider shadow-2xl shadow-amber-500/45 border-2 border-white/90"
        >
          {/* MODERN GLOWING LIGHT STRIP BEAM SWEEPER */}
          <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/50 to-transparent pointer-events-none animate-light-strip" />

          <NextLevelCyberBee className="w-6 h-6 sm:w-8 sm:h-8 filter drop-shadow-md" />
          <span className="drop-shadow-sm text-slate-950 font-black relative z-10">{isOpen ? "Close" : "Ask Lumo AI"}</span>
          <span className="relative flex h-2 w-2 z-10">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-80"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
          </span>
        </motion.button>
      </div>

      {/* ===== CHATBOT MODAL POPUP ===== */}
      {/* On mobile: full-screen takeover. On sm+: anchored bottom-right popup. */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.88, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.88, y: 30 }}
            transition={{ type: "spring", stiffness: 320, damping: 26 }}
            className="fixed inset-0 sm:inset-auto sm:bottom-20 sm:right-6 sm:w-[400px] sm:h-[520px] sm:max-h-[calc(100vh-120px)] w-full h-full sm:rounded-[2.5rem] bg-white/98 backdrop-blur-3xl border-0 sm:border-4 sm:border-amber-300/90 rounded-none shadow-none sm:shadow-[0_25px_60px_rgba(245,158,11,0.35)] z-50 flex flex-col overflow-hidden"
          >
            {/* Chatbot Header */}
            <div className="relative p-4 px-5 sm:px-6 bg-gradient-to-r from-amber-400 via-emerald-500 to-fuchsia-600 text-white flex items-center justify-between safe-area-top">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-white/25 backdrop-blur-md border border-white/40 flex items-center justify-center shadow-sm p-0.5">
                  <NextLevelCyberBee className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="font-black text-sm uppercase tracking-wider text-white drop-shadow-sm">Lumo Buddy AI</h3>
                  <p className="text-[10px] text-amber-100 font-extrabold flex items-center gap-1">
                    <Sparkles size={10} className="text-amber-300 animate-pulse" /> Online
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={handleResetChat}
                  title="Restart Chat"
                  className="w-10 h-10 sm:w-8 sm:h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors text-white active:scale-90"
                >
                  <RotateCcw size={16} />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-10 h-10 sm:w-8 sm:h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors text-white active:scale-90"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* MODERN GLOWING ELECTRIC LIGHT STRIP BAR BENEATH HEADER */}
            <div className="h-1.5 w-full bg-gradient-to-r from-amber-300 via-emerald-400 to-fuchsia-400 animate-pulse shadow-md shadow-amber-400/50 shrink-0" />

            {/* Messages Body */}
            <div
              ref={chatContainerRef}
              className="flex-1 p-4 overflow-y-auto space-y-4 bg-gradient-to-b from-amber-50/30 via-slate-50 to-emerald-50/40 overscroll-contain"
            >
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-2.5 ${msg.sender === "user" ? "flex-row-reverse" : "flex-row"}`}
                >
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-black shadow-xs ${msg.sender === "user"
                      ? "bg-gradient-to-r from-fuchsia-600 to-pink-600 text-white"
                      : "bg-gradient-to-r from-amber-400 to-emerald-500 text-slate-900 p-0.5"
                      }`}
                  >
                    {msg.sender === "user" ? <User size={14} /> : <NextLevelCyberBee className="w-6 h-6" />}
                  </div>

                  <div
                    className={`max-w-[82%] p-3.5 rounded-2xl text-xs font-extrabold leading-relaxed shadow-xs whitespace-pre-wrap ${msg.sender === "user"
                      ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-tr-none"
                      : "bg-white text-slate-800 border border-amber-200/80 rounded-tl-none"
                      }`}
                  >
                    <p className="leading-relaxed">{msg.text}</p>
                    <span
                      className={`block text-[9px] mt-1.5 font-bold ${msg.sender === "user" ? "text-emerald-200 text-right" : "text-amber-700/80 text-left"
                        }`}
                    >
                      {msg.timestamp}
                    </span>
                  </div>
                </div>
              ))}

              {/* REAL CHATBOT TYPING INDICATOR */}
              {isTyping && (
                <div className="flex gap-2.5 items-center">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-r from-amber-400 to-emerald-500 text-slate-900 p-0.5 flex items-center justify-center">
                    <NextLevelCyberBee className="w-6 h-6 animate-pulse" />
                  </div>
                  <div className="bg-white p-3 rounded-2xl border border-amber-200/70 rounded-tl-none flex items-center gap-1.5 shadow-2xs">
                    <span className="text-[10px] font-black text-amber-600 mr-1">LUMO BUDDY is thinking</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}
            </div>

            {/* Suggestion Chips — Horizontally scrollable with proper touch scrolling */}
            <div className="px-3 py-2 bg-white border-t border-slate-100 flex gap-1.5 overflow-x-auto select-none shrink-0 touch-pan-x" style={{ WebkitOverflowScrolling: "touch" }}>
              {DEFAULT_SUGGESTIONS.map((sugg, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(sugg)}
                  disabled={isTyping}
                  className="px-2.5 py-1.5 rounded-full bg-amber-50 hover:bg-amber-100 active:bg-amber-200 text-amber-900 text-[10px] font-black whitespace-nowrap border border-amber-200 flex items-center gap-1 transition-colors disabled:opacity-50 min-h-[32px]"
                >
                  <HelpCircle size={10} />
                  <span>{sugg}</span>
                </button>
              ))}
            </div>

            {/* Input Bar — Safe area padding for mobile bottom notch */}
            <div className="p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] bg-white border-t border-slate-100 flex items-center gap-2 shrink-0">
              <input
                ref={inputRef}
                type="text"
                value={inputQuery}
                onChange={(e) => setInputQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
                placeholder={isTyping ? "Lumo is thinking..." : "Ask me anything..."}
                disabled={isTyping}
                className="flex-1 px-4 py-3 rounded-full bg-slate-100 border border-slate-200 text-sm font-extrabold text-slate-800 focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-200 transition-colors disabled:opacity-60"
                enterKeyHint="send"
                autoComplete="off"
              />
              <button
                onClick={() => handleSendMessage()}
                disabled={isTyping || !inputQuery.trim()}
                className="w-12 h-12 rounded-full bg-gradient-to-r from-amber-400 via-emerald-500 to-fuchsia-600 text-white flex items-center justify-center shadow-md hover:scale-105 active:scale-95 transition-all font-black disabled:opacity-40 min-w-[48px] min-h-[48px]"
              >
                <Send size={18} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
