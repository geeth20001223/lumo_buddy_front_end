"use client";

export function AssessmentBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none">
      <style dangerouslySetInnerHTML={{
        __html: `
        /* ===== CALM BUBBLE RISE ===== */
        @keyframes assessment-bubble-rise {
          0% { transform: translateY(100vh) scale(0.7); opacity: 0; }
          20% { opacity: 0.35; transform: translateY(80vh) scale(1); }
          50% { opacity: 0.5; transform: translateY(45vh) scale(1.15) translateX(20px); }
          80% { opacity: 0.25; transform: translateY(15vh) scale(0.85) translateX(-15px); }
          100% { transform: translateY(-10vh) scale(0.6); opacity: 0; }
        }

        /* ===== SOFT HALO PULSE ===== */
        @keyframes assessment-halo-pulse {
          0%, 100% { transform: scale(1) rotate(0deg); opacity: 0.25; }
          50% { transform: scale(1.35) rotate(180deg); opacity: 0.5; }
        }

        /* ===== FLOATING SOFT PARTICLES ===== */
        @keyframes assessment-particle-drift {
          0%, 100% { transform: translateY(0) translateX(0) scale(1); opacity: 0.35; }
          33% { transform: translateY(-30px) translateX(20px) scale(1.2); opacity: 0.7; }
          66% { transform: translateY(20px) translateX(-25px) scale(0.9); opacity: 0.45; }
        }

        /* ===== AMBIENT WAVE ===== */
        @keyframes assessment-wave-flow {
          0% { transform: translateX(0) scaleY(1); }
          50% { transform: translateX(-5%) scaleY(1.1); }
          100% { transform: translateX(0) scaleY(1); }
        }
      `}} />

      {/* ===== 1. CALM FLOATING GLASS BUBBLES ===== */}
      {[
        { left: '7%', size: 40, delay: 0, duration: 22 },
        { left: '20%', size: 26, delay: 4, duration: 18 },
        { left: '36%', size: 52, delay: 8, duration: 25 },
        { left: '52%', size: 32, delay: 2, duration: 20 },
        { left: '70%', size: 44, delay: 10, duration: 23 },
        { left: '86%', size: 28, delay: 6, duration: 17 },
        { left: '16%', size: 34, delay: 12, duration: 21 },
        { left: '62%', size: 38, delay: 14, duration: 24 },
        { left: '90%', size: 24, delay: 16, duration: 16 },
      ].map((b, i) => (
        <div
          key={`assessment-bubble-${i}`}
          className="absolute rounded-full"
          style={{
            left: b.left,
            bottom: '-10%',
            width: b.size,
            height: b.size,
            background: `radial-gradient(circle at 35% 35%, rgba(255,255,255,0.95), rgba(217, 70, 239, 0.12) 50%, rgba(168, 85, 247, 0.2))`,
            border: '1.5px solid rgba(217, 70, 239, 0.25)',
            boxShadow: 'inset 0 0 12px rgba(255,255,255,0.7), 0 6px 20px rgba(217,70,239,0.09)',
            animation: `assessment-bubble-rise ${b.duration}s ease-in-out infinite`,
            animationDelay: `${b.delay}s`,
          }}
        />
      ))}

      {/* ===== 2. SOFT PULSING HALO AURA RINGS ===== */}
      {[
        { top: '12%', left: '10%', size: 150, color: 'rgba(217, 70, 239, 0.2)', duration: 15, delay: 0 },
        { top: '42%', right: '8%', size: 190, color: 'rgba(168, 85, 247, 0.18)', duration: 19, delay: 3 },
        { bottom: '18%', left: '18%', size: 170, color: 'rgba(244, 114, 182, 0.18)', duration: 17, delay: 5 },
      ].map((h, i) => (
        <div
          key={`assessment-halo-${i}`}
          className="absolute rounded-full border-2 border-dashed pointer-events-none"
          style={{
            top: h.top,
            left: h.left,
            right: h.right,
            bottom: h.bottom,
            width: h.size,
            height: h.size,
            borderColor: h.color,
            animation: `assessment-halo-pulse ${h.duration}s ease-in-out infinite`,
            animationDelay: `${h.delay}s`,
          }}
        />
      ))}

      {/* ===== 3. CALM DRIFTING GLOWING PARTICLES ===== */}
      {[
        { top: '10%', left: '22%', size: 9, color: '#f472b6', delay: 0, duration: 7 },
        { top: '24%', left: '80%', size: 11, color: '#c084fc', delay: 1.5, duration: 9 },
        { top: '46%', left: '14%', size: 8, color: '#e879f9', delay: 3, duration: 8 },
        { top: '64%', left: '86%', size: 10, color: '#f472b6', delay: 2, duration: 9.5 },
        { top: '82%', left: '32%', size: 9, color: '#a78bfa', delay: 4, duration: 7.5 },
        { top: '34%', left: '62%', size: 7, color: '#fb7185', delay: 0.8, duration: 8.5 },
        { top: '74%', left: '72%', size: 12, color: '#e879f9', delay: 2.2, duration: 9 },
      ].map((p, i) => (
        <div
          key={`assessment-particle-${i}`}
          className="absolute rounded-full"
          style={{
            top: p.top,
            left: p.left,
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            boxShadow: `0 0 14px ${p.color}, 0 0 4px ${p.color}`,
            animation: `assessment-particle-drift ${p.duration}s ease-in-out infinite`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}

      {/* ===== 4. AMBIENT WAVY BACKGROUND ACCENT LAYER ===== */}
      <div
        className="absolute bottom-0 left-0 right-0 h-48 opacity-25"
        style={{
          background: 'radial-gradient(ellipse at bottom, rgba(217, 70, 239, 0.3), rgba(168, 85, 247, 0.1) 60%, transparent 80%)',
          animation: 'assessment-wave-flow 12s ease-in-out infinite',
        }}
      />
    </div>
  );
}
