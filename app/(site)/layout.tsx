import ScrollToTop from "@/components/ui/ScrollToTop";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <ScrollToTop />
    </>
  );
}
