"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { Plus, Pencil, Trash2, Star } from "lucide-react";
import SlidePanel from "@/components/admin/SlidePanel";
import ConfirmModal from "@/components/admin/ConfirmModal";
import ProjectForm from "@/components/admin/ProjectForm";
import { useToast } from "@/components/admin/Toast";

interface Project {
  _id: string;
  title: string;
  slug: string;
  category: string;
  thumbnailUrl?: string;
  status: string;
  featured: boolean;
  order: number;
}

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

export default function ProjectsPage() {
  const { toast } = useToast();
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [panelOpen, setPanelOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<Project | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const fetchProjects = useCallback(async () => {
    try {
      const res = await fetch("/api/projects");
      if (res.ok) setProjects(await res.json());
    } catch {
      // ignore
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  function openCreate() {
    setEditingProject(null);
    setPanelOpen(true);
  }

  function openEdit(project: Project) {
    setEditingProject(project);
    setPanelOpen(true);
  }

  async function handleSave(data: Record<string, unknown>) {
    setIsSaving(true);
    try {
      const isEdit = !!editingProject;
      const url = isEdit
        ? `/api/projects/${editingProject._id}`
        : "/api/projects";
      const res = await fetch(url, {
        method: isEdit ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        toast({
          type: "success",
          message: isEdit ? "Project updated!" : "Project created!",
        });
        setPanelOpen(false);
        fetchProjects();
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
      const res = await fetch(`/api/projects/${confirmDelete._id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        toast({ type: "success", message: "Project deleted" });
        fetchProjects();
      }
    } catch {
      toast({ type: "error", message: "Failed to delete" });
    }
    setConfirmDelete(null);
  }

  async function toggleFeatured(project: Project) {
    try {
      const res = await fetch(`/api/projects/${project._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ featured: !project.featured }),
      });
      if (res.ok) {
        setProjects((prev) =>
          prev.map((p) =>
            p._id === project._id ? { ...p, featured: !p.featured } : p
          )
        );
      }
    } catch {
      // ignore
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold text-[#F0F0F8]">
            Projects
          </h1>
          <p className="text-[#9CA3AF] text-sm mt-1">
            Manage your portfolio projects
          </p>
        </div>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#7C3AED] text-white text-sm font-medium hover:bg-[#6D28D9] transition-colors"
        >
          <Plus className="w-4 h-4" /> Add Project
        </button>
      </div>

      <div className="glass rounded-xl overflow-hidden">
        {isLoading ? (
          <div className="flex justify-center py-16">
            <div className="w-8 h-8 border-2 border-[#7C3AED] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-16 text-[#6B7280] text-sm">
            No projects yet. Click &quot;Add Project&quot; to create one.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-[#6B7280] text-left border-b border-[rgba(255,255,255,0.08)]">
                  <th className="px-5 py-3 font-medium w-8">#</th>
                  <th className="px-5 py-3 font-medium w-12"></th>
                  <th className="px-5 py-3 font-medium">Title</th>
                  <th className="px-5 py-3 font-medium">Category</th>
                  <th className="px-5 py-3 font-medium">Status</th>
                  <th className="px-5 py-3 font-medium">Featured</th>
                  <th className="px-5 py-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((project, i) => (
                  <tr
                    key={project._id}
                    className="border-t border-[rgba(255,255,255,0.08)] hover:bg-white/[0.02]"
                  >
                    <td className="px-5 py-3 text-[#6B7280]">{i + 1}</td>
                    <td className="px-5 py-3">
                      {project.thumbnailUrl ? (
                        <Image
                          src={project.thumbnailUrl}
                          alt=""
                          width={40}
                          height={40}
                          className="w-10 h-10 rounded object-cover"
                          unoptimized
                        />
                      ) : (
                        <div className="w-10 h-10 rounded bg-[#080B14] border border-[rgba(255,255,255,0.08)]" />
                      )}
                    </td>
                    <td className="px-5 py-3 text-[#F0F0F8] font-medium">
                      {project.title}
                    </td>
                    <td className="px-5 py-3">
                      <span
                        className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                          categoryColors[project.category] || ""
                        }`}
                      >
                        {categoryLabels[project.category] || project.category}
                      </span>
                    </td>
                    <td className="px-5 py-3">
                      <span
                        className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                          project.status === "published"
                            ? "bg-green-500/20 text-green-400"
                            : "bg-gray-500/20 text-gray-400"
                        }`}
                      >
                        {project.status}
                      </span>
                    </td>
                    <td className="px-5 py-3">
                      <button onClick={() => toggleFeatured(project)}>
                        <Star
                          className={`w-4 h-4 transition-colors ${
                            project.featured
                              ? "fill-[#D4A853] text-[#D4A853]"
                              : "text-[#6B7280]"
                          }`}
                        />
                      </button>
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex gap-2">
                        <button
                          onClick={() => openEdit(project)}
                          className="text-[#9CA3AF] hover:text-[#F0F0F8] transition-colors"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setConfirmDelete(project)}
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
        title={editingProject ? "Edit Project" : "New Project"}
        onClose={() => setPanelOpen(false)}
        onSave={() =>
          (
            window as unknown as Record<string, () => void>
          ).__projectFormSave?.()
        }
        isSaving={isSaving}
      >
        <ProjectForm
          project={editingProject as never}
          onSave={handleSave as never}
          isSaving={isSaving}
        />
      </SlidePanel>

      <ConfirmModal
        isOpen={!!confirmDelete}
        title="Delete Project"
        message={`Are you sure you want to delete "${confirmDelete?.title}"? This cannot be undone.`}
        onConfirm={handleDelete}
        onCancel={() => setConfirmDelete(null)}
      />
    </div>
  );
}
