"use client";

import { motion } from "framer-motion";

export function SurveyBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none">
      <style dangerouslySetInnerHTML={{
        __html: `
        /* ===== CALM BUBBLE RISE ===== */
        @keyframes survey-bubble-rise {
          0% { transform: translateY(100vh) scale(0.7) rotate(0deg); opacity: 0; }
          20% { opacity: 0.4; transform: translateY(80vh) scale(1) rotate(45deg); }
          50% { opacity: 0.6; transform: translateY(45vh) scale(1.15) translateX(25px) rotate(90deg); }
          80% { opacity: 0.3; transform: translateY(15vh) scale(0.9) translateX(-20px) rotate(135deg); }
          100% { transform: translateY(-10vh) scale(0.6) rotate(180deg); opacity: 0; }
        }

        /* ===== SOFT HALO PULSE ===== */
        @keyframes survey-halo-pulse {
          0%, 100% { transform: scale(1) rotate(0deg); opacity: 0.25; }
          50% { transform: scale(1.35) rotate(180deg); opacity: 0.5; }
        }

        /* ===== FLOATING SOFT PARTICLES ===== */
        @keyframes survey-particle-drift {
          0%, 100% { transform: translateY(0) translateX(0) scale(1); opacity: 0.35; }
          33% { transform: translateY(-30px) translateX(20px) scale(1.2); opacity: 0.7; }
          66% { transform: translateY(20px) translateX(-25px) scale(0.9); opacity: 0.45; }
        }

        /* ===== GLASS REFLECTION SHIMMER ===== */
        @keyframes survey-shimmer {
          0% { transform: translateX(-100%) translateY(-100%) rotate(45deg); opacity: 0; }
          50% { opacity: 0.15; }
          100% { transform: translateX(200%) translateY(200%) rotate(45deg); opacity: 0; }
        }
      `}} />

      {/* ===== 1. NEXT LEVEL FLOATING GLASS BUBBLES ===== */}
      {[
        { left: '6%', size: 44, delay: 0, duration: 20 },
        { left: '18%', size: 28, delay: 3, duration: 16 },
        { left: '32%', size: 56, delay: 7, duration: 24 },
        { left: '50%', size: 36, delay: 1, duration: 18 },
        { left: '68%', size: 48, delay: 9, duration: 22 },
        { left: '84%', size: 32, delay: 5, duration: 17 },
        { left: '14%', size: 38, delay: 11, duration: 21 },
        { left: '60%', size: 42, delay: 13, duration: 23 },
        { left: '92%', size: 26, delay: 15, duration: 15 },
      ].map((b, i) => (
        <div
          key={`survey-bubble-${i}`}
          className="absolute rounded-full"
          style={{
            left: b.left,
            bottom: '-10%',
            width: b.size,
            height: b.size,
            background: `radial-gradient(circle at 30% 30%, rgba(255,255,255,0.95), rgba(236, 72, 153, 0.15) 50%, rgba(168, 85, 247, 0.25))`,
            border: '1.5px solid rgba(236, 72, 153, 0.3)',
            boxShadow: 'inset 0 0 14px rgba(255,255,255,0.8), 0 8px 25px rgba(217,70,239,0.12)',
            animation: `survey-bubble-rise ${b.duration}s ease-in-out infinite`,
            animationDelay: `${b.delay}s`,
          }}
        />
      ))}

      {/* ===== 2. HALO AURA RINGS ===== */}
      {[
        { top: '10%', left: '8%', size: 160, color: 'rgba(236, 72, 153, 0.25)', duration: 16, delay: 0 },
        { top: '40%', right: '8%', size: 200, color: 'rgba(168, 85, 247, 0.2)', duration: 20, delay: 2 },
        { bottom: '15%', left: '15%', size: 180, color: 'rgba(244, 114, 182, 0.2)', duration: 18, delay: 4 },
      ].map((h, i) => (
        <div
          key={`survey-halo-${i}`}
          className="absolute rounded-full border-2 border-dashed pointer-events-none"
          style={{
            top: h.top,
            left: h.left,
            right: h.right,
            bottom: h.bottom,
            width: h.size,
            height: h.size,
            borderColor: h.color,
            animation: `survey-halo-pulse ${h.duration}s ease-in-out infinite`,
            animationDelay: `${h.delay}s`,
          }}
        />
      ))}

      {/* ===== 3. GLOWING PARTICLES ===== */}
      {[
        { top: '10%', left: '20%', size: 9, color: '#f472b6', delay: 0, duration: 6 },
        { top: '22%', left: '82%', size: 12, color: '#c084fc', delay: 1, duration: 8 },
        { top: '45%', left: '12%', size: 8, color: '#e879f9', delay: 2.5, duration: 7 },
        { top: '62%', left: '88%', size: 10, color: '#f472b6', delay: 1.8, duration: 9 },
        { top: '80%', left: '30%', size: 9, color: '#a78bfa', delay: 3.2, duration: 6.5 },
        { top: '32%', left: '65%', size: 7, color: '#fb7185', delay: 0.5, duration: 7.5 },
        { top: '72%', left: '75%', size: 12, color: '#e879f9', delay: 2, duration: 8.5 },
      ].map((p, i) => (
        <div
          key={`survey-particle-${i}`}
          className="absolute rounded-full"
          style={{
            top: p.top,
            left: p.left,
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            boxShadow: `0 0 16px ${p.color}, 0 0 6px ${p.color}`,
            animation: `survey-particle-drift ${p.duration}s ease-in-out infinite`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}

      {/* ===== 4. AMBIENT SHIMMER LAYER ===== */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.4) 0%, transparent 50%, rgba(236,72,153,0.1) 100%)',
        }}
      />
    </div>
  );
}
