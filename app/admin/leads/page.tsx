"use client";

import { useEffect, useState, useCallback } from "react";
import { X } from "lucide-react";
import { useToast } from "@/components/admin/Toast";
import { formatDate } from "@/lib/helpers";

interface Lead {
  _id: string;
  name: string;
  email: string;
  company?: string;
  service: string;
  budget: string;
  message: string;
  status: string;
  createdAt: string;
}

type FilterStatus = "all" | "new" | "contacted" | "qualified" | "closed";

const statusColors: Record<string, string> = {
  new: "bg-[#7C3AED]/20 text-[#A855F7]",
  contacted: "bg-sky-500/20 text-sky-400",
  qualified: "bg-green-500/20 text-green-400",
  closed: "bg-gray-500/20 text-gray-400",
};

const serviceLabels: Record<string, string> = {
  "web-dev": "Web Dev",
  "ai-automation": "AI",
  seo: "SEO",
  "digital-marketing": "Marketing",
  "full-package": "Full Package",
  other: "Other",
};

export default function LeadsPage() {
  const { toast } = useToast();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [filter, setFilter] = useState<FilterStatus>("all");

  const fetchLeads = useCallback(async () => {
    try {
      const res = await fetch("/api/leads");
      if (res.ok) setLeads(await res.json());
    } catch {
      // ignore
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  const filtered = leads.filter((l) => {
    if (filter === "all") return true;
    return l.status === filter;
  });

  async function updateStatus(lead: Lead, status: string) {
    try {
      const res = await fetch(`/api/leads/${lead._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        setLeads((prev) =>
          prev.map((l) => (l._id === lead._id ? { ...l, status } : l))
        );
        setSelectedLead((prev) => (prev ? { ...prev, status } : null));
        toast({ type: "success", message: "Status updated" });
      }
    } catch {
      toast({ type: "error", message: "Failed to update" });
    }
  }

  const filterTabs: { key: FilterStatus; label: string }[] = [
    { key: "all", label: "All" },
    { key: "new", label: "New" },
    { key: "contacted", label: "Contacted" },
    { key: "qualified", label: "Qualified" },
    { key: "closed", label: "Closed" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-display font-bold text-[#F0F0F8]">
          Leads
        </h1>
        <p className="text-[#9CA3AF] text-sm mt-1">
          Contact form submissions
        </p>
      </div>

      <div className="flex gap-1 bg-[#0E1220] rounded-lg p-1 w-fit">
        {filterTabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setFilter(tab.key)}
            className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
              filter === tab.key
                ? "bg-[#7C3AED]/20 text-[#A855F7]"
                : "text-[#9CA3AF] hover:text-[#F0F0F8]"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="glass rounded-xl overflow-hidden">
        {isLoading ? (
          <div className="flex justify-center py-16">
            <div className="w-8 h-8 border-2 border-[#7C3AED] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16 text-[#6B7280] text-sm">
            No leads yet — share your site!
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-[#6B7280] text-left border-b border-[rgba(255,255,255,0.08)]">
                  <th className="px-5 py-3 font-medium">Name</th>
                  <th className="px-5 py-3 font-medium">Email</th>
                  <th className="px-5 py-3 font-medium">Service</th>
                  <th className="px-5 py-3 font-medium">Budget</th>
                  <th className="px-5 py-3 font-medium">Status</th>
                  <th className="px-5 py-3 font-medium">Date</th>
                  <th className="px-5 py-3 font-medium">Message</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((lead) => (
                  <tr
                    key={lead._id}
                    onClick={() => setSelectedLead(lead)}
                    className="border-t border-[rgba(255,255,255,0.08)] hover:bg-white/[0.02] cursor-pointer"
                  >
                    <td className="px-5 py-3 text-[#F0F0F8] font-medium">
                      {lead.name}
                    </td>
                    <td className="px-5 py-3 text-[#9CA3AF]">{lead.email}</td>
                    <td className="px-5 py-3 text-[#9CA3AF]">
                      {serviceLabels[lead.service] || lead.service}
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
                    <td className="px-5 py-3 text-[#6B7280] max-w-[200px] truncate">
                      {lead.message}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Lead Detail Modal */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setSelectedLead(null)}
          />
          <div className="relative glass rounded-xl p-6 max-w-lg w-full mx-4 max-h-[80vh] overflow-y-auto">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-display font-bold text-[#F0F0F8]">
                  {selectedLead.name}
                </h3>
                <p className="text-sm text-[#9CA3AF]">{selectedLead.email}</p>
              </div>
              <button
                onClick={() => setSelectedLead(null)}
                className="text-[#6B7280] hover:text-[#F0F0F8]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                {selectedLead.company && (
                  <div>
                    <p className="text-[#6B7280]">Company</p>
                    <p className="text-[#F0F0F8]">{selectedLead.company}</p>
                  </div>
                )}
                <div>
                  <p className="text-[#6B7280]">Service</p>
                  <p className="text-[#F0F0F8]">
                    {serviceLabels[selectedLead.service] ||
                      selectedLead.service}
                  </p>
                </div>
                <div>
                  <p className="text-[#6B7280]">Budget</p>
                  <p className="text-[#F0F0F8]">{selectedLead.budget}</p>
                </div>
                <div>
                  <p className="text-[#6B7280]">Date</p>
                  <p className="text-[#F0F0F8]">
                    {formatDate(selectedLead.createdAt)}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-[#6B7280] text-sm mb-1">Status</p>
                <select
                  value={selectedLead.status}
                  onChange={(e) => updateStatus(selectedLead, e.target.value)}
                  className="px-3 py-2 rounded-lg bg-[#080B14] border border-[rgba(255,255,255,0.08)] text-[#F0F0F8] text-sm focus:outline-none focus:border-[#7C3AED]"
                >
                  <option value="new">New</option>
                  <option value="contacted">Contacted</option>
                  <option value="qualified">Qualified</option>
                  <option value="closed">Closed</option>
                </select>
              </div>

              <div>
                <p className="text-[#6B7280] text-sm mb-1">Message</p>
                <div className="p-4 rounded-lg bg-[#080B14] border border-[rgba(255,255,255,0.08)] text-[#F0F0F8] text-sm whitespace-pre-wrap">
                  {selectedLead.message}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
