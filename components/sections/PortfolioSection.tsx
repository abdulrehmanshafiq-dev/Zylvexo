"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight, Globe, Bot, TrendingUp, BarChart2 } from "lucide-react";

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
    results: ["40% revenue increase", "2x organic traffic", "3.1% conversion rate"],
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
    results: ["300% more qualified leads", "80% support deflection", "4 hours saved per day"],
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

const categoryColors: Record<string, string> = {
  "web-dev": "bg-blue-500/20 text-blue-400",
  "ai-automation": "bg-[#7C3AED]/20 text-[#A855F7]",
  seo: "bg-green-500/20 text-green-400",
  "digital-marketing": "bg-orange-500/20 text-orange-400",
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
    <section id="portfolio" className="py-24 px-4 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        className="flex items-end justify-between mb-14"
      >
        <div>
          <p className="text-xs tracking-widest text-[#7C3AED] uppercase font-medium">
            Portfolio
          </p>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-[#F0F0F8] mt-3">
            Our Work
          </h2>
        </div>
        <a
          href="#portfolio"
          className="text-sm text-[#A855F7] hover:text-[#7C3AED] flex items-center gap-1 transition-colors"
        >
          View All <ArrowRight className="w-3.5 h-3.5" />
        </a>
      </motion.div>

      {loading ? (
        <div className="grid md:grid-cols-3 gap-6">
          {[0, 1, 2].map((i) => (
            <div key={i} className="glass rounded-2xl overflow-hidden animate-pulse">
              <div className="h-44 bg-white/5" />
              <div className="p-5 space-y-3">
                <div className="h-5 bg-white/5 rounded w-3/4" />
                <div className="h-3 bg-white/5 rounded w-full" />
                <div className="h-3 bg-white/5 rounded w-2/3" />
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
                className="glass rounded-2xl overflow-hidden hover:-translate-y-1 transition-all duration-300 group"
              >
                {/* Thumbnail */}
                <div className="relative h-44">
                  {project.thumbnailUrl ? (
                    <Image
                      src={project.thumbnailUrl}
                      alt={project.title}
                      width={400}
                      height={176}
                      className="w-full h-full object-cover"
                      unoptimized
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-[#0E1220] to-[#131929] flex items-center justify-center">
                      <Icon className="w-12 h-12 text-[#7C3AED]/30" />
                    </div>
                  )}
                  <span
                    className={`absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      categoryColors[project.category] || ""
                    }`}
                  >
                    {categoryLabels[project.category] || project.category}
                  </span>
                </div>

                {/* Body */}
                <div className="p-5 space-y-3">
                  <h3 className="text-base font-display font-bold text-[#F0F0F8]">
                    {project.title}
                  </h3>

                  <div className="space-y-2">
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-[#6B7280] font-medium">
                        Problem
                      </p>
                      <p className="text-xs text-[#9CA3AF] mt-0.5">
                        {project.problem}
                      </p>
                    </div>

                    <div className="flex justify-center">
                      <div className="w-px h-3 bg-[#7C3AED]/40" />
                    </div>

                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-[#6B7280] font-medium">
                        Solution
                      </p>
                      <p className="text-xs text-[#9CA3AF] mt-0.5">
                        {project.solution}
                      </p>
                    </div>

                    <div className="flex justify-center">
                      <div className="w-px h-3 bg-[#7C3AED]/40" />
                    </div>

                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-[#6B7280] font-medium mb-1.5">
                        Results
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {project.results.map((r) => (
                          <span
                            key={r}
                            className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-[#7C3AED]/15 text-[#A855F7]"
                          >
                            {r}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {project.techStack.map((t) => (
                      <span
                        key={t}
                        className="text-[10px] text-[#6B7280] bg-white/5 px-2 py-0.5 rounded-full"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-[#A855F7] flex items-center gap-1 hover:underline pt-1"
                    >
                      View Project <ArrowRight className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </section>
  );
}
