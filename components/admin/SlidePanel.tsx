"use client";

import { X, Loader2 } from "lucide-react";

interface SlidePanelProps {
  isOpen: boolean;
  title: string;
  onClose: () => void;
  onSave: () => void;
  isSaving: boolean;
  children: React.ReactNode;
}

export default function SlidePanel({
  isOpen,
  title,
  onClose,
  onSave,
  isSaving,
  children,
}: SlidePanelProps) {
  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={onClose}
        />
      )}
      <div
        className={`fixed right-0 top-0 h-full w-full max-w-lg bg-[#0E1220] border-l border-[rgba(255,255,255,0.08)] z-50 flex flex-col transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-[rgba(255,255,255,0.08)] shrink-0">
          <h2 className="text-lg font-display font-bold text-[#F0F0F8]">
            {title}
          </h2>
          <button
            onClick={onClose}
            className="text-[#6B7280] hover:text-[#F0F0F8] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">{children}</div>

        <div className="flex gap-3 justify-end px-6 py-4 border-t border-[rgba(255,255,255,0.08)] shrink-0">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-sm font-medium text-[#9CA3AF] hover:bg-white/5 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onSave}
            disabled={isSaving}
            className="px-4 py-2 rounded-lg text-sm font-medium bg-[#7C3AED] text-white hover:bg-[#6D28D9] disabled:opacity-50 transition-colors flex items-center gap-2"
          >
            {isSaving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Saving...
              </>
            ) : (
              "Save"
            )}
          </button>
        </div>
      </div>
    </>
  );
}
