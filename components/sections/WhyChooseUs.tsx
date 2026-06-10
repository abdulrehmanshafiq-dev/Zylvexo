"use client";

import { motion } from "framer-motion";
import { Target, Zap, Brain, Layout } from "lucide-react";

const cards = [
  {
    num: "01",
    icon: Target,
    title: "Business-Focused",
    description:
      "Every decision is made with your ROI in mind. No vanity metrics.",
  },
  {
    num: "02",
    icon: Zap,
    title: "Fast Delivery",
    description:
      "Agile sprints mean you see real progress every week, not at the end.",
  },
  {
    num: "03",
    icon: Brain,
    title: "AI-First Approach",
    description:
      "Automation and intelligence built in — not bolted on as an afterthought.",
  },
  {
    num: "04",
    icon: Layout,
    title: "Full Service",
    description:
      "Strategy, development, and growth under one roof. One team, one vision.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-24 px-4 max-w-7xl mx-auto">
      <div className="grid md:grid-cols-5 gap-12 items-start">
        {/* Left column */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="md:col-span-2 relative"
        >
          <p className="text-xs tracking-widest text-[#7C3AED] uppercase font-medium">
            Why Choose Us
          </p>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-[#F0F0F8] mt-3 leading-tight">
            Built Different.
            <br />
            Delivers Results.
          </h2>
          <p className="text-[#9CA3AF] mt-4 text-sm leading-relaxed">
            We don&apos;t sell hours. We sell outcomes. Every project is tied to
            a real business metric — leads, revenue, growth.
          </p>
          <span className="absolute -bottom-4 right-0 text-[120px] font-display font-bold text-white/[0.02] leading-none select-none hidden md:block">
            →
          </span>
        </motion.div>

        {/* Right column — 2x2 grid */}
        <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {cards.map((card, i) => (
            <motion.div
              key={card.num}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="glass rounded-xl p-5 hover:border-[#7C3AED]/50 transition-all border border-transparent"
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-display font-bold text-[#7C3AED]">
                  {card.num}
                </span>
                <card.icon className="w-4 h-4 text-[#7C3AED]" />
              </div>
              <h3 className="text-base font-display font-bold text-[#F0F0F8]">
                {card.title}
              </h3>
              <p className="text-[#9CA3AF] text-[13px] mt-1">
                {card.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
