"use client";

export default function AdminError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center max-w-md">
        <h1 className="text-2xl font-display font-bold text-[#F0F0F8] mb-3">
          Something went wrong
        </h1>
        <p className="text-[#9CA3AF] text-sm mb-8">
          An error occurred in the admin panel.
        </p>
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={reset}
            className="px-6 py-2.5 rounded-xl bg-[#7C3AED] text-white text-sm font-medium hover:bg-[#6D28D9] transition-colors"
          >
            Try Again
          </button>
          <a
            href="/admin/dashboard"
            className="px-6 py-2.5 rounded-xl border border-white/20 text-[#9CA3AF] text-sm font-medium hover:bg-white/5 transition-colors"
          >
            Return to Dashboard
          </a>
        </div>
      </div>
    </div>
  );
}
