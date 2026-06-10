"use client";

import { motion } from "framer-motion";
import { Users, Zap, Rocket, Award } from "lucide-react";

const items = [
  { icon: Users, label: "Skilled Team", sub: "Expert professionals" },
  { icon: Zap, label: "Modern Technologies", sub: "Cutting-edge stack" },
  { icon: Rocket, label: "Fast Delivery", sub: "Agile development" },
  { icon: Award, label: "100% Satisfaction", sub: "Results guaranteed" },
];

export default function TrustBar() {
  return (
    <section className="w-full border-y border-[rgba(255,255,255,0.06)] py-8 bg-[#0E1220]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {items.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="flex flex-col items-center text-center relative"
            >
              <item.icon className="w-6 h-6 text-[#7C3AED] mb-2" />
              <p className="text-[#F0F0F8] font-semibold text-sm">
                {item.label}
              </p>
              <p className="text-[#6B7280] text-xs mt-0.5">{item.sub}</p>
              {i < items.length - 1 && (
                <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-10 bg-[rgba(255,255,255,0.06)]" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
