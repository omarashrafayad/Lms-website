"use client";

import { usePathname } from "next/navigation";
import { Footer } from "@/features/main/home/components/footer";
import { Navbar } from "@/features/main/home/components/navbar";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHome = pathname === "/";

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
