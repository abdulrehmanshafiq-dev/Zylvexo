"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight, Globe, Bot, TrendingUp, BarChart2 } from "lucide-react";

interface Project {
  _id: string;
  title: string;
  category: string;
  client?: string;
  problem: string;
  solution: string;
  results: string[];
  techStack: string[];
  thumbnailUrl?: string;
  liveUrl?: string;
}

const demoProjects: Project[] = [
  {
    _id: "demo-1",
    title: "E-Commerce Revenue Growth",
    category: "web-dev",
    client: "FashionBrand PK",
    problem:
      "Their Shopify store had high traffic but only 1.2% conversion rate.",
    solution:
      "Complete UX redesign, page speed optimization, and conversion-focused product pages.",
    results: ["40% revenue increase", "2x organic traffic", "3.1% conversion"],
    techStack: ["Next.js", "Shopify", "Tailwind"],
  },
  {
    _id: "demo-2",
    title: "AI Lead Generation Bot",
    category: "ai-automation",
    client: "SaaS Startup",
    problem:
      "Sales team spent 80% of time on unqualified leads from their website.",
    solution:
      "Custom GPT chatbot with lead scoring, CRM integration, and automated follow-up.",
    results: ["300% more qualified leads", "80% deflection", "4 hrs saved/day"],
    techStack: ["OpenAI", "Node.js", "HubSpot API"],
  },
  {
    _id: "demo-3",
    title: "Local SEO Domination",
    category: "seo",
    client: "Restaurant Chain",
    problem:
      "Despite 5 locations, they were invisible on Google Maps and local search.",
    solution:
      "Local SEO campaign, Google Business optimization, review generation system.",
    results: ["#1 on Google Maps", "5x more calls", "200+ new reviews"],
    techStack: ["Technical SEO", "GMB", "Schema Markup"],
  },
];

const categoryIcons: Record<string, typeof Globe> = {
  "web-dev": Globe,
  "ai-automation": Bot,
  seo: TrendingUp,
  "digital-marketing": BarChart2,
};

const categoryLabels: Record<string, string> = {
  "web-dev": "Web Dev",
  "ai-automation": "AI",
  seo: "SEO",
  "digital-marketing": "Marketing",
};

export default function PortfolioSection() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/projects?featured=true&limit=3");
        if (res.ok) {
          const data = await res.json();
          setProjects(data.length > 0 ? data : demoProjects);
        } else {
          setProjects(demoProjects);
        }
      } catch {
        setProjects(demoProjects);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <section id="portfolio" className="py-28 px-5 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        className="flex items-end justify-between mb-16"
      >
        <div>
          <p className="section-label">Portfolio</p>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-[#F2F1F8] mt-4 tracking-tight">
            Selected <span className="serif-accent gradient-text">work</span>
          </h2>
        </div>
        <a
          href="#contact"
          className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold text-[#A78BFA] hover:text-white transition-colors group"
        >
          Start a project
          <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </a>
      </motion.div>

      {loading ? (
        <div className="grid md:grid-cols-3 gap-6">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="rounded-3xl border border-white/[0.07] overflow-hidden animate-pulse"
            >
              <div className="h-48 bg-white/[0.04]" />
              <div className="p-6 space-y-3">
                <div className="h-5 bg-white/[0.04] rounded w-3/4" />
                <div className="h-3 bg-white/[0.04] rounded w-full" />
                <div className="h-3 bg-white/[0.04] rounded w-2/3" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {projects.map((project, i) => {
            const Icon = categoryIcons[project.category] || Globe;
            return (
              <motion.div
                key={project._id}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="group rounded-3xl border border-white/[0.07] bg-[#0A0D18] overflow-hidden hover:border-[#7C3AED]/40 hover:-translate-y-1.5 transition-all duration-300"
              >
                {/* Thumbnail */}
                <div className="relative h-48 overflow-hidden">
                  {project.thumbnailUrl ? (
                    <Image
                      src={project.thumbnailUrl}
                      alt={project.title}
                      width={400}
                      height={192}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      unoptimized
                    />
                  ) : (
                    <div className="relative w-full h-full bg-gradient-to-br from-[#0E1120] to-[#131730] flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
                      <div
                        className="absolute inset-0 opacity-40"
                        style={{
                          backgroundImage:
                            "radial-gradient(rgba(124,58,237,0.25) 1px, transparent 1px)",
                          backgroundSize: "20px 20px",
                        }}
                      />
                      <Icon className="w-14 h-14 text-[#7C3AED]/35 relative" />
                    </div>
                  )}
                  <span className="absolute top-4 left-4 glass px-3 py-1 rounded-full text-[11px] font-semibold text-[#C4B5FD] tracking-wide">
                    {categoryLabels[project.category] || project.category}
                  </span>
                </div>

                {/* Body */}
                <div className="p-6">
                  <h3 className="text-lg font-display font-bold text-[#F2F1F8] tracking-tight">
                    {project.title}
                  </h3>
                  {project.client && (
                    <p className="text-xs text-[#5F6577] mt-1">
                      for {project.client}
                    </p>
                  )}

                  <div className="mt-5 space-y-4">
                    <div className="border-l-2 border-white/10 pl-4">
                      <p className="text-[10px] uppercase tracking-[0.2em] text-[#5F6577] font-semibold">
                        Problem
                      </p>
                      <p className="text-[13px] text-[#9CA0B3] mt-1 leading-relaxed">
                        {project.problem}
                      </p>
                    </div>
                    <div className="border-l-2 border-[#7C3AED]/60 pl-4">
                      <p className="text-[10px] uppercase tracking-[0.2em] text-[#A78BFA] font-semibold">
                        Solution
                      </p>
                      <p className="text-[13px] text-[#9CA0B3] mt-1 leading-relaxed">
                        {project.solution}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1.5 mt-5">
                    {project.results.map((r) => (
                      <span
                        key={r}
                        className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-[#D4A853]/10 border border-[#D4A853]/20 text-[#D4A853]"
                      >
                        {r}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between mt-5 pt-4 border-t border-white/[0.06]">
                    <p className="text-[11px] text-[#5F6577]">
                      {project.techStack.join(" · ")}
                    </p>
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#A78BFA] hover:text-white transition-colors"
                        aria-label={`View ${project.title}`}
                      >
                        <ArrowUpRight className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </section>
  );
}
