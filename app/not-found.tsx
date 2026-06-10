import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-[#080B14] px-4">
      <div className="text-center">
        <h1
          className="font-display font-bold gradient-text leading-none"
          style={{ fontSize: "clamp(80px, 15vw, 120px)" }}
        >
          404
        </h1>
        <h2 className="text-2xl font-display font-bold text-[#F0F0F8] mt-4">
          Page not found
        </h2>
        <p className="text-[#9CA3AF] text-sm mt-2 mb-8">
          This page doesn&apos;t exist or was moved.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#7C3AED] text-white text-sm font-medium hover:bg-[#6D28D9] transition-colors"
        >
          ← Back to Home
        </Link>
      </div>
    </main>
  );
}
