"use client";

import { usePathname } from "next/navigation";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHome = pathname === "/en" || pathname === "/ar";

  return (
    <>
      <Navbar />
      <main className={isHome ? "" : "pt-24"}>
        {children}
      </main>
      <Footer />
    </>
  );
}
