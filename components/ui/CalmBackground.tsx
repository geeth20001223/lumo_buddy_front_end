"use client";

import { motion } from "framer-motion";

const FLOATING_ORBS = [
  { size: 80, left: "8%", top: "12%", color: "bg-sky-200/50", duration: 16, delay: 0 },
  { size: 120, left: "78%", top: "20%", color: "bg-fuchsia-200/40", duration: 20, delay: 2 },
  { size: 64, left: "15%", top: "45%", color: "bg-indigo-200/45", duration: 18, delay: 1 },
  { size: 100, left: "70%", top: "58%", color: "bg-purple-200/40", duration: 22, delay: 3 },
  { size: 76, left: "38%", top: "78%", color: "bg-rose-200/45", duration: 17, delay: 1.5 },
  { size: 90, left: "82%", top: "82%", color: "bg-teal-200/45", duration: 24, delay: 0.5 },
];

export function CalmBackground() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none select-none">
      {/* Base Soft Pastel Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-sky-50/60 to-purple-50/40" />

      {/* Large Floating Mesh Blobs */}
      <motion.div
        animate={{
          x: [0, 50, 0],
          y: [0, 40, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-[-5%] left-[-5%] w-[60%] h-[50%] rounded-full bg-sky-200/40 blur-[100px]"
      />

      <motion.div
        animate={{
          x: [0, -60, 0],
          y: [0, 60, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-[35%] right-[-10%] w-[55%] h-[55%] rounded-full bg-fuchsia-200/35 blur-[120px]"
      />

      <motion.div
        animate={{
          x: [0, 40, 0],
          y: [0, -50, 0],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-[-5%] left-[-5%] w-[50%] h-[50%] rounded-full bg-indigo-200/35 blur-[120px]"
      />

      {/* Floating Animated Pastel Glass Orbs */}
      {FLOATING_ORBS.map((orb, idx) => (
        <motion.div
          key={idx}
          style={{
            width: orb.size,
            height: orb.size,
            left: orb.left,
            top: orb.top,
          }}
          animate={{
            y: [0, -40, 0],
            x: [0, 25, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: orb.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: orb.delay,
          }}
          className={`absolute rounded-full ${orb.color} backdrop-blur-md border border-white/60 shadow-[inset_0_2px_8px_rgba(255,255,255,0.9),0_10px_25px_rgba(56,189,248,0.15)]`}
        />
      ))}

      {/* Pulsing Aura Light Rings */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-[18%] right-[15%] w-[380px] h-[380px] rounded-full border-2 border-sky-300/50 bg-gradient-to-br from-sky-200/20 to-transparent blur-sm"
      />

      <motion.div
        animate={{
          scale: [1, 1.22, 1],
          opacity: [0.25, 0.5, 0.25],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
        className="absolute top-[60%] left-[12%] w-[340px] h-[340px] rounded-full border-2 border-fuchsia-300/50 bg-gradient-to-br from-fuchsia-200/20 to-transparent blur-sm"
      />
    </div>
  );
}
