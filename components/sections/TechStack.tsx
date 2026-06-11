"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface TechItem {
  name: string;
  icon?: string;
  fallback?: string;
}

const row1: TechItem[] = [
  { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { name: "Next.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
  { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
  { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
  { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
  { name: "Tailwind", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" },
  { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
];

const row2: TechItem[] = [
  { name: "OpenAI", fallback: "AI" },
  { name: "Groq", fallback: "⚡" },
  { name: "Docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
  { name: "AWS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg" },
  { name: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
  { name: "Figma", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" },
  { name: "Vercel", fallback: "▲" },
];

function TechCard({ item }: { item: TechItem }) {
  return (
    <div className="flex-shrink-0 flex items-center gap-3 h-14 px-6 rounded-2xl border border-white/[0.07] bg-white/[0.025] mx-2.5 hover:border-[#7C3AED]/40 hover:bg-white/[0.04] transition-colors">
      {item.icon ? (
        <Image
          src={item.icon}
          alt={item.name}
          width={24}
          height={24}
          className="w-6 h-6 opacity-90"
        />
      ) : (
        <span className="w-6 h-6 rounded-md bg-[#7C3AED]/20 flex items-center justify-center text-[11px] font-bold text-[#A78BFA]">
          {item.fallback}
        </span>
      )}
      <span className="text-sm text-[#9CA0B3] whitespace-nowrap font-medium">
        {item.name}
      </span>
    </div>
  );
}

function ScrollRow({
  items,
  direction,
}: {
  items: TechItem[];
  direction: "left" | "right";
}) {
  const doubled = [...items, ...items];
  return (
    <div className="relative overflow-hidden pause-on-hover">
      <div className="absolute left-0 inset-y-0 w-32 bg-gradient-to-r from-[#06070D] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 inset-y-0 w-32 bg-gradient-to-l from-[#06070D] to-transparent z-10 pointer-events-none" />
      <div
        className={`flex ${
          direction === "left" ? "animate-scroll-left" : "animate-scroll-right"
        }`}
        style={{ width: "max-content" }}
      >
        {doubled.map((item, i) => (
          <TechCard key={`${item.name}-${i}`} item={item} />
        ))}
      </div>
    </div>
  );
}

export default function TechStack() {
  return (
    <section className="py-28 px-5 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        className="text-center mb-14"
      >
        <p className="section-label">Tech Stack</p>
        <h2 className="text-4xl md:text-5xl font-display font-bold text-[#F2F1F8] mt-4 tracking-tight">
          Technologies we{" "}
          <span className="serif-accent gradient-text">trust</span>
        </h2>
        <p className="text-[#9CA0B3] mt-5 max-w-xl mx-auto text-[15px]">
          Modern, battle-tested tools chosen for performance, scalability, and
          longevity.
        </p>
      </motion.div>

      <div className="space-y-5">
        <ScrollRow items={row1} direction="left" />
        <ScrollRow items={row2} direction="right" />
      </div>
    </section>
  );
}
