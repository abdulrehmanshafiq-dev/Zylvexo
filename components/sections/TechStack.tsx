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
  { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
  { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
  { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
];

const row2: TechItem[] = [
  { name: "OpenAI", fallback: "AI" },
  { name: "Docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
  { name: "AWS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg" },
  { name: "Meta", fallback: "M" },
  { name: "Google", fallback: "G" },
];

function TechCard({ item }: { item: TechItem }) {
  return (
    <div className="flex-shrink-0 w-32 h-20 glass rounded-xl flex flex-col items-center justify-center gap-2 mx-2">
      {item.icon ? (
        <Image
          src={item.icon}
          alt={item.name}
          width={28}
          height={28}
          className="w-7 h-7"
        />
      ) : (
        <div className="w-7 h-7 rounded-full bg-[#7C3AED]/20 flex items-center justify-center text-xs font-bold text-[#A855F7]">
          {item.fallback}
        </div>
      )}
      <span className="text-xs text-[#9CA3AF]">{item.name}</span>
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
      <div className="absolute left-0 inset-y-0 w-32 bg-gradient-to-r from-[#080B14] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 inset-y-0 w-32 bg-gradient-to-l from-[#080B14] to-transparent z-10 pointer-events-none" />
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
    <section className="py-24 px-4 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <p className="text-xs tracking-widest text-[#7C3AED] uppercase font-medium">
          Tech Stack
        </p>
        <h2 className="text-3xl md:text-4xl font-display font-bold text-[#F0F0F8] mt-3">
          Technologies We Use
        </h2>
        <p className="text-[#9CA3AF] mt-3 max-w-xl mx-auto">
          Modern, battle-tested tools chosen for performance, scalability, and
          developer happiness.
        </p>
      </motion.div>

      <div className="space-y-4">
        <ScrollRow items={row1} direction="left" />
        <ScrollRow items={row2} direction="right" />
      </div>
    </section>
  );
}
