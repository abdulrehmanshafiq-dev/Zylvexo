const items = [
  "Skilled Team",
  "Modern Technologies",
  "Fast Delivery",
  "100% Satisfaction",
  "AI-First Approach",
  "Results Guaranteed",
];

export default function TrustBar() {
  const doubled = [...items, ...items];

  return (
    <section className="relative w-full border-y border-white/[0.06] bg-[#0A0D18]/40 py-5 overflow-hidden pause-on-hover">
      {/* Edge fades */}
      <div className="absolute left-0 inset-y-0 w-32 bg-gradient-to-r from-[#06070D] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 inset-y-0 w-32 bg-gradient-to-l from-[#06070D] to-transparent z-10 pointer-events-none" />

      <div
        className="flex items-center animate-scroll-left"
        style={{ width: "max-content", animationDuration: "40s" }}
      >
        {doubled.map((item, i) => (
          <span key={`${item}-${i}`} className="flex items-center shrink-0">
            <span className="text-[13px] uppercase tracking-[0.3em] text-[#9CA0B3] font-medium px-8">
              {item}
            </span>
            <span className="text-[#D4A853] text-xs">✦</span>
          </span>
        ))}
      </div>
    </section>
  );
}
