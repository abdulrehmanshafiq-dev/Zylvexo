"use client";

import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 50% 40%, rgba(124,58,237,0.15) 0%, transparent 70%)",
          }}
        />
        <div className="absolute top-20 left-1/4 w-[600px] h-[600px] rounded-full bg-[#7C3AED]/10 blur-3xl animate-float" />
        <div
          className="absolute bottom-20 right-1/4 w-[400px] h-[400px] rounded-full bg-[#A855F7]/10 blur-3xl"
          style={{ animation: "float 8s ease-in-out infinite reverse" }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto">
        <motion.span
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0 }}
          className="inline-block border border-[#7C3AED]/50 bg-[#7C3AED]/10 text-[#A855F7] text-sm px-4 py-1.5 rounded-full mb-8"
        >
          ✦ AI-Powered Digital Agency
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="font-display font-bold tracking-tight leading-tight"
          style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)" }}
        >
          AI-Powered Digital Solutions That
          <br />
          <span className="gradient-text">Drive Business Growth</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-[#9CA3AF] text-lg max-w-2xl mx-auto mt-6"
        >
          Websites, AI automation, SEO, and digital marketing designed to
          generate more leads and revenue.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10"
        >
          <a
            href="#contact"
            className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white px-8 py-3.5 rounded-xl font-semibold transition-all hover:scale-105 hover:shadow-lg hover:shadow-violet-500/25"
          >
            Book Discovery Call →
          </a>
          <a
            href="#solutions"
            className="border border-white/20 text-white hover:bg-white/5 px-8 py-3.5 rounded-xl font-medium transition-all"
          >
            View Portfolio
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex items-center justify-center gap-6 mt-10 text-sm text-[#9CA3AF]"
        >
          <span>50+ Projects Delivered</span>
          <span className="text-[rgba(255,255,255,0.2)]">|</span>
          <span>5+ Technologies</span>
          <span className="text-[rgba(255,255,255,0.2)]">|</span>
          <span>100% Satisfaction Focus</span>
        </motion.div>
      </div>
    </section>
  );
}
