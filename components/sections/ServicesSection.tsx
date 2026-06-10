"use client";

import { motion } from "framer-motion";
import { Globe, Bot, TrendingUp, BarChart2, ArrowRight } from "lucide-react";

const services = [
  {
    icon: Globe,
    name: "Web Development",
    description:
      "Custom websites and web applications that convert visitors into customers.",
    badges: ["React", "Next.js", "Node.js", "MERN"],
  },
  {
    icon: Bot,
    name: "AI & Automation",
    description:
      "Intelligent systems that automate your workflow and scale your business 24/7.",
    badges: ["AI Chatbots", "Automation", "OpenAI", "Groq"],
  },
  {
    icon: TrendingUp,
    name: "SEO",
    description:
      "Data-driven SEO that gets you found by the right customers at the right time.",
    badges: ["Technical SEO", "Local SEO", "Content"],
  },
  {
    icon: BarChart2,
    name: "Digital Marketing",
    description:
      "Paid campaigns that generate leads and maximize your return on ad spend.",
    badges: ["Meta Ads", "Google Ads", "Lead Gen"],
  },
];

export default function ServicesSection() {
  return (
    <section className="py-24 px-4 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        className="mb-14"
      >
        <p className="text-xs tracking-widest text-[#7C3AED] uppercase font-medium">
          What We Do
        </p>
        <h2 className="text-3xl md:text-4xl font-display font-bold text-[#F0F0F8] mt-3">
          Services That Drive Real Results
        </h2>
        <p className="text-[#9CA3AF] mt-3 max-w-xl">
          We combine strategy, design, and technology to build digital
          experiences that grow your business.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-6">
        {services.map((service, i) => (
          <motion.div
            key={service.name}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            className="group glass glow-border rounded-2xl p-6 hover:-translate-y-1 transition-all duration-300"
          >
            <div className="w-12 h-12 rounded-xl bg-[#7C3AED]/10 flex items-center justify-center mb-4">
              <service.icon className="w-6 h-6 text-[#7C3AED]" />
            </div>
            <h3 className="text-xl font-display font-bold text-[#F0F0F8]">
              {service.name}
            </h3>
            <p className="text-[#9CA3AF] text-sm mt-2">
              {service.description}
            </p>
            <div className="flex flex-wrap gap-2 mt-4">
              {service.badges.map((badge) => (
                <span
                  key={badge}
                  className="text-xs bg-white/5 border border-white/10 rounded-full px-3 py-1 text-[#9CA3AF]"
                >
                  {badge}
                </span>
              ))}
            </div>
            <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="text-sm text-[#A855F7] flex items-center gap-1">
                Explore Service <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
