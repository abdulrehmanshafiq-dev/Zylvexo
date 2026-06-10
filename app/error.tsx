"use client";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="min-h-screen flex items-center justify-center bg-[#080B14] px-4">
      <div className="text-center max-w-md">
        <h1 className="text-3xl font-display font-bold text-[#F0F0F8] mb-3">
          Something went wrong
        </h1>
        <p className="text-[#9CA3AF] text-sm mb-8">
          An unexpected error occurred. Please try again.
        </p>
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={reset}
            className="px-6 py-2.5 rounded-xl bg-[#7C3AED] text-white text-sm font-medium hover:bg-[#6D28D9] transition-colors"
          >
            Try Again
          </button>
          <a
            href="/"
            className="px-6 py-2.5 rounded-xl border border-white/20 text-[#9CA3AF] text-sm font-medium hover:bg-white/5 transition-colors"
          >
            Back to Home
          </a>
        </div>
      </div>
    </main>
  );
}
