"use client";

import { motion } from "framer-motion";
import { Search, Map, Code2, Rocket, TrendingUp } from "lucide-react";

const steps = [
  {
    num: 1,
    title: "Discovery",
    icon: Search,
    description: "Understanding your goals, audience, and current gaps.",
  },
  {
    num: 2,
    title: "Strategy",
    icon: Map,
    description: "Planning the exact solution, stack, and success metrics.",
  },
  {
    num: 3,
    title: "Development",
    icon: Code2,
    description: "Building with weekly demos so you see progress constantly.",
  },
  {
    num: 4,
    title: "Launch",
    icon: Rocket,
    description: "Deployment, testing, and going live with confidence.",
  },
  {
    num: 5,
    title: "Growth",
    icon: TrendingUp,
    description: "Ongoing optimization, monitoring, and scaling results.",
  },
];

export default function ProcessSection() {
  return (
    <section className="py-24 px-4 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <p className="text-xs tracking-widest text-[#7C3AED] uppercase font-medium">
          Our Process
        </p>
        <h2 className="text-3xl md:text-4xl font-display font-bold text-[#F0F0F8] mt-3">
          From Idea to Impact
        </h2>
        <p className="text-[#9CA3AF] mt-3 max-w-xl mx-auto">
          A transparent, milestone-driven process you can track every step of
          the way.
        </p>
      </motion.div>

      {/* Desktop horizontal timeline */}
      <div className="hidden md:block relative">
        {/* Connector line */}
        <div className="absolute top-6 left-[10%] right-[10%] h-px border-t-2 border-dashed border-[rgba(255,255,255,0.08)]" />

        <div className="grid grid-cols-5 gap-4">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="flex flex-col items-center text-center"
            >
              <div className="w-12 h-12 rounded-full bg-[#7C3AED] flex items-center justify-center text-white font-bold text-sm relative z-10 mb-4">
                {step.num}
              </div>
              <step.icon className="w-5 h-5 text-[#7C3AED] mb-2" />
              <h3 className="text-sm font-display font-bold text-[#F0F0F8]">
                {step.title}
              </h3>
              <p className="text-xs text-[#9CA3AF] mt-1 max-w-[160px]">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Mobile vertical timeline */}
      <div className="md:hidden space-y-0">
        {steps.map((step, i) => (
          <motion.div
            key={step.num}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            className="flex gap-4"
          >
            {/* Left bar */}
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-[#7C3AED] flex items-center justify-center text-white font-bold text-xs shrink-0">
                {step.num}
              </div>
              {i < steps.length - 1 && (
                <div className="w-0.5 flex-1 bg-[#7C3AED]/20 my-1" />
              )}
            </div>

            {/* Content */}
            <div className="pb-8">
              <div className="flex items-center gap-2">
                <step.icon className="w-4 h-4 text-[#7C3AED]" />
                <h3 className="text-sm font-display font-bold text-[#F0F0F8]">
                  {step.title}
                </h3>
              </div>
              <p className="text-xs text-[#9CA3AF] mt-1">
                {step.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
