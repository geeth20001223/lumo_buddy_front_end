// Enable client-side rendering mode in Next.js App Router for interactive UI state and hooks
"use client";

// Import core React state and lifecycle hooks for state management and DOM node references
import { useState, useRef, useEffect } from "react";
// Import Framer Motion components for smooth UI physics animations and entry/exit transitions
import { motion, AnimatePresence } from "framer-motion";
// Import modern UI icons from Lucide React icon library
import { X, Send, Sparkles, User, HelpCircle, RotateCcw } from "lucide-react";

// Define TypeScript interface for individual chat message objects
interface ChatMessage {
  // Unique string identifier for key binding and message tracking
  id: string;
  // Sender role discriminator to distinguish between AI assistant and user
  sender: "bot" | "user";
  // The actual text message payload content
  text: string;
  // Formatted string timestamp indicating when the message was sent
  timestamp: string;
}

// Define TypeScript interface for child profile context passed into the chatbot component
export interface ChildChatContext {
  // Optional name of the selected child
  childName?: string;
  // Optional developmental assessment support level (Level 1, 2, or 3)
  assessmentLevel?: number | null;
  // Optional details for the next recommended learning game
  nextGame?: { name: string; level: number; area: string; slug: string } | null;
  // Number of games completed by the child
  gamesPlayed?: number;
  // Total number of available games in the learning platform
  totalGames?: number;
  // Formatted list of game names
  gameList?: string;
}

// Array of default suggestion prompt questions displayed as clickable quick-reply chips
const BASE_SUGGESTIONS = [
  // Quick question regarding how game unlock progression works
  "How do game unlock levels work?",
  // Quick question asking for information about the 8 core learning games
  "Tell me about the 8 learning games",
  // Quick question inquiring about the parent screening survey
  "How does the screening survey work?",
  // Quick question about retaking developmental screening assessment
  "Can parents retake the survey?",
  // Quick question regarding platform pricing and accessibility
  "Is Lumo Buddy completely free?",
];

// Next-Level Animated Cyber-Bee Mascot Icon SVG Component
function NextLevelCyberBee({ className = "w-8 h-8" }: { className?: string }) {
  // Return animated vector graphics representation of Lumo Cyber-Bee mascot
  return (
    // SVG Canvas container with 100x100 viewBox and responsive CSS class styling
    <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Embedded CSS style tag for keyframe animations and SVG element transforms */}
      <style>{`
        /* Keyframe animation for left wing fluttering rotation and scaling */
        @keyframes beeWingLeft {
          0%, 100% { transform: rotate(0deg) scale(1); }
          50% { transform: rotate(-32deg) translateY(-6px) scale(1.08); }
        }
        /* Keyframe animation for right wing fluttering rotation and scaling */
        @keyframes beeWingRight {
          0%, 100% { transform: rotate(0deg) scale(1); }
          50% { transform: rotate(32deg) translateY(-6px) scale(1.08); }
        }
        /* Keyframe animation for floating/levitating body effect */
        @keyframes beeFloat {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-4px) rotate(2deg); }
        }
        /* Keyframe animation for periodic eye blinking effect */
        @keyframes beeBlink {
          0%, 90%, 100% { transform: scaleY(1); }
          95% { transform: scaleY(0.1); }
        }
        /* Keyframe animation for pulsing glow aura ring underneath bee */
        @keyframes auraPulse {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 0.9; transform: scale(1.12); }
        }
        /* Keyframe animation for circuit light strip pulse effect */
        @keyframes lightPulse {
          0%, 100% { opacity: 0.6; stroke-dashoffset: 0; }
          50% { opacity: 1; stroke-dashoffset: 20; }
        }
        /* Class styling for left wing animation binding */
        .cyber-wing-left { transform-origin: 36px 30px; animation: beeWingLeft 0.2s infinite ease-in-out; }
        /* Class styling for right wing animation binding */
        .cyber-wing-right { transform-origin: 64px 30px; animation: beeWingRight 0.2s infinite ease-in-out; }
        /* Class styling for main body floating animation binding */
        .cyber-bee-body { animation: beeFloat 2.8s infinite ease-in-out; }
        /* Class styling for eye blink animation binding */
        .cyber-bee-eye { transform-origin: center; animation: beeBlink 3.8s infinite; }
        /* Class styling for aura pulse animation binding */
        .cyber-bee-aura { transform-origin: 50px 88px; animation: auraPulse 2.2s infinite ease-in-out; }
        /* Class styling for neon light strip animation binding */
        .cyber-light-strip { animation: lightPulse 2s infinite linear; }
      `}</style>

      {/* Honey Emerald Levitation Aura Ring underneath mascot */}
      <ellipse className="cyber-bee-aura" cx="50" cy="88" rx="26" ry="6" fill="url(#honeyAura)" opacity="0.8" />

      {/* Main floating body group container */}
      <g className="cyber-bee-body">
        {/* Flapping Iridescent Left Wing SVG Ellipse */}
        <ellipse className="cyber-wing-left" cx="24" cy="24" rx="17" ry="27" fill="url(#glassWing)" stroke="#ffffff" strokeWidth="2.5" opacity="0.95" transform="rotate(-35 24 24)" />

        {/* Flapping Iridescent Right Wing SVG Ellipse */}
        <ellipse className="cyber-wing-right" cx="76" cy="24" rx="17" ry="27" fill="url(#glassWing)" stroke="#ffffff" strokeWidth="2.5" opacity="0.95" transform="rotate(35 76 24)" />

        {/* Left Antenna Stem Path */}
        <path d="M42 24 C 36 14, 26 10, 22 8" stroke="#18181b" strokeWidth="4" strokeLinecap="round" />
        {/* Left Antenna Outer Glowing Emerald Tip Circle */}
        <circle cx="21" cy="7" r="5" fill="#10b981" stroke="#ffffff" strokeWidth="2" />
        {/* Left Antenna Inner Bright Core Circle */}
        <circle cx="21" cy="7" r="2" fill="#a7f3d0" />

        {/* Right Antenna Stem Path */}
        <path d="M58 24 C 64 14, 74 10, 78 8" stroke="#18181b" strokeWidth="4" strokeLinecap="round" />
        {/* Right Antenna Outer Glowing Emerald Tip Circle */}
        <circle cx="79" cy="7" r="5" fill="#10b981" stroke="#ffffff" strokeWidth="2" />
        {/* Right Antenna Inner Bright Core Circle */}
        <circle cx="79" cy="7" r="2" fill="#a7f3d0" />

        {/* Cute Honey-Amber Bee Main Body Ellipse */}
        <ellipse cx="50" cy="54" rx="32" ry="36" fill="url(#cyberBeeBody)" stroke="#ffffff" strokeWidth="3.5" />

        {/* Metallic Dark Upper Cyber Stripe Path */}
        <path d="M20 44 C 30 50, 70 50, 80 44 C 78 56, 22 56, 20 44 Z" fill="#18181b" />
        {/* Metallic Dark Lower Cyber Stripe Path */}
        <path d="M22 62 C 32 68, 68 68, 78 62 C 74 73, 26 73, 22 62 Z" fill="#18181b" />

        {/* Modern Neon Green Light Strip Circuit Line Path */}
        <path className="cyber-light-strip" d="M24 47 C 34 52, 66 52, 76 47" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" fill="none" strokeDasharray="4 2" />
        {/* Modern Amber Light Strip Circuit Line Path */}
        <path className="cyber-light-strip" d="M26 65 C 34 70, 66 70, 74 65" stroke="#fbbf24" strokeWidth="2.5" strokeLinecap="round" fill="none" strokeDasharray="4 2" />

        {/* Cyber Stinger Tip Polygon Path */}
        <path d="M45 88 L50 98 L55 88 Z" fill="#18181b" stroke="#10b981" strokeWidth="1.5" />

        {/* Dark Metallic Visor Face Screen Container Rectangle */}
        <rect x="28" y="32" width="44" height="24" rx="12" fill="#18181b" stroke="#10b981" strokeWidth="2" />

        {/* Expressive Glowing Emerald LED Visor Eyes Group */}
        <g className="cyber-bee-eye">
          {/* Left Eye Glowing Emerald Circle Base */}
          <circle cx="39" cy="44" r="5" fill="#10b981" />
          {/* Left Eye White Catchlight Reflection Spot */}
          <circle cx="41" cy="42" r="2" fill="#ffffff" />

          {/* Right Eye Glowing Emerald Circle Base */}
          <circle cx="61" cy="44" r="5" fill="#10b981" />
          {/* Right Eye White Catchlight Reflection Spot */}
          <circle cx="63" cy="42" r="2" fill="#ffffff" />
        </g>

        {/* Rosy Pink Blush LED Left Cheek Ellipse */}
        <ellipse cx="32" cy="49" rx="3" ry="2" fill="#f43f5e" opacity="0.8" />
        {/* Rosy Pink Blush LED Right Cheek Ellipse */}
        <ellipse cx="68" cy="49" rx="3" ry="2" fill="#f43f5e" opacity="0.8" />

        {/* Cute Curved LED Smile Curve Path */}
        <path d="M45 49 Q 50 54, 55 49" stroke="#34d399" strokeWidth="2" strokeLinecap="round" fill="none" />

        {/* Glossy Head Specular Highlight Reflection Ellipse */}
        <ellipse cx="42" cy="28" rx="15" ry="6" fill="#ffffff" opacity="0.5" transform="rotate(-15 42 28)" />
      </g>

      {/* SVG Gradient definitions for reusable colors and aura effects */}
      <defs>
        {/* Radial Gradient definition for floating aura ring under bee body */}
        <radialGradient id="honeyAura" cx="50%" cy="50%" r="50%">
          {/* Center bright amber color stop */}
          <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.8" />
          {/* Mid transition emerald color stop */}
          <stop offset="60%" stopColor="#10b981" stopOpacity="0.4" />
          {/* Edge transparent color stop */}
          <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
        </radialGradient>

        {/* Linear Gradient definition for Cyber Bee main body color */}
        <linearGradient id="cyberBeeBody" x1="0%" y1="0%" x2="100%" y2="100%">
          {/* Top bright yellow gradient stop */}
          <stop offset="0%" stopColor="#fef08a" />
          {/* Upper amber gradient stop */}
          <stop offset="35%" stopColor="#fbbf24" />
          {/* Mid orange gradient stop */}
          <stop offset="70%" stopColor="#f59e0b" />
          {/* Base dark orange gradient stop */}
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>

        {/* Linear Gradient definition for semi-transparent glass wings */}
        <linearGradient id="glassWing" x1="0%" y1="0%" x2="100%" y2="100%">
          {/* Wing top specular white stop */}
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
          {/* Wing mid warm tint stop */}
          <stop offset="50%" stopColor="#fef08a" stopOpacity="0.75" />
          {/* Wing edge soft pink iridescent stop */}
          <stop offset="100%" stopColor="#fbcfe8" stopOpacity="0.65" />
        </linearGradient>
      </defs>
    </svg>
  );
}

// Utility function to trigger Web Audio API synthesized chime sound when bot replies
function playBotChimeSound() {
  // Prevent execution during server-side rendering (SSR) environments
  if (typeof window === "undefined") return;
  try {
    // Obtain cross-browser Web Audio API AudioContext constructor
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    // Guard clause if Web Audio API is unsupported in browser
    if (!AudioContext) return;
    // Instantiate new Web Audio context instance
    const ctx = new AudioContext();
    // Create sine wave oscillator for tone generation
    const osc = ctx.createOscillator();
    // Create gain node for volume envelope control
    const gain = ctx.createGain();

    // Set oscillator waveform type to pure sine wave
    osc.type = "sine";
    // Capture current audio context timestamp
    const now = ctx.currentTime;
    // Set initial pitch to note E5 (659.25 Hz)
    osc.frequency.setValueAtTime(659.25, now);
    // Step pitch up to note A5 (880 Hz) at 80 milliseconds for cheerful chime
    osc.frequency.setValueAtTime(880, now + 0.08);

    // Set initial volume level to non-clipping 8%
    gain.gain.setValueAtTime(0.08, now);
    // Smoothly decay volume to near silence over 300 milliseconds
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

    // Route oscillator signal through gain volume controller
    osc.connect(gain);
    // Route gain output directly to audio hardware output (speakers)
    gain.connect(ctx.destination);
    // Start audio frequency playback immediately
    osc.start(now);
    // Stop oscillator playback after 300 milliseconds
    osc.stop(now + 0.3);
  } catch (err) {
    // Silently ignore audio playback errors if autoplay is blocked by browser policy
  }
}

// Main exported interactive Lumo Assistant Chatbot React component
export function LumoAssistantChatbot({ context }: { context?: ChildChatContext }) {
  // State hook to track whether chatbot modal dialog is open or minimized
  const [isOpen, setIsOpen] = useState(false);
  // State hook to store user text currently typed into the input field
  const [inputQuery, setInputQuery] = useState("");
  // State hook to track whether AI model request is pending (shows typing indicator)
  const [isTyping, setIsTyping] = useState(false);

  // Compute dynamic personalized welcome greeting based on provided child context
  const welcomeText = context?.nextGame
    // Welcome message customized with recommended game & child name if available
    ? `Bzzzz-beep! 👋 Hi${context.childName ? ` ${context.childName}` : ""}! I'm Lumo 🐝✨ Your next game is "${context.nextGame.name}" (Level ${context.nextGame.level})! Ask me anything about your games or progress!`
    // Default welcome greeting for general platform support
    : "Bzzzz-beep! 👋 Hi there! I'm Lumo Buddy AI 🐝✨ Welcome to Lumo Buddy! Ask me any question about screening surveys, games, child profiles, or progress reports!";

  // State hook storing full conversation history array initialized with welcome message
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      // Unique welcome message identifier
      id: "welcome",
      // Set sender role to bot
      sender: "bot",
      // Assign welcome text string
      text: welcomeText,
      // Format initial timestamp string using local time
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);

  // DOM Reference hook for scrollable chat messages container element
  const chatContainerRef = useRef<HTMLDivElement>(null);
  // DOM Reference hook for chat query text input element
  const inputRef = useRef<HTMLInputElement>(null);
  // DOM Reference hook for full viewport boundary container for draggable button
  const dragConstraintsRef = useRef<HTMLDivElement>(null);

  // Effect hook to disable body scrolling when chatbot modal opens on mobile screens
  useEffect(() => {
    // Detect mobile viewport width threshold (under 640px)
    const isMobile = window.innerWidth < 640;
    // Lock body document scroll if open on mobile devices
    if (isOpen && isMobile) {
      document.body.style.overflow = "hidden";
    } else {
      // Restore normal body document scroll behavior
      document.body.style.overflow = "";
    }
    // Cleanup effect hook resetting body overflow style on unmount
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Helper function to scroll chat container to latest message bottom
  const scrollChatToBottom = () => {
    // Ensure chat container element exists before attempting scroll
    if (chatContainerRef.current) {
      // Execute smooth animated scroll to max scroll height
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  // Effect hook triggering auto-scroll whenever messages, typing state, or visibility changes
  useEffect(() => {
    // Only scroll to bottom if chat modal is currently visible
    if (isOpen) {
      scrollChatToBottom();
    }
  }, [messages, isTyping, isOpen]);

  // Async function handling message submission to backend AI API
  const handleSendMessage = async (textToSend?: string) => {
    // Extract input message string or fallback to current state query
    const text = textToSend || inputQuery;
    // Guard clause: abort if input text is empty or AI response is already pending
    if (!text.trim() || isTyping) return;

    // Construct structured ChatMessage object for user query
    const userMsg: ChatMessage = {
      // Generate timestamp-based unique ID string
      id: Date.now().toString(),
      // Set sender discriminator to user
      sender: "user",
      // Assign sanitized input text
      text: text,
      // Format current time timestamp string
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    // Append user message object to messages state array
    setMessages((prev) => [...prev, userMsg]);
    // Reset query text input state if user manually sent message
    if (!textToSend) setInputQuery("");
    // Enable typing state to show animated loading indicator
    setIsTyping(true);

    try {
      // Format previous conversation history for Gemini AI endpoint API structure
      const history = messages.map((m) => ({
        // Map sender role to expected API format ("user" or "model")
        role: m.sender === "user" ? "user" : "model",
        // Extract message text content
        text: m.text,
      }));

      // Make async HTTP POST request to API route endpoint
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // Pass JSON body containing user query, conversation history, and child context
        body: JSON.stringify({ prompt: text, history, context }),
      });

      // Parse JSON response data from API server
      const data = await res.json();
      // Extract AI reply string or fallback to default assistant response
      const reply = data?.reply || "I'm Lumo, your friendly Lumo Buddy AI Assistant! How can I help you and your child today?";

      // Construct structured ChatMessage object for bot response
      const botMsg: ChatMessage = {
        // Generate unique timestamp ID for bot response
        id: (Date.now() + 1).toString(),
        // Set sender discriminator to bot
        sender: "bot",
        // Assign AI generated text reply
        text: reply,
        // Format timestamp string
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      // Append bot response object to messages state array
      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      // Fallback bot response object rendered when API fetch fails or hits network error
      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: "bot",
        text: "I'm Lumo, your friendly Lumo Buddy AI Assistant! Ask me anything about our parent screening survey, child games, unlock levels, or progress reports!",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      // Append error fallback message to chat history
      setMessages((prev) => [...prev, botMsg]);
    } finally {
      // Disable typing loading state regardless of request success/failure
      setIsTyping(false);
      // Play cheerful Web Audio chime sound when AI response finishes
      playBotChimeSound();
    }
  };

  // Helper handler function to reset chat conversation history back to initial state
  const handleResetChat = () => {
    // Re-initialize messages state array with fresh welcome prompt
    setMessages([
      {
        // Generate new unique key for reset welcome message
        id: "welcome-" + Date.now(),
        // Set sender role to bot
        sender: "bot",
        // Standard reset welcome greeting text
        text: "Bzzzz-beep! 👋 Hi there! I'm Lumo AI 🐝✨ Ask me any question about screening surveys, games, child profiles, or progress reports!",
        // Format current timestamp string
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      },
    ]);
  };

  // Render chatbot component JSX elements
  return (
    <>
      {/* Inject dynamic CSS style tag containing keyframes for shimmering light beam sweeper */}
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

      {/* Viewport Bounds Container for Draggable Lumo AI Floating Widget */}
      <div ref={dragConstraintsRef} className="fixed inset-0 pointer-events-none z-[60] overflow-hidden">
        {/* Framer Motion physics container enabling free dragging across screen viewport */}
        <motion.div
          drag
          dragConstraints={dragConstraintsRef}
          dragElastic={0.08}
          dragMomentum={false}
          whileDrag={{ scale: 1.08 }}
          className="pointer-events-auto absolute bottom-[5.5rem] sm:bottom-6 right-3 sm:right-6 touch-none select-none"
        >
          {/* Interactive Floating Button to Open/Close Chatbot Dialog */}
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.94 }}
            onClick={() => setIsOpen(!isOpen)}
            className="relative overflow-hidden flex items-center gap-2.5 px-4 py-3 sm:px-6 sm:py-4 rounded-full bg-gradient-to-r from-amber-400 via-amber-500 to-emerald-600 text-slate-950 font-black text-xs sm:text-base uppercase tracking-wider shadow-2xl shadow-amber-500/45 border-2 border-white/90 cursor-grab active:cursor-grabbing"
          >
            {/* Visual Drag Handle Grip Dots Symbol */}
            <span className="text-slate-950/70 font-extrabold text-sm sm:text-base leading-none select-none tracking-tighter" title="Drag Lumo AI anywhere on screen">
              ⋮⋮
            </span>

            {/* Glowing Light Beam Sweeper animation element overlay */}
            <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/50 to-transparent pointer-events-none animate-light-strip" />

            {/* Cyber-Bee Icon Component inside button */}
            <NextLevelCyberBee className="w-8 h-8 sm:w-10 sm:h-10 filter drop-shadow-md shrink-0" />
            {/* Toggle label text displaying "Close" or "Ask Lumo AI" */}
            <span className="drop-shadow-sm text-slate-950 font-black relative z-10">{isOpen ? "Close" : "Ask Lumo AI"}</span>
            {/* Online status indicator dot container */}
            <span className="relative flex h-3 w-3 z-10 shrink-0">
              {/* Pulsing outer glow ring animation */}
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-80"></span>
              {/* Solid inner emerald green active status dot */}
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-400"></span>
            </span>
          </motion.button>
        </motion.div>
      </div>

      {/* Chatbot Modal Popup Dialog with Framer Motion AnimatePresence */}
      <AnimatePresence>
        {/* Render modal container only when isOpen state is true */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.88, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.88, y: 30 }}
            transition={{ type: "spring", stiffness: 320, damping: 26 }}
            className="fixed inset-0 sm:inset-auto sm:bottom-20 sm:right-6 sm:w-[480px] sm:h-[620px] sm:max-h-[calc(100vh-100px)] w-full h-full sm:rounded-[2.5rem] bg-white/98 backdrop-blur-3xl border-0 sm:border-4 sm:border-amber-300/90 rounded-none shadow-none sm:shadow-[0_25px_60px_rgba(245,158,11,0.35)] z-[60] flex flex-col overflow-hidden"
          >
            {/* Chatbot Dialog Header Bar */}
            <div className="relative p-4 px-5 sm:px-6 bg-gradient-to-r from-amber-400 via-emerald-500 to-fuchsia-600 text-white flex items-center justify-between safe-area-top">
              {/* Header Title and Mascot Branding Group */}
              <div className="flex items-center gap-3.5">
                {/* Mascot Icon Container Box */}
                <div className="w-12 h-12 rounded-2xl bg-white/25 backdrop-blur-md border border-white/40 flex items-center justify-center shadow-sm p-0.5">
                  {/* Next-Level Cyber Bee SVG Logo */}
                  <NextLevelCyberBee className="w-10 h-10" />
                </div>
                {/* Assistant Name and Online Status Subtitle */}
                <div>
                  {/* Main Assistant Title Heading */}
                  <h3 className="font-black text-lg sm:text-xl uppercase tracking-wider text-white drop-shadow-sm">Lumo Buddy AI</h3>
                  {/* Status Indicator Subtitle */}
                  <p className="text-xs sm:text-sm text-amber-100 font-extrabold flex items-center gap-1.5">
                    {/* Animated Sparkles Icon */}
                    <Sparkles size={14} className="text-amber-300 animate-pulse" /> Online & Ready
                  </p>
                </div>
              </div>

              {/* Header Action Control Buttons Group */}
              <div className="flex items-center gap-2">
                {/* Reset Conversation History Button */}
                <button
                  onClick={handleResetChat}
                  title="Restart Chat"
                  className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors text-white active:scale-90"
                >
                  {/* Rotate Reset Icon */}
                  <RotateCcw size={18} />
                </button>
                {/* Close Chat Dialog Modal Button */}
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors text-white active:scale-90"
                >
                  {/* Close Cross Icon */}
                  <X size={22} />
                </button>
              </div>
            </div>

            {/* Glowing Electric Light Strip Divider Bar below Header */}
            <div className="h-1.5 w-full bg-gradient-to-r from-amber-300 via-emerald-400 to-fuchsia-400 animate-pulse shadow-md shadow-amber-400/50 shrink-0" />

            {/* Chat Messages Body Scrollable Container */}
            <div
              ref={chatContainerRef}
              className="flex-1 p-4 sm:p-5 overflow-y-auto space-y-5 bg-gradient-to-b from-amber-50/30 via-slate-50 to-emerald-50/40 overscroll-contain"
            >
              {/* Map over conversation history array to render message bubbles */}
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-3 ${msg.sender === "user" ? "flex-row-reverse" : "flex-row"}`}
                >
                  {/* Avatar Icon Container Circle */}
                  <div
                    className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-black shadow-xs ${msg.sender === "user"
                      ? "bg-gradient-to-r from-fuchsia-600 to-pink-600 text-white"
                      : "bg-gradient-to-r from-amber-400 to-emerald-500 text-slate-900 p-0.5"
                      }`}
                  >
                    {/* Display User Icon for user messages, or Cyber-Bee for bot messages */}
                    {msg.sender === "user" ? <User size={18} /> : <NextLevelCyberBee className="w-8 h-8" />}
                  </div>

                  {/* Message Bubble Content Box */}
                  <div
                    className={`max-w-[85%] p-4 sm:p-5 rounded-2xl shadow-xs whitespace-pre-wrap ${msg.sender === "user"
                      ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-tr-none"
                      : "bg-white text-slate-900 border border-amber-200/90 rounded-tl-none"
                      }`}
                  >
                    {/* Message Body Text Paragraph */}
                    <p className="text-base sm:text-lg font-bold leading-relaxed">{msg.text}</p>
                    {/* Timestamp Display Span */}
                    <span
                      className={`block text-xs sm:text-sm mt-2 font-extrabold ${msg.sender === "user" ? "text-emerald-200 text-right" : "text-amber-800/85 text-left"
                        }`}
                    >
                      {msg.timestamp}
                    </span>
                  </div>
                </div>
              ))}

              {/* Animated Chatbot Typing Indicator rendered while waiting for AI response */}
              {isTyping && (
                <div className="flex gap-3 items-center">
                  {/* Animated Cyber-Bee Avatar Icon for typing state */}
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-r from-amber-400 to-emerald-500 text-slate-900 p-0.5 flex items-center justify-center">
                    <NextLevelCyberBee className="w-8 h-8 animate-pulse" />
                  </div>
                  {/* Typing Indicator Box with bouncing dots */}
                  <div className="bg-white p-4 rounded-2xl border border-amber-200/80 rounded-tl-none flex items-center gap-2 shadow-2xs">
                    {/* Thinking status text */}
                    <span className="text-sm sm:text-base font-black text-amber-600 mr-1">LUMO BUDDY is thinking...</span>
                    {/* First bouncing dot */}
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce" style={{ animationDelay: '0ms' }} />
                    {/* Second bouncing dot */}
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce" style={{ animationDelay: '150ms' }} />
                    {/* Third bouncing dot */}
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}
            </div>

            {/* Quick Suggestion Chips horizontally scrollable bar */}
            <div className="p-3 sm:p-4 bg-white border-t border-slate-100 flex gap-2 overflow-x-auto select-none shrink-0 touch-pan-x" style={{ WebkitOverflowScrolling: "touch" }}>
              {/* Context-aware suggestion chip for next recommended game */}
              {context?.nextGame && (
                <button
                  onClick={() => handleSendMessage("What should I play next?")}
                  disabled={isTyping}
                  className="px-3.5 py-2.5 rounded-full bg-fuchsia-50 hover:bg-fuchsia-100 text-fuchsia-900 text-xs sm:text-sm font-black whitespace-nowrap border border-fuchsia-200 flex items-center gap-2 transition-colors disabled:opacity-50 min-h-[40px]"
                >
                  🌟 <span className="text-xs sm:text-sm font-black">What should I play next?</span>
                </button>
              )}
              {/* Context-aware suggestion chip for child progress report */}
              {context?.childName && (
                <button
                  onClick={() => handleSendMessage(`How many games has ${context.childName} completed?`)}
                  disabled={isTyping}
                  className="px-3.5 py-2.5 rounded-full bg-emerald-50 hover:bg-emerald-100 text-emerald-900 text-xs sm:text-sm font-black whitespace-nowrap border border-emerald-200 flex items-center gap-2 transition-colors disabled:opacity-50 min-h-[40px]"
                >
                  📊 <span className="text-xs sm:text-sm font-black">Show my progress</span>
                </button>
              )}
              {/* Map over base suggestions array to render standard quick-reply chips */}
              {BASE_SUGGESTIONS.map((sugg, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(sugg)}
                  disabled={isTyping}
                  className="px-3.5 py-2.5 rounded-full bg-amber-50 hover:bg-amber-100 active:bg-amber-200 text-amber-950 text-xs sm:text-sm font-black whitespace-nowrap border border-amber-200 flex items-center gap-2 transition-colors disabled:opacity-50 min-h-[40px]"
                >
                  {/* Help Question Mark Icon */}
                  <HelpCircle size={14} className="text-amber-600 shrink-0" />
                  {/* Suggestion text string */}
                  <span className="text-xs sm:text-sm font-black">{sugg}</span>
                </button>
              ))}
            </div>

            {/* Bottom Message Input Controls Container */}
            <div className="p-3.5 pb-[max(1rem,env(safe-area-inset-bottom))] bg-white border-t border-slate-100 flex items-center gap-2.5 shrink-0">
              {/* Text Input field for user query typing */}
              <input
                ref={inputRef}
                type="text"
                value={inputQuery}
                onChange={(e) => setInputQuery(e.target.value)}
                onKeyDown={(e) => {
                  // Trigger send handler when Enter key is pressed
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
                placeholder={isTyping ? "Lumo is thinking..." : "Ask me anything..."}
                disabled={isTyping}
                className="flex-1 px-5 py-4 rounded-full bg-slate-100 border border-slate-200 text-base sm:text-lg font-bold text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-200 transition-colors disabled:opacity-60"
                enterKeyHint="send"
                autoComplete="off"
              />
              {/* Submit / Send Message Button */}
              <button
                onClick={() => handleSendMessage()}
                disabled={isTyping || !inputQuery.trim()}
                className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-gradient-to-r from-amber-400 via-emerald-500 to-fuchsia-600 text-white flex items-center justify-center shadow-md hover:scale-105 active:scale-95 transition-all font-black disabled:opacity-40 min-w-[50px] min-h-[50px]"
              >
                {/* Paper Airplane Send Icon */}
                <Send size={22} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
