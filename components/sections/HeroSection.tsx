"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, ArrowDown } from "lucide-react";

const stats = [
  { value: "50+", label: "Projects Delivered" },
  { value: "4", label: "Service Verticals" },
  { value: "24/7", label: "AI Systems Live" },
];

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 overflow-hidden pt-28 pb-20">
      {/* Background layers */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Dot grid */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px)",
            backgroundSize: "36px 36px",
            WebkitMaskImage:
              "radial-gradient(ellipse 70% 60% at 50% 40%, black 20%, transparent 75%)",
            maskImage:
              "radial-gradient(ellipse 70% 60% at 50% 40%, black 20%, transparent 75%)",
          }}
        />
        {/* Aurora */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 50% 35%, rgba(124,58,237,0.16) 0%, transparent 65%)",
          }}
        />
        <div className="absolute top-24 left-[18%] w-[520px] h-[520px] rounded-full bg-[#7C3AED]/[0.12] blur-3xl animate-aurora" />
        <div
          className="absolute bottom-16 right-[15%] w-[420px] h-[420px] rounded-full bg-[#A855F7]/[0.09] blur-3xl"
          style={{ animation: "aurora-drift 18s ease-in-out infinite reverse" }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] rounded-full bg-[#D4A853]/[0.03] blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="inline-flex items-center gap-2.5 glass rounded-full px-4 py-2 mb-9"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#A855F7] opacity-60" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#A855F7]" />
          </span>
          <span className="text-xs tracking-[0.22em] uppercase text-[#C4B5FD] font-medium">
            AI-Powered Digital Agency
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="font-display font-extrabold tracking-tight text-[#F2F1F8]"
          style={{ fontSize: "clamp(2.7rem, 6.5vw, 5.25rem)", lineHeight: 1.04 }}
        >
          Digital solutions built to
          <br />
          <span className="serif-accent gradient-text pr-2">
            drive real growth
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-[#9CA0B3] text-lg md:text-xl max-w-2xl mx-auto mt-7 leading-relaxed"
        >
          Websites, AI automation, SEO, and digital marketing — engineered as
          one system that turns attention into revenue.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.55 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-11"
        >
          <a
            href="#contact"
            className="group relative overflow-hidden bg-gradient-to-r from-[#7C3AED] to-[#8B5CF6] text-white px-8 py-4 rounded-full font-semibold transition-all hover:scale-[1.03] hover:shadow-xl hover:shadow-violet-500/30 inline-flex items-center gap-2"
          >
            <span className="absolute inset-0 -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" />
            Book Discovery Call
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
          <a
            href="#portfolio"
            className="glass text-[#F2F1F8] px-8 py-4 rounded-full font-medium transition-all hover:border-[#7C3AED]/50 hover:bg-white/[0.04]"
          >
            View Our Work
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.75 }}
          className="grid grid-cols-3 max-w-2xl mx-auto mt-20"
        >
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`px-4 md:px-8 ${
                i === 1 ? "border-x border-white/[0.07]" : ""
              }`}
            >
              <p className="font-display font-bold text-3xl md:text-4xl text-[#F2F1F8]">
                {stat.value.replace("+", "")}
                {stat.value.includes("+") && (
                  <span className="text-[#A855F7]">+</span>
                )}
              </p>
              <p className="text-[10px] md:text-[11px] uppercase tracking-[0.2em] text-[#5F6577] mt-2 font-medium">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.a
        href="#services"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.3 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-[#5F6577] hover:text-[#A78BFA] hover:border-[#7C3AED]/50 transition-colors"
        aria-label="Scroll to services"
      >
        <ArrowDown className="w-4 h-4 animate-bounce" />
      </motion.a>
    </section>
  );
}
