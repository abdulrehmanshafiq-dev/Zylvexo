"use client";

import { motion } from "framer-motion";
import { Globe, Bot, TrendingUp, BarChart2, ArrowUpRight } from "lucide-react";

const services = [
  {
    index: "01",
    icon: Globe,
    name: "Web Development",
    description:
      "Custom websites and web applications engineered to convert visitors into customers — fast, accessible, and built to scale.",
    badges: ["React", "Next.js", "Node.js", "MERN"],
    span: "md:col-span-7",
  },
  {
    index: "02",
    icon: Bot,
    name: "AI & Automation",
    description:
      "Intelligent systems that automate your workflow and sell for you 24/7.",
    badges: ["AI Chatbots", "Automation", "OpenAI", "Groq"],
    span: "md:col-span-5",
  },
  {
    index: "03",
    icon: TrendingUp,
    name: "SEO",
    description:
      "Data-driven SEO that gets you found by the right customers at the right moment.",
    badges: ["Technical SEO", "Local SEO", "Content"],
    span: "md:col-span-5",
  },
  {
    index: "04",
    icon: BarChart2,
    name: "Digital Marketing",
    description:
      "Paid campaigns built around one metric that matters: return on ad spend. Creative, targeting, and funnels handled end-to-end.",
    badges: ["Meta Ads", "Google Ads", "Lead Gen"],
    span: "md:col-span-7",
  },
];

export default function ServicesSection() {
  return (
    <section id="services" className="py-28 px-5 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16"
      >
        <div>
          <p className="section-label">What We Do</p>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-[#F2F1F8] mt-4 tracking-tight">
            Services that drive{" "}
            <span className="serif-accent gradient-text">real results</span>
          </h2>
        </div>
        <p className="text-[#9CA0B3] max-w-sm md:text-right text-[15px] leading-relaxed">
          Strategy, design, and technology combined into digital experiences
          that grow your business.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-12 gap-5">
        {services.map((service, i) => (
          <motion.div
            key={service.name}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: i * 0.08 }}
            className={`group relative overflow-hidden rounded-3xl border border-white/[0.07] bg-gradient-to-b from-white/[0.04] to-transparent p-8 pb-20 hover:border-[#7C3AED]/40 transition-all duration-300 ${service.span}`}
          >
            {/* Hover hairline */}
            <span className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-[#7C3AED]/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            {/* Hover glow */}
            <span className="absolute -top-20 -right-20 w-52 h-52 rounded-full bg-[#7C3AED]/[0.14] blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            {/* Ghost index */}
            <span className="absolute top-6 right-7 font-display font-extrabold text-5xl text-white/[0.04] select-none">
              {service.index}
            </span>

            <div className="w-12 h-12 rounded-2xl bg-[#7C3AED]/10 ring-1 ring-[#7C3AED]/25 flex items-center justify-center group-hover:bg-[#7C3AED] group-hover:ring-[#7C3AED] transition-all duration-300">
              <service.icon className="w-5 h-5 text-[#A78BFA] group-hover:text-white transition-colors" />
            </div>

            <h3 className="text-2xl font-display font-bold text-[#F2F1F8] mt-6 tracking-tight">
              {service.name}
            </h3>
            <p className="text-[#9CA0B3] text-[15px] mt-3 leading-relaxed max-w-md">
              {service.description}
            </p>

            <div className="flex flex-wrap gap-2 mt-6">
              {service.badges.map((badge) => (
                <span
                  key={badge}
                  className="text-xs bg-white/[0.04] border border-white/[0.08] rounded-full px-3 py-1 text-[#9CA0B3]"
                >
                  {badge}
                </span>
              ))}
            </div>

            <span className="absolute bottom-6 right-6 w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-[#9CA0B3] group-hover:bg-[#7C3AED] group-hover:border-transparent group-hover:text-white transition-all duration-300">
              <ArrowUpRight className="w-4 h-4" />
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
