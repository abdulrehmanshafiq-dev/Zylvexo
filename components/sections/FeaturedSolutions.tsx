"use client";

import { motion } from "framer-motion";
import { Check, ArrowUpRight } from "lucide-react";

const solutions = [
  {
    tag: "System 01",
    name: "AI Lead Generation",
    tagline: "For businesses struggling with inconsistent leads",
    outcomes: [
      "Automated outreach sequences",
      "AI lead qualification & scoring",
      "CRM integration",
    ],
    metric: "3x qualified leads",
  },
  {
    tag: "System 02",
    name: "AI Customer Support",
    tagline: "For businesses drowning in support requests",
    outcomes: [
      "24/7 AI chatbot on your site",
      "Instant response — under 1 second",
      "Human handoff when needed",
    ],
    metric: "80% ticket deflection",
  },
  {
    tag: "System 03",
    name: "Ecommerce Growth",
    tagline: "For online stores with traffic but low conversions",
    outcomes: [
      "Speed & UX optimization",
      "Conversion-focused redesign",
      "Retargeting ad campaigns",
    ],
    metric: "2x conversion rate",
  },
  {
    tag: "System 04",
    name: "Local Business Growth",
    tagline: "For local businesses invisible on Google",
    outcomes: [
      "Google Business optimization",
      "Local SEO domination",
      "Review management",
    ],
    metric: "#1 Maps ranking",
  },
];

export default function FeaturedSolutions() {
  return (
    <section id="solutions" className="py-28 px-5 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <p className="section-label">Solutions</p>
        <h2 className="text-4xl md:text-5xl font-display font-bold text-[#F2F1F8] mt-4 tracking-tight">
          Complete{" "}
          <span className="serif-accent gradient-text">growth systems</span>
        </h2>
        <p className="text-[#9CA0B3] mt-5 max-w-xl mx-auto text-[15px]">
          Most agencies sell services. We deliver end-to-end systems with a
          measurable outcome attached.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-6">
        {solutions.map((solution, i) => (
          <motion.div
            key={solution.name}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: i * 0.08 }}
            className="group p-px rounded-3xl bg-gradient-to-b from-white/[0.1] via-white/[0.04] to-transparent hover:from-[#7C3AED]/60 hover:via-[#7C3AED]/15 transition-all duration-500"
          >
            <div className="rounded-[23px] bg-[#0A0D18] p-8 h-full flex flex-col">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[10px] tracking-[0.3em] uppercase text-[#A78BFA] font-semibold">
                    {solution.tag}
                  </p>
                  <h3 className="text-2xl font-display font-bold text-[#F2F1F8] mt-2.5 tracking-tight">
                    {solution.name}
                  </h3>
                  <p className="text-[#5F6577] text-sm mt-1.5">
                    {solution.tagline}
                  </p>
                </div>
                <span className="shrink-0 rounded-full bg-[#D4A853]/10 border border-[#D4A853]/25 text-[#D4A853] text-xs font-semibold px-3 py-1.5 whitespace-nowrap">
                  {solution.metric}
                </span>
              </div>

              <ul className="mt-7 space-y-3.5 flex-1">
                {solution.outcomes.map((outcome) => (
                  <li key={outcome} className="flex items-center gap-3">
                    <span className="w-5 h-5 rounded-full bg-[#7C3AED]/15 flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3 text-[#A78BFA]" />
                    </span>
                    <span className="text-[#C9CDD8] text-sm">{outcome}</span>
                  </li>
                ))}
              </ul>

              <a
                href="#contact"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#A78BFA] hover:text-white mt-7 pt-6 border-t border-white/[0.06] transition-colors w-full group/link"
              >
                Explore this system
                <ArrowUpRight className="w-4 h-4 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
