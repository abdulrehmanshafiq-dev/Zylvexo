import { Linkedin, Twitter, Instagram, Github, ArrowUpRight, Mail, MapPin } from "lucide-react";

const serviceLinks = [
  { label: "Web Development", href: "#services" },
  { label: "AI & Automation", href: "#services" },
  { label: "SEO", href: "#services" },
  { label: "Digital Marketing", href: "#services" },
];

const exploreLinks = [
  { label: "Solutions", href: "#solutions" },
  { label: "Our Work", href: "#portfolio" },
  { label: "Process", href: "#process" },
  { label: "AI Demo", href: "#contact" },
];

const socials = [
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Github, href: "#", label: "GitHub" },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-white/[0.06] overflow-hidden">
      {/* Top glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px bg-gradient-to-r from-transparent via-[#7C3AED]/60 to-transparent" />
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-[#7C3AED]/[0.07] blur-3xl rounded-full pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-5 pt-20 pb-8">
        <div className="grid grid-cols-2 md:grid-cols-12 gap-10 md:gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-5">
            <a href="#" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#7C3AED] to-[#A855F7] flex items-center justify-center font-display font-bold text-white shadow-lg shadow-violet-500/20">
                Z
              </div>
              <span className="font-display font-bold text-[#F2F1F8] tracking-[0.18em]">
                ZYLVEXO
              </span>
            </a>
            <p className="text-[#9CA0B3] text-sm leading-relaxed mt-5 max-w-sm">
              An AI-first digital agency building websites, automation systems,
              and growth engines that turn attention into revenue.
            </p>
            <div className="flex gap-2.5 mt-7">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="w-9 h-9 rounded-full border border-white/[0.08] flex items-center justify-center text-[#5F6577] hover:text-white hover:border-[#7C3AED]/60 hover:bg-[#7C3AED]/10 transition-all"
                >
                  <s.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div className="md:col-span-2">
            <p className="text-[11px] tracking-[0.25em] uppercase text-[#5F6577] font-semibold mb-5">
              Services
            </p>
            <ul className="space-y-3">
              {serviceLinks.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="text-sm text-[#9CA0B3] hover:text-[#F2F1F8] transition-colors"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Explore */}
          <div className="md:col-span-2">
            <p className="text-[11px] tracking-[0.25em] uppercase text-[#5F6577] font-semibold mb-5">
              Explore
            </p>
            <ul className="space-y-3">
              {exploreLinks.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="text-sm text-[#9CA0B3] hover:text-[#F2F1F8] transition-colors"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="col-span-2 md:col-span-3">
            <p className="text-[11px] tracking-[0.25em] uppercase text-[#5F6577] font-semibold mb-5">
              Get in touch
            </p>
            <a
              href="mailto:hello@zylvexo.com"
              className="flex items-center gap-2.5 text-sm text-[#9CA0B3] hover:text-[#F2F1F8] transition-colors"
            >
              <Mail className="w-4 h-4 text-[#7C3AED]" />
              hello@zylvexo.com
            </a>
            <p className="flex items-center gap-2.5 text-sm text-[#9CA0B3] mt-3">
              <MapPin className="w-4 h-4 text-[#7C3AED]" />
              Lahore, Pakistan — working worldwide
            </p>
            <a
              href="#contact"
              className="inline-flex items-center gap-1.5 mt-6 text-sm font-semibold text-[#A78BFA] hover:text-white transition-colors group"
            >
              Book a discovery call
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>
        </div>

        {/* Watermark */}
        <div className="relative h-[90px] md:h-[150px] mt-16 select-none pointer-events-none" aria-hidden="true">
          <span className="absolute left-1/2 -translate-x-1/2 bottom-[-20px] md:bottom-[-40px] font-display font-extrabold text-stroke whitespace-nowrap text-[24vw] md:text-[15vw] leading-none">
            ZYLVEXO
          </span>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/[0.06] pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-[#5F6577]">
            © {new Date().getFullYear()} Zylvexo. All rights reserved.
          </p>
          <p className="text-xs text-[#5F6577]">
            Engineered with <span className="text-[#7C3AED]">AI precision</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
