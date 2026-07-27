"use client";

import { motion } from "framer-motion";
import { UserPlus, ClipboardCheck, Sparkles, Gamepad2, LineChart } from "lucide-react";

const steps = [
  {
    icon: <UserPlus className="w-8 h-8" />,
    title: "Create Child Profile",
    description: "Add your child and create a personalized learning space tailored to their identity and preferences.",
    color: "bg-gradient-to-r from-blue-500 to-indigo-600",
    badgeBg: "bg-blue-50 text-blue-700 border-blue-200",
    iconBg: "bg-blue-50 text-blue-600 border-blue-200",
  },
  {
    icon: <ClipboardCheck className="w-8 h-8" />,
    title: "Complete Assessment",
    description: "Answer a short parent survey to help Lumo Buddy understand your child's current needs and developmental stage.",
    color: "bg-gradient-to-r from-violet-500 to-purple-600",
    badgeBg: "bg-violet-50 text-violet-700 border-violet-200",
    iconBg: "bg-violet-50 text-violet-600 border-violet-200",
  },
  {
    icon: <Sparkles className="w-8 h-8" />,
    title: "Receive Recommendations",
    description: "Lumo Buddy identifies areas that need support and unlocks suitable adaptive activities specifically for your child.",
    color: "bg-gradient-to-r from-teal-500 to-emerald-600",
    badgeBg: "bg-teal-50 text-teal-700 border-teal-200",
    iconBg: "bg-teal-50 text-teal-600 border-teal-200",
  },
  {
    icon: <Gamepad2 className="w-8 h-8" />,
    title: "Start Learning Activities",
    description: "Your child can complete carefully designed learning activities at their own pace in a calm, focused environment.",
    color: "bg-gradient-to-r from-amber-500 to-orange-600",
    badgeBg: "bg-amber-50 text-amber-700 border-amber-200",
    iconBg: "bg-amber-50 text-amber-600 border-amber-200",
  },
  {
    icon: <LineChart className="w-8 h-8" />,
    title: "Track Progress",
    description: "View reports, activity results, and learning insights through the intuitive parent dashboard.",
    color: "bg-gradient-to-r from-rose-500 to-pink-600",
    badgeBg: "bg-rose-50 text-rose-700 border-rose-200",
    iconBg: "bg-rose-50 text-rose-600 border-rose-200",
  },
];

export function JourneyTimeline() {
  return (
    <section className="py-16 md:py-28 bg-transparent relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 md:mb-24">
          <span className="inline-block px-4 py-1.5 rounded-full bg-indigo-50/90 border border-indigo-100 text-xs font-black uppercase tracking-[0.2em] text-indigo-600 mb-3 shadow-2xs">
            STEP-BY-STEP PROCESS
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight mb-4">
            The Learning Journey
          </h2>
          <p className="text-base md:text-lg text-slate-600 font-extrabold max-w-2xl mx-auto px-4 leading-relaxed">
            A structured path designed to support both you and your child at every step of development.
          </p>
        </div>

        <div className="relative">
          {/* Vertical Connecting Line */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-1.5 bg-gradient-to-b from-blue-300 via-purple-300 to-rose-300 rounded-full hidden lg:block" />

          <div className="space-y-16 lg:space-y-28">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: index * 0.1 }}
                className={`flex flex-col lg:flex-row items-center gap-8 lg:gap-24 ${
                  index % 2 !== 0 ? "lg:flex-row-reverse" : ""
                }`}
              >
                {/* Card Side */}
                <div className="flex-1 flex justify-center w-full">
                  <div className="relative w-full max-w-md p-8 rounded-[2.5rem] bg-white/90 backdrop-blur-md border-2 border-slate-100 shadow-xl hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 group overflow-hidden">
                    <div className="flex items-center gap-4 mb-4">
                      <div className={`p-4 rounded-2xl ${step.iconBg} border shadow-md group-hover:scale-110 transition-transform duration-300`}>
                        {step.icon}
                      </div>
                      <span className={`px-3.5 py-1 rounded-full border text-xs font-black uppercase tracking-wider ${step.badgeBg}`}>
                        Step 0{index + 1}
                      </span>
                    </div>

                    <h3 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight mb-2">
                      {step.title}
                    </h3>
                    <p className="text-sm md:text-base text-slate-600 font-bold leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>

                {/* Milestone Node (Desktop) */}
                <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-white border-4 border-slate-100 items-center justify-center z-10 shadow-lg">
                  <div className={`w-5 h-5 rounded-full ${step.color}`} />
                </div>

                {/* Empty Spacer */}
                <div className="flex-1 hidden lg:block" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
