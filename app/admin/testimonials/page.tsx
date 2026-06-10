"use client";

import { useEffect, useState, useCallback } from "react";
import { Plus, Pencil, Trash2, Star, CheckCircle, Clock } from "lucide-react";
import SlidePanel from "@/components/admin/SlidePanel";
import ConfirmModal from "@/components/admin/ConfirmModal";
import TestimonialForm from "@/components/admin/TestimonialForm";
import { useToast } from "@/components/admin/Toast";

interface Testimonial {
  _id: string;
  clientName: string;
  clientRole?: string;
  clientCompany?: string;
  content: string;
  rating: number;
  featured: boolean;
  isApproved: boolean;
}

type FilterTab = "all" | "approved" | "pending";

export default function TestimonialsPage() {
  const { toast } = useToast();
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [panelOpen, setPanelOpen] = useState(false);
  const [editingTestimonial, setEditingTestimonial] =
    useState<Testimonial | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<Testimonial | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [filter, setFilter] = useState<FilterTab>("all");

  const fetchTestimonials = useCallback(async () => {
    try {
      const res = await fetch("/api/testimonials");
      if (res.ok) setTestimonials(await res.json());
    } catch {
      // ignore
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTestimonials();
  }, [fetchTestimonials]);

  const filtered = testimonials.filter((t) => {
    if (filter === "approved") return t.isApproved;
    if (filter === "pending") return !t.isApproved;
    return true;
  });

  function openCreate() {
    setEditingTestimonial(null);
    setPanelOpen(true);
  }

  function openEdit(testimonial: Testimonial) {
    setEditingTestimonial(testimonial);
    setPanelOpen(true);
  }

  async function handleSave(data: Record<string, unknown>) {
    setIsSaving(true);
    try {
      const isEdit = !!editingTestimonial;
      const url = isEdit
        ? `/api/testimonials/${editingTestimonial._id}`
        : "/api/testimonials";
      const res = await fetch(url, {
        method: isEdit ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        toast({
          type: "success",
          message: isEdit ? "Testimonial updated!" : "Testimonial added!",
        });
        setPanelOpen(false);
        fetchTestimonials();
      } else {
        const err = await res.json();
        toast({ type: "error", message: err.error || "Failed to save" });
      }
    } catch {
      toast({ type: "error", message: "Something went wrong" });
    } finally {
      setIsSaving(false);
    }
  }

  async function handleDelete() {
    if (!confirmDelete) return;
    try {
      const res = await fetch(`/api/testimonials/${confirmDelete._id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        toast({ type: "success", message: "Testimonial deleted" });
        fetchTestimonials();
      }
    } catch {
      toast({ type: "error", message: "Failed to delete" });
    }
    setConfirmDelete(null);
  }

  async function toggleField(
    testimonial: Testimonial,
    field: "isApproved" | "featured"
  ) {
    try {
      const res = await fetch(`/api/testimonials/${testimonial._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ [field]: !testimonial[field] }),
      });
      if (res.ok) {
        setTestimonials((prev) =>
          prev.map((t) =>
            t._id === testimonial._id
              ? { ...t, [field]: !t[field] }
              : t
          )
        );
      }
    } catch {
      // ignore
    }
  }

  const tabs: { key: FilterTab; label: string }[] = [
    { key: "all", label: "All" },
    { key: "approved", label: "Approved" },
    { key: "pending", label: "Pending" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold text-[#F0F0F8]">
            Testimonials
          </h1>
          <p className="text-[#9CA3AF] text-sm mt-1">
            Manage client testimonials
          </p>
        </div>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#7C3AED] text-white text-sm font-medium hover:bg-[#6D28D9] transition-colors"
        >
          <Plus className="w-4 h-4" /> Add Testimonial
        </button>
      </div>

      <div className="flex gap-1 bg-[#0E1220] rounded-lg p-1 w-fit">
        {tabs.map((tab) => (
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
            No testimonials found.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-[#6B7280] text-left border-b border-[rgba(255,255,255,0.08)]">
                  <th className="px-5 py-3 font-medium">Client</th>
                  <th className="px-5 py-3 font-medium">Company</th>
                  <th className="px-5 py-3 font-medium">Rating</th>
                  <th className="px-5 py-3 font-medium">Approved</th>
                  <th className="px-5 py-3 font-medium">Featured</th>
                  <th className="px-5 py-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((t) => (
                  <tr
                    key={t._id}
                    className="border-t border-[rgba(255,255,255,0.08)] hover:bg-white/[0.02]"
                  >
                    <td className="px-5 py-3 text-[#F0F0F8] font-medium">
                      {t.clientName}
                    </td>
                    <td className="px-5 py-3 text-[#9CA3AF]">
                      {t.clientCompany || "—"}
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex gap-0.5">
                        {[1, 2, 3, 4, 5].map((n) => (
                          <Star
                            key={n}
                            className={`w-3.5 h-3.5 ${
                              n <= t.rating
                                ? "fill-[#D4A853] text-[#D4A853]"
                                : "text-[#6B7280]"
                            }`}
                          />
                        ))}
                      </div>
                    </td>
                    <td className="px-5 py-3">
                      <button
                        onClick={() => toggleField(t, "isApproved")}
                        className={`flex items-center gap-1 text-xs font-medium transition-colors ${
                          t.isApproved
                            ? "text-green-400"
                            : "text-[#6B7280] hover:text-[#9CA3AF]"
                        }`}
                      >
                        {t.isApproved ? (
                          <CheckCircle className="w-3.5 h-3.5" />
                        ) : (
                          <Clock className="w-3.5 h-3.5" />
                        )}
                        {t.isApproved ? "Yes" : "Pending"}
                      </button>
                    </td>
                    <td className="px-5 py-3">
                      <button onClick={() => toggleField(t, "featured")}>
                        <Star
                          className={`w-4 h-4 transition-colors ${
                            t.featured
                              ? "fill-[#D4A853] text-[#D4A853]"
                              : "text-[#6B7280]"
                          }`}
                        />
                      </button>
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex gap-2">
                        <button
                          onClick={() => openEdit(t)}
                          className="text-[#9CA3AF] hover:text-[#F0F0F8] transition-colors"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setConfirmDelete(t)}
                          className="text-[#9CA3AF] hover:text-red-400 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <SlidePanel
        isOpen={panelOpen}
        title={editingTestimonial ? "Edit Testimonial" : "New Testimonial"}
        onClose={() => setPanelOpen(false)}
        onSave={() =>
          (
            window as unknown as Record<string, () => void>
          ).__testimonialFormSave?.()
        }
        isSaving={isSaving}
      >
        <TestimonialForm
          testimonial={editingTestimonial as never}
          onSave={handleSave as never}
          isSaving={isSaving}
        />
      </SlidePanel>

      <ConfirmModal
        isOpen={!!confirmDelete}
        title="Delete Testimonial"
        message={`Delete testimonial from "${confirmDelete?.clientName}"? This cannot be undone.`}
        onConfirm={handleDelete}
        onCancel={() => setConfirmDelete(null)}
      />
    </div>
  );
}
