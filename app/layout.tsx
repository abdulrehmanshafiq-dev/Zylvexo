import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Zylvexo — AI-Powered Digital Agency",
    template: "%s | Zylvexo",
  },
  description:
    "AI-powered web development, automation, SEO, and digital marketing. We build systems that grow your business. Book a free discovery call.",
  keywords: [
    "AI agency Pakistan",
    "web development Lahore",
    "AI automation",
    "SEO agency",
    "digital marketing Pakistan",
    "Next.js agency",
  ],
  openGraph: {
    type: "website",
    siteName: "Zylvexo",
    title: "Zylvexo — AI-Powered Digital Agency",
    description:
      "AI-powered web development, automation, SEO, and digital marketing. We build systems that grow your business.",
    url: process.env.NEXT_PUBLIC_SITE_URL,
  },
  twitter: {
    card: "summary_large_image",
    title: "Zylvexo — AI-Powered Digital Agency",
    description:
      "AI-powered web development, automation, SEO, and digital marketing.",
  },
  robots: { index: true, follow: true },
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-body bg-background-primary text-text-primary antialiased">
        {children}
      </body>
    </html>
  );
}
