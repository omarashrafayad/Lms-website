"use client";

import React, { useState } from "react";
import { useAuthStore } from "@/stores/useAuthStore";
import { logoutAction } from "@/features/auth/api/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import MobileMenu from "./mobileMenu";
import { LanguageSwitcher } from "@/components/shared/LanguageSwitcher";
import { useTranslations, useLocale } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/routing";
import { LogOut, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const t = useTranslations("navbar");
  const locale = useLocale();
  const { user, token, logout } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logoutAction();
    logout();
    router.push("/auth");
  };
  type AppRoute = "/" | "/courses" | "/chat" | "/exams" | "/dashboard";
  const navLinks: { href: AppRoute; label: string }[] = [
    { href: "/", label: t("home") },
    { href: "/courses", label: t("courses") },
    ...(user?.role === "admin"
      ? ([{ href: "/dashboard", label: t("Dashboard") }] as const)
      : []),
    { href: "/chat", label: t("chat") },
    { href: "/exams", label: t("exams") },
  ];

  return (
    <>
      <nav
        className="fixed top-0 z-50 w-full flex items-center justify-between px-6 py-4 md:px-12 lg:px-24 bg-primary shadow-md backdrop-blur supports-backdrop-filter:bg-primary/90 transition-all duration-300"
        dir={locale === "ar" ? "rtl" : "ltr"}
      >
        <div className="flex items-center gap-2">
          <Link
            href="/"
            className="flex h-10 w-12 items-center justify-center rounded-lg bg-white/20 shadow-lg backdrop-blur-sm"
          >
            <span
              className={
                locale === "ar"
                  ? "text-lg font-bold text-white"
                  : "text-xl font-bold text-white uppercase"
              }
            >
              {t("brand")}
            </span>
          </Link>
        </div>

        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`text-sm font-medium transition-colors hover:text-white ${pathname === link.href ? "text-white underline underline-offset-4" : "text-white/90"}`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <LanguageSwitcher />
          </div>

          {token && user ? (
            <div className="hidden md:flex items-center gap-4">
              <Link
                href="/profile"
                className="flex items-center gap-2 group transition-all"
              >
                <Avatar className="h-10 w-10 border-2 border-white/20 group-hover:border-white transition-all">
                  <AvatarImage src={user.profileImg} alt={user.name} />
                  <AvatarFallback className="bg-primary/20 text-white font-bold">
                    {user.name
                      ?.split(" ")
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <span className="hidden sm:inline text-sm font-medium text-white group-hover:text-white/80">
                  {user.name}
                </span>
              </Link>
              <button
                onClick={handleLogout}
                className={`p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors ${locale === "ar" ? "rotate-180" : ""}`}
                title={t("logout")}
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-4">
              <Link
                href="/auth"
                className="rounded-full px-8 text-sm font-medium text-white hover:bg-white/10 flex items-center h-10 transition-colors"
              >
                {t("login")}
              </Link>
            </div>
          )}
          <Button
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            aria-label="Toggle menu"
            variant="navIcon"
            size="icon"
            className="h-10 w-10"
          >
            {isMobileMenuOpen ? (
              <X className="w-7 h-7" />
            ) : (
              <Menu className="w-7 h-7" />
            )}
          </Button>
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
