"use client";

import { motion } from "framer-motion";
import { Target, Zap, Brain, Layout, ArrowUpRight } from "lucide-react";

const cards = [
  {
    num: "01",
    icon: Target,
    title: "Business-Focused",
    description:
      "Every decision is made with your ROI in mind. No vanity metrics, no fluff — just numbers that move.",
  },
  {
    num: "02",
    icon: Zap,
    title: "Fast Delivery",
    description:
      "Agile sprints mean you see real progress every single week, not a big reveal at the end.",
  },
  {
    num: "03",
    icon: Brain,
    title: "AI-First Approach",
    description:
      "Automation and intelligence built in from day one — not bolted on as an afterthought.",
  },
  {
    num: "04",
    icon: Layout,
    title: "Full Service",
    description:
      "Strategy, development, and growth under one roof. One team, one vision, zero handoff chaos.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-28 px-5 max-w-7xl mx-auto">
      <div className="grid md:grid-cols-5 gap-14 items-start">
        {/* Left column */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="md:col-span-2 md:sticky md:top-28"
        >
          <p className="section-label">Why Choose Us</p>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-[#F2F1F8] mt-4 leading-[1.1] tracking-tight">
            Built different.
            <br />
            <span className="serif-accent gradient-text">
              Delivers results.
            </span>
          </h2>
          <p className="text-[#9CA0B3] mt-6 text-[15px] leading-relaxed max-w-sm">
            We don&apos;t sell hours. We sell outcomes. Every project is tied
            to a real business metric — leads, revenue, growth.
          </p>

          <div className="mt-10 border-l-2 border-[#7C3AED] pl-6">
            <p className="font-display font-bold text-4xl text-[#F2F1F8]">
              50<span className="text-[#A855F7]">+</span>
            </p>
            <p className="text-sm text-[#5F6577] mt-1">
              projects shipped with a 100% satisfaction focus
            </p>
          </div>
        </motion.div>

        {/* Right column — editorial rows */}
        <div className="md:col-span-3 divide-y divide-white/[0.06]">
          {cards.map((card, i) => (
            <motion.div
              key={card.num}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group flex items-start gap-6 py-8 px-4 -mx-4 rounded-2xl hover:bg-white/[0.02] transition-colors relative"
            >
              <span className="font-display font-extrabold text-4xl text-white/[0.07] group-hover:text-[#7C3AED]/30 transition-colors select-none shrink-0 w-14">
                {card.num}
              </span>
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <card.icon className="w-[18px] h-[18px] text-[#A78BFA]" />
                  <h3 className="text-lg font-display font-bold text-[#F2F1F8] tracking-tight">
                    {card.title}
                  </h3>
                </div>
                <p className="text-[#9CA0B3] text-sm mt-2 leading-relaxed max-w-lg">
                  {card.description}
                </p>
              </div>
              <ArrowUpRight className="w-4 h-4 text-[#5F6577] opacity-0 group-hover:opacity-100 group-hover:text-[#A78BFA] transition-all mt-1 shrink-0" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
