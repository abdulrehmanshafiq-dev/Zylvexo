"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { X, Plus } from "lucide-react";
import { generateSlug } from "@/lib/helpers";

interface ProjectData {
  _id?: string;
  title: string;
  slug: string;
  category: string;
  client: string;
  problem: string;
  solution: string;
  results: string[];
  techStack: string[];
  thumbnailUrl: string;
  liveUrl: string;
  status: string;
  featured: boolean;
}

const emptyProject: ProjectData = {
  title: "",
  slug: "",
  category: "",
  client: "",
  problem: "",
  solution: "",
  results: [""],
  techStack: [],
  thumbnailUrl: "",
  liveUrl: "",
  status: "draft",
  featured: false,
};

interface ProjectFormProps {
  project: ProjectData | null;
  onSave: (data: ProjectData) => void;
  isSaving: boolean;
}

export default function ProjectForm({
  project,
  onSave,
  isSaving,
}: ProjectFormProps) {
  const [form, setForm] = useState<ProjectData>(project || emptyProject);
  const [tagInput, setTagInput] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    setForm(project || emptyProject);
    setErrors({});
  }, [project]);

  const slug = form.slug || generateSlug(form.title);

  function set(field: keyof ProjectData, value: unknown) {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  }

  function handleResultChange(index: number, value: string) {
    const next = [...form.results];
    next[index] = value;
    set("results", next);
  }

  function addResult() {
    set("results", [...form.results, ""]);
  }

  function removeResult(index: number) {
    if (form.results.length <= 1) return;
    set(
      "results",
      form.results.filter((_, i) => i !== index)
    );
  }

  function handleTagKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if ((e.key === "Enter" || e.key === ",") && tagInput.trim()) {
      e.preventDefault();
      if (!form.techStack.includes(tagInput.trim())) {
        set("techStack", [...form.techStack, tagInput.trim()]);
      }
      setTagInput("");
    }
  }

  function removeTag(tag: string) {
    set(
      "techStack",
      form.techStack.filter((t) => t !== tag)
    );
  }

  function validate(): boolean {
    const errs: Record<string, string> = {};
    if (!form.title.trim()) errs.title = "Title is required";
    if (!form.category) errs.category = "Category is required";
    if (!form.problem.trim()) errs.problem = "Problem is required";
    if (!form.solution.trim()) errs.solution = "Solution is required";
    if (form.results.filter((r) => r.trim()).length < 1)
      errs.results = "At least one result is required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  function handleSave() {
    if (!validate()) return;
    onSave({
      ...form,
      slug,
      results: form.results.filter((r) => r.trim()),
    });
  }

  // Expose handleSave via a hidden mechanism — parent calls onSave from SlidePanel
  // Actually, parent passes onSave to SlidePanel which calls it, so we need to expose validate+save
  // Let's use the imperative approach: parent passes onSave which we call here
  useEffect(() => {
    // Replace the onSave reference so parent's SlidePanel Save button works
    (window as unknown as Record<string, () => void>).__projectFormSave =
      handleSave;
    return () => {
      delete (window as unknown as Record<string, unknown>).__projectFormSave;
    };
  });

  const inputClass =
    "w-full px-3 py-2 rounded-lg bg-[#080B14] border border-[rgba(255,255,255,0.08)] text-[#F0F0F8] placeholder-[#6B7280] text-sm focus:outline-none focus:border-[#7C3AED] transition-colors";

  return (
    <div className="space-y-5">
      <div>
        <label className="block text-sm font-medium text-[#9CA3AF] mb-1">
          Title *
        </label>
        <input
          className={inputClass}
          value={form.title}
          onChange={(e) => set("title", e.target.value)}
          placeholder="Project title"
        />
        {form.title && (
          <p className="text-xs text-[#6B7280] mt-1">URL: /work/{slug}</p>
        )}
        {errors.title && (
          <p className="text-xs text-red-400 mt-1">{errors.title}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-[#9CA3AF] mb-1">
          Category *
        </label>
        <select
          className={inputClass}
          value={form.category}
          onChange={(e) => set("category", e.target.value)}
        >
          <option value="">Select category</option>
          <option value="web-dev">Web Development</option>
          <option value="ai-automation">AI & Automation</option>
          <option value="seo">SEO</option>
          <option value="digital-marketing">Digital Marketing</option>
        </select>
        {errors.category && (
          <p className="text-xs text-red-400 mt-1">{errors.category}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-[#9CA3AF] mb-1">
          Client Name
        </label>
        <input
          className={inputClass}
          value={form.client}
          onChange={(e) => set("client", e.target.value)}
          placeholder="Client name (optional)"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-[#9CA3AF] mb-1">
          Client&apos;s Problem *
        </label>
        <textarea
          className={inputClass}
          rows={3}
          value={form.problem}
          onChange={(e) => set("problem", e.target.value)}
          placeholder="What problem did the client face?"
        />
        {errors.problem && (
          <p className="text-xs text-red-400 mt-1">{errors.problem}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-[#9CA3AF] mb-1">
          Your Solution *
        </label>
        <textarea
          className={inputClass}
          rows={3}
          value={form.solution}
          onChange={(e) => set("solution", e.target.value)}
          placeholder="What solution did you build?"
        />
        {errors.solution && (
          <p className="text-xs text-red-400 mt-1">{errors.solution}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-[#9CA3AF] mb-1">
          Results *
        </label>
        <div className="space-y-2">
          {form.results.map((result, i) => (
            <div key={i} className="flex gap-2">
              <input
                className={`${inputClass} flex-1`}
                value={result}
                onChange={(e) => handleResultChange(i, e.target.value)}
                placeholder='e.g. "40% more leads"'
              />
              {form.results.length > 1 && (
                <button
                  onClick={() => removeResult(i)}
                  className="text-[#6B7280] hover:text-red-400 px-2"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          ))}
        </div>
        <button
          onClick={addResult}
          className="flex items-center gap-1 text-xs text-[#A855F7] hover:text-[#7C3AED] mt-2"
        >
          <Plus className="w-3 h-3" /> Add Result
        </button>
        {errors.results && (
          <p className="text-xs text-red-400 mt-1">{errors.results}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-[#9CA3AF] mb-1">
          Tech Stack
        </label>
        <div className="flex flex-wrap gap-1.5 mb-2">
          {form.techStack.map((tag) => (
            <span
              key={tag}
              className="flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs bg-[#7C3AED]/20 text-[#A855F7]"
            >
              {tag}
              <button onClick={() => removeTag(tag)}>
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>
        <input
          className={inputClass}
          value={tagInput}
          onChange={(e) => setTagInput(e.target.value)}
          onKeyDown={handleTagKeyDown}
          placeholder="Type and press Enter to add"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-[#9CA3AF] mb-1">
          Thumbnail URL
        </label>
        <input
          className={inputClass}
          value={form.thumbnailUrl}
          onChange={(e) => set("thumbnailUrl", e.target.value)}
          placeholder="https://..."
        />
        {form.thumbnailUrl && (
          <Image
            src={form.thumbnailUrl}
            alt="Thumbnail preview"
            width={400}
            height={128}
            className="mt-2 w-full h-32 object-cover rounded-lg border border-[rgba(255,255,255,0.08)]"
            unoptimized
          />
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-[#9CA3AF] mb-1">
          Live URL
        </label>
        <input
          className={inputClass}
          value={form.liveUrl}
          onChange={(e) => set("liveUrl", e.target.value)}
          placeholder="https://..."
        />
      </div>

      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-[#9CA3AF]">Status</label>
        <button
          onClick={() =>
            set("status", form.status === "published" ? "draft" : "published")
          }
          className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
            form.status === "published"
              ? "bg-green-500/20 text-green-400"
              : "bg-gray-500/20 text-gray-400"
          }`}
        >
          {form.status === "published" ? "Published" : "Draft"}
        </button>
      </div>

      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          id="featured"
          checked={form.featured}
          onChange={(e) => set("featured", e.target.checked)}
          className="accent-[#7C3AED]"
        />
        <label htmlFor="featured" className="text-sm text-[#9CA3AF]">
          Featured project
        </label>
      </div>
    </div>
  );
}
