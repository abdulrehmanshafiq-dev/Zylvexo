"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  FolderOpen,
  Send,
  Inbox,
  Users,
  Plus,
  ArrowRight,
} from "lucide-react";
import { formatDate } from "@/lib/helpers";

interface Stats {
  totalProjects: number;
  publishedProjects: number;
  totalLeads: number;
  newLeads: number;
  totalTestimonials: number;
  teamCount: number;
}

interface Lead {
  _id: string;
  name: string;
  email: string;
  service: string;
  budget: string;
  status: string;
  createdAt: string;
}

interface Project {
  _id: string;
  title: string;
  slug: string;
  category: string;
  status: string;
  createdAt: string;
}

const statusColors: Record<string, string> = {
  new: "bg-[#7C3AED]/20 text-[#A855F7]",
  contacted: "bg-blue-500/20 text-blue-400",
  qualified: "bg-green-500/20 text-green-400",
  closed: "bg-gray-500/20 text-gray-400",
};

const categoryLabels: Record<string, string> = {
  "web-dev": "Web Dev",
  "ai-automation": "AI",
  seo: "SEO",
  "digital-marketing": "Marketing",
};

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const [statsRes, leadsRes, projectsRes] = await Promise.all([
          fetch("/api/stats"),
          fetch("/api/leads?limit=5"),
          fetch("/api/projects?limit=3"),
        ]);

        if (statsRes.ok) setStats(await statsRes.json());
        if (leadsRes.ok) setLeads(await leadsRes.json());
        if (projectsRes.ok) setProjects(await projectsRes.json());
      } catch {
        // DB not connected — show empty state
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const statCards = [
    {
      label: "Total Projects",
      value: stats?.totalProjects ?? 0,
      icon: FolderOpen,
    },
    {
      label: "Published",
      value: stats?.publishedProjects ?? 0,
      icon: Send,
    },
    {
      label: "New Leads",
      value: stats?.newLeads ?? 0,
      icon: Inbox,
    },
    {
      label: "Total Leads",
      value: stats?.totalLeads ?? 0,
      icon: Users,
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-2 border-[#7C3AED] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-display font-bold text-[#F0F0F8]">
          Dashboard
        </h1>
        <p className="text-[#9CA3AF] text-sm mt-1">
          Welcome back! Here&apos;s what&apos;s happening.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card) => (
          <div
            key={card.label}
            className="glass rounded-xl p-5 flex items-start justify-between"
          >
            <div>
              <p className="text-2xl font-bold gradient-text">{card.value}</p>
              <p className="text-[#9CA3AF] text-sm mt-1">{card.label}</p>
            </div>
            <card.icon className="w-5 h-5 text-[#7C3AED] mt-1" />
          </div>
        ))}
      </div>

      {/* Recent Leads */}
      <div className="glass rounded-xl overflow-hidden">
        <div className="px-5 py-4 border-b border-[rgba(255,255,255,0.08)]">
          <h2 className="text-lg font-display font-bold text-[#F0F0F8]">
            Recent Leads
          </h2>
        </div>
        {leads.length === 0 ? (
          <div className="px-5 py-10 text-center text-[#6B7280] text-sm">
            No leads yet — share your site!
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-[#6B7280] text-left">
                  <th className="px-5 py-3 font-medium">Name</th>
                  <th className="px-5 py-3 font-medium">Service</th>
                  <th className="px-5 py-3 font-medium">Budget</th>
                  <th className="px-5 py-3 font-medium">Status</th>
                  <th className="px-5 py-3 font-medium">Date</th>
                </tr>
              </thead>
              <tbody>
                {leads.map((lead) => (
                  <tr
                    key={lead._id}
                    className="border-t border-[rgba(255,255,255,0.08)] hover:bg-white/[0.02]"
                  >
                    <td className="px-5 py-3 text-[#F0F0F8]">{lead.name}</td>
                    <td className="px-5 py-3 text-[#9CA3AF]">
                      {categoryLabels[lead.service] || lead.service}
                    </td>
                    <td className="px-5 py-3 text-[#9CA3AF]">{lead.budget}</td>
                    <td className="px-5 py-3">
                      <span
                        className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                          statusColors[lead.status] || statusColors.closed
                        }`}
                      >
                        {lead.status}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-[#6B7280]">
                      {formatDate(lead.createdAt)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {leads.length > 0 && (
          <div className="px-5 py-3 border-t border-[rgba(255,255,255,0.08)]">
            <Link
              href="/admin/leads"
              className="text-sm text-[#A855F7] hover:text-[#7C3AED] flex items-center gap-1 transition-colors"
            >
              View All Leads
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="flex gap-3">
        <Link
          href="/admin/projects"
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#7C3AED] text-white text-sm font-medium hover:bg-[#6D28D9] transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Project
        </Link>
        <Link
          href="/admin/team"
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-[rgba(255,255,255,0.08)] text-[#9CA3AF] text-sm font-medium hover:bg-white/5 hover:text-[#F0F0F8] transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Team Member
        </Link>
      </div>

      {/* Recent Projects */}
      {projects.length > 0 && (
        <div>
          <h2 className="text-lg font-display font-bold text-[#F0F0F8] mb-4">
            Recent Projects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {projects.map((project) => (
              <div key={project._id} className="glass rounded-xl p-5 space-y-3">
                <h3 className="text-[#F0F0F8] font-medium">{project.title}</h3>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-[#7C3AED]/20 text-[#A855F7]">
                    {categoryLabels[project.category] || project.category}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                      project.status === "published"
                        ? "bg-green-500/20 text-green-400"
                        : "bg-yellow-500/20 text-yellow-400"
                    }`}
                  >
                    {project.status}
                  </span>
                </div>
                <Link
                  href={`/admin/projects`}
                  className="text-sm text-[#A855F7] hover:text-[#7C3AED] flex items-center gap-1 transition-colors"
                >
                  Edit
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
