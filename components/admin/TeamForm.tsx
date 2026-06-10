"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";

interface TeamData {
  _id?: string;
  name: string;
  role: string;
  bio: string;
  avatarUrl: string;
  skills: string[];
  linkedinUrl: string;
  twitterUrl: string;
}

const emptyMember: TeamData = {
  name: "",
  role: "",
  bio: "",
  avatarUrl: "",
  skills: [],
  linkedinUrl: "",
  twitterUrl: "",
};

interface TeamFormProps {
  member: TeamData | null;
  onSave: (data: TeamData) => void;
  isSaving: boolean;
}

export default function TeamForm({ member, onSave, isSaving }: TeamFormProps) {
  const [form, setForm] = useState<TeamData>(member || emptyMember);
  const [tagInput, setTagInput] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    setForm(member || emptyMember);
    setErrors({});
  }, [member]);

  function set(field: keyof TeamData, value: unknown) {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  }

  function handleTagKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if ((e.key === "Enter" || e.key === ",") && tagInput.trim()) {
      e.preventDefault();
      if (!form.skills.includes(tagInput.trim())) {
        set("skills", [...form.skills, tagInput.trim()]);
      }
      setTagInput("");
    }
  }

  function removeTag(tag: string) {
    set(
      "skills",
      form.skills.filter((t) => t !== tag)
    );
  }

  function validate(): boolean {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = "Name is required";
    if (!form.role.trim()) errs.role = "Role is required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  function handleSave() {
    if (!validate()) return;
    onSave(form);
  }

  useEffect(() => {
    (window as unknown as Record<string, () => void>).__teamFormSave =
      handleSave;
    return () => {
      delete (window as unknown as Record<string, unknown>).__teamFormSave;
    };
  });

  void isSaving;

  const inputClass =
    "w-full px-3 py-2 rounded-lg bg-[#080B14] border border-[rgba(255,255,255,0.08)] text-[#F0F0F8] placeholder-[#6B7280] text-sm focus:outline-none focus:border-[#7C3AED] transition-colors";

  return (
    <div className="space-y-5">
      <div>
        <label className="block text-sm font-medium text-[#9CA3AF] mb-1">
          Name *
        </label>
        <input
          className={inputClass}
          value={form.name}
          onChange={(e) => set("name", e.target.value)}
          placeholder="Full name"
        />
        {errors.name && (
          <p className="text-xs text-red-400 mt-1">{errors.name}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-[#9CA3AF] mb-1">
          Role *
        </label>
        <input
          className={inputClass}
          value={form.role}
          onChange={(e) => set("role", e.target.value)}
          placeholder="e.g. Full Stack Developer"
        />
        {errors.role && (
          <p className="text-xs text-red-400 mt-1">{errors.role}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-[#9CA3AF] mb-1">
          Bio
        </label>
        <textarea
          className={inputClass}
          rows={3}
          value={form.bio}
          onChange={(e) => set("bio", e.target.value)}
          placeholder="Short bio"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-[#9CA3AF] mb-1">
          Avatar URL
        </label>
        <input
          className={inputClass}
          value={form.avatarUrl}
          onChange={(e) => set("avatarUrl", e.target.value)}
          placeholder="https://..."
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-[#9CA3AF] mb-1">
          Skills
        </label>
        <div className="flex flex-wrap gap-1.5 mb-2">
          {form.skills.map((tag) => (
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
          placeholder="Type and press Enter"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-[#9CA3AF] mb-1">
          LinkedIn URL
        </label>
        <input
          className={inputClass}
          value={form.linkedinUrl}
          onChange={(e) => set("linkedinUrl", e.target.value)}
          placeholder="https://linkedin.com/in/..."
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-[#9CA3AF] mb-1">
          Twitter URL
        </label>
        <input
          className={inputClass}
          value={form.twitterUrl}
          onChange={(e) => set("twitterUrl", e.target.value)}
          placeholder="https://twitter.com/..."
        />
      </div>
    </div>
  );
}
