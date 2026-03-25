"use client";

import Link from "next/link";
import { useAuthStore } from "@/stores/useAuthStore";
import { logoutAction } from "@/features/auth/api/auth";
import { useRouter, usePathname } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogOut, User, Menu, X } from "lucide-react";
import React, { useState, useEffect } from "react";
import MobileMenu from "./mobileMenu";

export function Navbar() {
  const { user, token, logout } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();
  const [hydrated, setHydrated] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const handleLogout = async () => {
    await logoutAction();
    logout();
    router.push("/auth");
  };

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/courses", label: "Courses" },
    { href: "/chat", label: "Chat" },
    { href: "/exams", label: "Exams" },
    { href: "/about", label: "About Us" },
  ];

  if (!hydrated) return (
    <nav className="fixed top-0 z-50 w-full flex items-center justify-between px-6 py-4 md:px-12 lg:px-24 bg-primary backdrop-blur supports-[backdrop-filter]:bg-primary/90">
        <div className="flex items-center space-x-2">
            <Link href="/" className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/20 shadow-lg backdrop-blur-sm">
                <span className="text-xl font-bold text-white">TOTC</span>
            </Link>
        </div>
    </nav>
  );

  return (
    <>
      <nav className="fixed top-0 z-50 w-full flex items-center justify-between px-6 py-4 md:px-12 lg:px-24 bg-primary shadow-md backdrop-blur supports-[backdrop-filter]:bg-primary/90">
        <div className="flex items-center space-x-2">
          <Link href="/" className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/20 shadow-lg backdrop-blur-sm">
            <span className="text-xl font-bold text-white">TOTC</span>
          </Link>
        </div>
        
        <div className="hidden items-center space-x-8 md:flex">
          {navLinks.map((link) => (
            <Link 
                key={link.href} 
                href={link.href} 
                className={`text-sm font-medium transition-colors hover:text-white ${pathname === link.href ? "text-white underline underline-offset-4" : "text-white/90"}`}
            >
                {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center space-x-4">
          {token && user ? (
            <div className="hidden md:flex items-center gap-4">
              <Link href="/profile" className="flex items-center gap-2 group transition-all">
                <Avatar className="h-10 w-10 border-2 border-white/20 group-hover:border-white transition-all">
                  <AvatarImage src={user.profileImg} alt={user.name} />
                  <AvatarFallback className="bg-primary/20 text-white font-bold">
                    {user.name?.split(" ").map((n) => n[0]).join("").toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <span className="hidden sm:inline text-sm font-medium text-white group-hover:text-white/80">{user.name}</span>
              </Link>
              <button 
                onClick={handleLogout}
                className="p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
                title="Logout"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <div className="hidden md:flex items-center space-x-4">
              <Link href="/auth" className="rounded-full px-8 text-sm font-medium text-white hover:bg-white/10 flex items-center h-10 transition-colors">
                Login
              </Link>
              <Link href="/auth" className="rounded-full bg-white/20 px-8 text-sm font-medium text-white backdrop-blur-sm hover:bg-white/30 flex items-center h-10 transition-colors">
                Sign Up
              </Link>
            </div>
          )}

          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-lg bg-white/10 text-white hover:bg-white/20 md:hidden transition-all active:scale-95"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      <MobileMenu 
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        token={token}
        user={user}
        navLinks={navLinks}
      />
    </>
  );
}
