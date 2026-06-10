"use client";

import { useState, useEffect } from "react";
import { Star } from "lucide-react";

interface TestimonialData {
  _id?: string;
  clientName: string;
  clientRole: string;
  clientCompany: string;
  clientAvatarUrl: string;
  content: string;
  rating: number;
}

const emptyTestimonial: TestimonialData = {
  clientName: "",
  clientRole: "",
  clientCompany: "",
  clientAvatarUrl: "",
  content: "",
  rating: 5,
};

interface TestimonialFormProps {
  testimonial: TestimonialData | null;
  onSave: (data: TestimonialData) => void;
  isSaving: boolean;
}

export default function TestimonialForm({
  testimonial,
  onSave,
  isSaving,
}: TestimonialFormProps) {
  const [form, setForm] = useState<TestimonialData>(
    testimonial || emptyTestimonial
  );
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    setForm(testimonial || emptyTestimonial);
    setErrors({});
  }, [testimonial]);

  function set(field: keyof TestimonialData, value: unknown) {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  }

  function validate(): boolean {
    const errs: Record<string, string> = {};
    if (!form.clientName.trim()) errs.clientName = "Client name is required";
    if (!form.content.trim()) errs.content = "Content is required";
    if (form.content.trim().length < 20)
      errs.content = "Content must be at least 20 characters";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  function handleSave() {
    if (!validate()) return;
    onSave(form);
  }

  useEffect(() => {
    (window as unknown as Record<string, () => void>).__testimonialFormSave =
      handleSave;
    return () => {
      delete (window as unknown as Record<string, unknown>)
        .__testimonialFormSave;
    };
  });

  void isSaving;

  const inputClass =
    "w-full px-3 py-2 rounded-lg bg-[#080B14] border border-[rgba(255,255,255,0.08)] text-[#F0F0F8] placeholder-[#6B7280] text-sm focus:outline-none focus:border-[#7C3AED] transition-colors";

  return (
    <div className="space-y-5">
      <div>
        <label className="block text-sm font-medium text-[#9CA3AF] mb-1">
          Client Name *
        </label>
        <input
          className={inputClass}
          value={form.clientName}
          onChange={(e) => set("clientName", e.target.value)}
          placeholder="Client name"
        />
        {errors.clientName && (
          <p className="text-xs text-red-400 mt-1">{errors.clientName}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-[#9CA3AF] mb-1">
          Client Role
        </label>
        <input
          className={inputClass}
          value={form.clientRole}
          onChange={(e) => set("clientRole", e.target.value)}
          placeholder="e.g. CEO"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-[#9CA3AF] mb-1">
          Company
        </label>
        <input
          className={inputClass}
          value={form.clientCompany}
          onChange={(e) => set("clientCompany", e.target.value)}
          placeholder="Company name"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-[#9CA3AF] mb-1">
          Avatar URL
        </label>
        <input
          className={inputClass}
          value={form.clientAvatarUrl}
          onChange={(e) => set("clientAvatarUrl", e.target.value)}
          placeholder="https://..."
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-[#9CA3AF] mb-1">
          Testimonial *
        </label>
        <textarea
          className={inputClass}
          rows={4}
          value={form.content}
          onChange={(e) => set("content", e.target.value)}
          placeholder="What the client said about your work..."
        />
        {errors.content && (
          <p className="text-xs text-red-400 mt-1">{errors.content}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-[#9CA3AF] mb-1">
          Rating
        </label>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((n) => (
            <button key={n} onClick={() => set("rating", n)}>
              <Star
                className={`w-6 h-6 transition-colors ${
                  n <= form.rating
                    ? "fill-[#D4A853] text-[#D4A853]"
                    : "text-[#6B7280]"
                }`}
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
