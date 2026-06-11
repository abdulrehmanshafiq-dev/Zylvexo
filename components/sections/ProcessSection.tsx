"use client";

import { motion } from "framer-motion";
import { Search, Map, Code2, Rocket, TrendingUp } from "lucide-react";

const steps = [
  {
    num: "01",
    title: "Discovery",
    icon: Search,
    description: "Understanding your goals, audience, and current gaps.",
  },
  {
    num: "02",
    title: "Strategy",
    icon: Map,
    description: "Planning the exact solution, stack, and success metrics.",
  },
  {
    num: "03",
    title: "Development",
    icon: Code2,
    description: "Building with weekly demos so you see constant progress.",
  },
  {
    num: "04",
    title: "Launch",
    icon: Rocket,
    description: "Deployment, testing, and going live with confidence.",
  },
  {
    num: "05",
    title: "Growth",
    icon: TrendingUp,
    description: "Ongoing optimization, monitoring, and scaling results.",
  },
];

export default function ProcessSection() {
  return (
    <section id="process" className="relative py-28 px-5 overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[400px] bg-[#7C3AED]/[0.05] blur-3xl rounded-full pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <p className="section-label">Our Process</p>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-[#F2F1F8] mt-4 tracking-tight">
            From idea to{" "}
            <span className="serif-accent gradient-text">impact</span>
          </h2>
          <p className="text-[#9CA0B3] mt-5 max-w-xl mx-auto text-[15px]">
            A transparent, milestone-driven process you can track every step of
            the way.
          </p>
        </motion.div>

        {/* Desktop horizontal timeline */}
        <div className="hidden md:block relative">
          {/* Connector line */}
          <div className="absolute top-7 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-[#7C3AED]/50 to-transparent" />

          <div className="grid grid-cols-5 gap-5">
            {steps.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: i * 0.12 }}
                className="group flex flex-col items-center text-center relative"
              >
                {/* Ghost number */}
                <span className="absolute -top-9 font-display font-extrabold text-7xl text-white/[0.03] select-none pointer-events-none">
                  {step.num}
                </span>

                <div className="relative z-10 w-14 h-14 rounded-2xl bg-[#0A0D18] border border-[#7C3AED]/40 flex items-center justify-center mb-6 group-hover:border-[#7C3AED] group-hover:shadow-lg group-hover:shadow-violet-500/25 transition-all duration-300">
                  <step.icon className="w-5 h-5 text-[#A78BFA] group-hover:text-white transition-colors" />
                </div>

                <p className="text-[10px] tracking-[0.3em] text-[#7C3AED] font-bold mb-2">
                  STEP {step.num}
                </p>
                <h3 className="text-base font-display font-bold text-[#F2F1F8] tracking-tight">
                  {step.title}
                </h3>
                <p className="text-[13px] text-[#9CA0B3] mt-2 max-w-[180px] leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile vertical timeline */}
        <div className="md:hidden">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="flex gap-5"
            >
              {/* Left rail */}
              <div className="flex flex-col items-center">
                <div className="w-11 h-11 rounded-xl bg-[#0A0D18] border border-[#7C3AED]/40 flex items-center justify-center shrink-0">
                  <step.icon className="w-4 h-4 text-[#A78BFA]" />
                </div>
                {i < steps.length - 1 && (
                  <div className="w-px flex-1 bg-gradient-to-b from-[#7C3AED]/40 to-[#7C3AED]/10 my-2" />
                )}
              </div>

              {/* Content */}
              <div className="pb-10">
                <p className="text-[10px] tracking-[0.3em] text-[#7C3AED] font-bold">
                  STEP {step.num}
                </p>
                <h3 className="text-base font-display font-bold text-[#F2F1F8] mt-1 tracking-tight">
                  {step.title}
                </h3>
                <p className="text-[13px] text-[#9CA0B3] mt-1.5 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
