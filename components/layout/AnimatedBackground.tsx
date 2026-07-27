"use client";

export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      <style dangerouslySetInnerHTML={{
        __html: `
        /* ===== TWINKLING STAR FIELD ===== */
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1.2); }
        }
        @keyframes twinkle-bright {
          0%, 100% { opacity: 0.3; transform: scale(1) rotate(0deg); }
          25% { opacity: 1; transform: scale(1.4) rotate(90deg); }
          50% { opacity: 0.5; transform: scale(0.9) rotate(180deg); }
          75% { opacity: 0.9; transform: scale(1.3) rotate(270deg); }
        }
        .star {
          position: absolute;
          border-radius: 50%;
          background: white;
          box-shadow: 0 0 6px 2px rgba(255, 255, 255, 0.3);
        }
        .star-colored {
          position: absolute;
          border-radius: 50%;
        }
        
        /* ===== SHOOTING STARS ===== */
        @keyframes shoot {
          0% { transform: translateX(0) translateY(0) rotate(-45deg); opacity: 1; width: 0; }
          30% { opacity: 1; width: 80px; }
          100% { transform: translateX(400px) translateY(400px) rotate(-45deg); opacity: 0; width: 0; }
        }
        .shooting-star {
          position: absolute;
          height: 2px;
          background: linear-gradient(90deg, rgba(255,255,255,0), rgba(255, 200, 255, 0.8), rgba(168, 85, 247, 0.6));
          border-radius: 50px;
          filter: drop-shadow(0 0 6px rgba(168, 85, 247, 0.4));
        }
        .shooting-star::after {
          content: '';
          position: absolute;
          right: 0;
          top: -1px;
          width: 4px;
          height: 4px;
          background: white;
          border-radius: 50%;
          box-shadow: 0 0 10px 2px rgba(255, 255, 255, 0.6);
        }
        
        /* ===== FLOATING HEARTS ===== */
        @keyframes float-heart {
          0% { transform: translateY(100vh) translateX(0) rotate(0deg) scale(0); opacity: 0; }
          10% { opacity: 0.6; transform: translateY(80vh) translateX(-10px) rotate(15deg) scale(1); }
          50% { transform: translateY(40vh) translateX(20px) rotate(-10deg) scale(1.1); opacity: 0.4; }
          90% { opacity: 0.2; }
          100% { transform: translateY(-10vh) translateX(-15px) rotate(20deg) scale(0.8); opacity: 0; }
        }
        
        /* ===== BOUNCING SHAPES ===== */
        @keyframes bounce-float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          25% { transform: translateY(-30px) rotate(10deg); }
          50% { transform: translateY(-10px) rotate(-5deg); }
          75% { transform: translateY(-25px) rotate(5deg); }
        }
        
        /* ===== RAINBOW WAVE ===== */
        @keyframes rainbow-wave {
          0% { transform: translateX(-100%) scaleY(1); }
          50% { transform: translateX(0%) scaleY(1.5); }
          100% { transform: translateX(100%) scaleY(1); }
        }
        
        /* ===== PULSE RINGS ===== */
        @keyframes pulse-ring {
          0% { transform: scale(0.5); opacity: 0.8; }
          100% { transform: scale(2.5); opacity: 0; }
        }
        
        /* ===== CONFETTI ===== */
        @keyframes confetti-fall {
          0% { transform: translateY(-10vh) rotate(0deg); opacity: 0; }
          10% { opacity: 0.8; }
          100% { transform: translateY(110vh) rotate(720deg); opacity: 0; }
        }
        
        /* ===== FLOATING BUBBLES ===== */
        @keyframes bubble-rise {
          0% { transform: translateY(0) scale(1); opacity: 0.4; }
          50% { transform: translateY(-40vh) scale(1.2); opacity: 0.6; }
          100% { transform: translateY(-80vh) scale(0.8); opacity: 0; }
        }

        /* ===== COMET TRAIL ===== */
        @keyframes comet {
          0% { transform: translateX(-100px) translateY(-100px) rotate(-45deg); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateX(calc(100vw + 100px)) translateY(calc(50vh + 100px)) rotate(-45deg); opacity: 0; }
        }
      `}} />

      {/* ===== TWINKLING STAR FIELD (30 stars) ===== */}
      {[
        { top: '5%', left: '10%', size: 3, delay: 0, duration: 3 },
        { top: '8%', left: '25%', size: 2, delay: 0.5, duration: 4 },
        { top: '3%', left: '45%', size: 4, delay: 1, duration: 2.5 },
        { top: '12%', left: '65%', size: 2, delay: 1.5, duration: 3.5 },
        { top: '6%', left: '80%', size: 3, delay: 0.3, duration: 4.5 },
        { top: '15%', left: '5%', size: 2, delay: 2, duration: 3 },
        { top: '20%', left: '35%', size: 3, delay: 0.8, duration: 5 },
        { top: '18%', left: '55%', size: 2, delay: 1.2, duration: 3 },
        { top: '22%', left: '90%', size: 4, delay: 0.6, duration: 2 },
        { top: '28%', left: '15%', size: 2, delay: 1.8, duration: 4 },
        { top: '35%', left: '72%', size: 3, delay: 0.4, duration: 3.5 },
        { top: '40%', left: '40%', size: 2, delay: 2.2, duration: 4.5 },
        { top: '45%', left: '8%', size: 3, delay: 1.1, duration: 3 },
        { top: '50%', left: '88%', size: 2, delay: 0.9, duration: 5 },
        { top: '55%', left: '50%', size: 4, delay: 1.6, duration: 2.5 },
        { top: '60%', left: '20%', size: 2, delay: 0.2, duration: 4 },
        { top: '65%', left: '75%', size: 3, delay: 2.5, duration: 3 },
        { top: '70%', left: '30%', size: 2, delay: 1.3, duration: 3.5 },
        { top: '75%', left: '60%', size: 3, delay: 0.7, duration: 4 },
        { top: '80%', left: '12%', size: 2, delay: 1.9, duration: 5 },
        { top: '82%', left: '85%', size: 4, delay: 0.1, duration: 2 },
        { top: '88%', left: '42%', size: 2, delay: 2.3, duration: 3.5 },
        { top: '90%', left: '68%', size: 3, delay: 1.4, duration: 4 },
        { top: '92%', left: '22%', size: 2, delay: 0.5, duration: 3 },
        { top: '95%', left: '92%', size: 3, delay: 1.7, duration: 5 },
      ].map((star, i) => (
        <div
          key={`star-${i}`}
          className="star"
          style={{
            top: star.top,
            left: star.left,
            width: star.size,
            height: star.size,
            animation: `twinkle ${star.duration}s ease-in-out infinite`,
            animationDelay: `${star.delay}s`,
          }}
        />
      ))}

      {/* ===== COLORED SPARKLE STARS (SVG) ===== */}
      {[
        { top: '7%', left: '18%', size: 16, color: '#e879f9', delay: 0, duration: 4 },
        { top: '14%', left: '70%', size: 12, color: '#fbbf24', delay: 1, duration: 3 },
        { top: '30%', left: '3%', size: 14, color: '#fb7185', delay: 2, duration: 5 },
        { top: '42%', left: '92%', size: 10, color: '#a78bfa', delay: 0.5, duration: 3.5 },
        { top: '58%', left: '48%', size: 18, color: '#34d399', delay: 1.5, duration: 4 },
        { top: '72%', left: '82%', size: 12, color: '#f472b6', delay: 2.5, duration: 3 },
        { top: '85%', left: '28%', size: 14, color: '#60a5fa', delay: 0.8, duration: 4.5 },
        { top: '25%', left: '52%', size: 10, color: '#fcd34d', delay: 1.8, duration: 3 },
        { top: '48%', left: '15%', size: 16, color: '#c084fc', delay: 3, duration: 5 },
        { top: '67%', left: '58%', size: 11, color: '#fb923c', delay: 0.3, duration: 4 },
      ].map((star, i) => (
        <svg
          key={`sparkle-${i}`}
          className="absolute"
          style={{
            top: star.top,
            left: star.left,
            width: star.size,
            height: star.size,
            color: star.color,
            animation: `twinkle-bright ${star.duration}s ease-in-out infinite`,
            animationDelay: `${star.delay}s`,
            filter: `drop-shadow(0 0 4px ${star.color})`,
          }}
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M12 0l3 9h9l-7 5 3 9-8-6-8 6 3-9-7-5h9z" />
        </svg>
      ))}

      {/* ===== 4-POINT SPARKLE STARS ===== */}
      {[
        { top: '10%', left: '38%', size: 20, color: '#e879f9', delay: 0.5, duration: 3 },
        { top: '35%', left: '85%', size: 16, color: '#fbbf24', delay: 1.2, duration: 4 },
        { top: '55%', left: '5%', size: 22, color: '#f9a8d4', delay: 2, duration: 3.5 },
        { top: '78%', left: '45%', size: 14, color: '#93c5fd', delay: 0.8, duration: 5 },
        { top: '88%', left: '70%', size: 18, color: '#86efac', delay: 1.6, duration: 4 },
      ].map((star, i) => (
        <svg
          key={`cross-star-${i}`}
          className="absolute"
          style={{
            top: star.top,
            left: star.left,
            width: star.size,
            height: star.size,
            color: star.color,
            animation: `twinkle-bright ${star.duration}s ease-in-out infinite`,
            animationDelay: `${star.delay}s`,
            filter: `drop-shadow(0 0 6px ${star.color})`,
          }}
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M12 0l2.5 8.5L23 11l-8.5 2.5L12 22l-2.5-8.5L1 11l8.5-2.5z" />
        </svg>
      ))}

      {/* ===== SHOOTING STARS ===== */}
      {[
        { top: '8%', left: '15%', delay: 0, duration: 4 },
        { top: '20%', left: '60%', delay: 6, duration: 3 },
        { top: '45%', left: '30%', delay: 12, duration: 5 },
        { top: '15%', left: '80%', delay: 9, duration: 3.5 },
        { top: '65%', left: '50%', delay: 15, duration: 4 },
      ].map((s, i) => (
        <div
          key={`shoot-${i}`}
          className="shooting-star"
          style={{
            top: s.top,
            left: s.left,
            animation: `shoot ${s.duration}s ease-in infinite`,
            animationDelay: `${s.delay}s`,
          }}
        />
      ))}

      {/* ===== FLOATING HEARTS ===== */}
      {[
        { left: '10%', delay: 0, duration: 12, size: 16, color: '#f472b6' },
        { left: '30%', delay: 4, duration: 15, size: 12, color: '#e879f9' },
        { left: '55%', delay: 8, duration: 13, size: 18, color: '#fb7185' },
        { left: '75%', delay: 2, duration: 16, size: 14, color: '#f9a8d4' },
        { left: '90%', delay: 6, duration: 14, size: 10, color: '#c084fc' },
        { left: '42%', delay: 10, duration: 11, size: 15, color: '#fda4af' },
      ].map((h, i) => (
        <svg
          key={`heart-${i}`}
          className="absolute"
          style={{
            left: h.left,
            bottom: '-5%',
            width: h.size,
            height: h.size,
            color: h.color,
            animation: `float-heart ${h.duration}s ease-in-out infinite`,
            animationDelay: `${h.delay}s`,
            filter: `drop-shadow(0 0 4px ${h.color})`,
          }}
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      ))}

      {/* ===== PULSE RINGS ===== */}
      {[
        { top: '20%', left: '20%', color: 'rgba(232, 121, 249, 0.3)', delay: 0, duration: 4 },
        { top: '50%', left: '70%', color: 'rgba(251, 191, 36, 0.25)', delay: 2, duration: 5 },
        { top: '75%', left: '35%', color: 'rgba(96, 165, 250, 0.25)', delay: 4, duration: 6 },
      ].map((r, i) => (
        <div
          key={`ring-${i}`}
          className="absolute rounded-full"
          style={{
            top: r.top,
            left: r.left,
            width: 40,
            height: 40,
            border: `2px solid ${r.color}`,
            animation: `pulse-ring ${r.duration}s ease-out infinite`,
            animationDelay: `${r.delay}s`,
          }}
        />
      ))}

      {/* ===== CONFETTI PARTICLES ===== */}
      {[
        { left: '5%', color: '#e879f9', delay: 0, duration: 10, size: 6 },
        { left: '15%', color: '#fbbf24', delay: 3, duration: 12, size: 5 },
        { left: '25%', color: '#34d399', delay: 6, duration: 9, size: 7 },
        { left: '38%', color: '#f472b6', delay: 1, duration: 11, size: 4 },
        { left: '52%', color: '#60a5fa', delay: 4, duration: 13, size: 6 },
        { left: '65%', color: '#fb923c', delay: 7, duration: 10, size: 5 },
        { left: '78%', color: '#a78bfa', delay: 2, duration: 12, size: 7 },
        { left: '88%', color: '#f9a8d4', delay: 5, duration: 11, size: 4 },
        { left: '95%', color: '#fcd34d', delay: 8, duration: 9, size: 6 },
      ].map((c, i) => (
        <div
          key={`confetti-${i}`}
          className="absolute rounded-sm"
          style={{
            left: c.left,
            top: '-2%',
            width: c.size,
            height: c.size * 1.5,
            backgroundColor: c.color,
            animation: `confetti-fall ${c.duration}s linear infinite`,
            animationDelay: `${c.delay}s`,
            opacity: 0.5,
          }}
        />
      ))}

      {/* ===== FLOATING BUBBLES ===== */}
      {[
        { left: '12%', size: 20, delay: 0, duration: 18 },
        { left: '35%', size: 14, delay: 5, duration: 22 },
        { left: '60%', size: 18, delay: 3, duration: 20 },
        { left: '82%', size: 12, delay: 8, duration: 16 },
        { left: '48%', size: 16, delay: 11, duration: 24 },
      ].map((b, i) => (
        <div
          key={`bubble-${i}`}
          className="absolute rounded-full"
          style={{
            left: b.left,
            bottom: '5%',
            width: b.size,
            height: b.size,
            background: `radial-gradient(circle at 30% 30%, rgba(255,255,255,0.8), rgba(232, 121, 249, 0.15))`,
            border: '1px solid rgba(232, 121, 249, 0.2)',
            animation: `bubble-rise ${b.duration}s ease-in-out infinite`,
            animationDelay: `${b.delay}s`,
          }}
        />
      ))}

      {/* ===== FLOATING EMOJI / ICONS ===== */}
      {[
        { top: '15%', left: '92%', emoji: '⭐', delay: 0, duration: 8 },
        { top: '40%', left: '2%', emoji: '🌟', delay: 3, duration: 10 },
        { top: '65%', left: '88%', emoji: '✨', delay: 6, duration: 7 },
        { top: '85%', left: '50%', emoji: '💫', delay: 1.5, duration: 9 },
        { top: '30%', left: '95%', emoji: '🌈', delay: 4.5, duration: 11 },
        { top: '55%', left: '3%', emoji: '🦋', delay: 7, duration: 8 },
      ].map((e, i) => (
        <div
          key={`emoji-${i}`}
          className="absolute text-sm sm:text-base select-none"
          style={{
            top: e.top,
            left: e.left,
            animation: `bounce-float ${e.duration}s ease-in-out infinite`,
            animationDelay: `${e.delay}s`,
            opacity: 0.5,
            fontSize: '14px',
          }}
        >
          {e.emoji}
        </div>
      ))}

      {/* ===== RAINBOW GRADIENT WAVE (bottom) ===== */}
      <div
        className="absolute bottom-0 left-0 w-full h-1 opacity-30"
        style={{
          background: 'linear-gradient(90deg, #e879f9, #f472b6, #fb923c, #fbbf24, #34d399, #60a5fa, #a78bfa, #e879f9)',
          backgroundSize: '200% 100%',
          animation: 'gradient-shift 6s linear infinite',
        }}
      />
    </div>
  );
}
