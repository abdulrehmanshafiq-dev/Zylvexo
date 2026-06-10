"use client";

import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";

const solutions = [
  {
    name: "AI Lead Generation System",
    tagline: "For businesses struggling with inconsistent leads",
    outcomes: [
      "Automated outreach sequences",
      "AI lead qualification",
      "CRM integration",
      "3x qualified leads",
    ],
  },
  {
    name: "AI Customer Support System",
    tagline: "For businesses drowning in support requests",
    outcomes: [
      "24/7 AI chatbot",
      "Instant response < 1 second",
      "Human handoff when needed",
      "80% ticket deflection",
    ],
  },
  {
    name: "Ecommerce Growth System",
    tagline: "For online stores with traffic but low conversions",
    outcomes: [
      "Speed & UX optimization",
      "Conversion-focused redesign",
      "Retargeting ad campaigns",
      "SEO-driven organic traffic",
    ],
  },
  {
    name: "Local Business Growth System",
    tagline: "For local businesses invisible on Google",
    outcomes: [
      "Google Business optimization",
      "Local SEO domination",
      "Review management",
      "Maps ranking #1",
    ],
  },
];

export default function FeaturedSolutions() {
  return (
    <section id="solutions" className="py-24 px-4 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        className="mb-14"
      >
        <p className="text-xs tracking-widest text-[#7C3AED] uppercase font-medium">
          Solutions
        </p>
        <h2 className="text-3xl md:text-4xl font-display font-bold text-[#F0F0F8] mt-3">
          Complete Business Growth Systems
        </h2>
        <p className="text-[#9CA3AF] mt-3 max-w-xl">
          Most agencies sell services. We deliver end-to-end solutions.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-8">
        {solutions.map((solution, i) => (
          <motion.div
            key={solution.name}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            className="rounded-2xl p-7 border border-[rgba(255,255,255,0.08)] hover:border-[#7C3AED]/40 transition-all bg-gradient-to-br from-[#0E1220] to-[#131929]"
          >
            <h3 className="text-lg font-display font-bold text-[#F0F0F8]">
              {solution.name}
            </h3>
            <p className="text-[#9CA3AF] text-sm mt-1">{solution.tagline}</p>

            <ul className="mt-5 space-y-2.5">
              {solution.outcomes.map((outcome) => (
                <li key={outcome} className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#7C3AED] mt-0.5 shrink-0" />
                  <span className="text-[#F0F0F8] text-sm">{outcome}</span>
                </li>
              ))}
            </ul>

            <a
              href="#contact"
              className="inline-flex items-center gap-1 text-sm text-[#A855F7] hover:underline mt-5"
            >
              Explore System <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
