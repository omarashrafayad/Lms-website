"use client";

import { X, User, LogIn, Home, BookOpen, MessageSquare, FileText, UsbIcon, Info } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { Link } from "@/i18n/routing";
import { useLocale, useTranslations } from "next-intl";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  token: string | null;
  user: any;
  navLinks: { href: string; label: string }[];
}

export default function MobileMenu({ isOpen, onClose, token, user, navLinks }: MobileMenuProps) {
  const t = useTranslations("navbar");
  const pathname = usePathname();
  const locale = useLocale();

  const getIcon = (href: string) => {
    switch (href) {
      case "/": return <Home className="size-5" />;
      case "/courses": return <BookOpen className="size-5" />;
      case "/chat": return <MessageSquare className="size-5" />;
      case "/dashboard": return <UsbIcon className="size-5" />;
      case "/exams": return <FileText className="size-5" />;
      case "/about": return <Info className="size-5" />;
      case "/profile": return <User className="size-5" />;
      default: return null;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-60 bg-black/60 backdrop-blur-sm md:hidden"
          />

          <motion.div
            initial={{ x: locale === "ar" ? "-100%" : "100%" }}
            animate={{ x: 0 }}
            exit={{ x: locale === "ar" ? "-100%" : "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className={`fixed inset-y-0 ${locale === "ar" ? "left-0" : "right-0"} z-70 w-[85%] max-w-[320px] bg-background shadow-2xl md:hidden flex flex-col overflow-hidden text-foreground`}
          >
            <div className="flex items-center justify-between p-5 border-b bg-primary/5">
              <div className="flex items-center gap-2 ">
                <div className="size-8 rounded-lg bg-primary flex items-center justify-center">
                  <span className="text-white font-bold">T</span>
                </div>
                <span className="font-bold text-lg tracking-tight text-primary">TOTC</span>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-muted rounded-full transition-colors active:scale-90"
              >
                <X className="size-6 text-muted-foreground" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-6 space-y-8">
              <div className="space-y-1">
                <p className="px-4 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground mb-3">
                  {locale === "en" ? "Navigation" : "التنقل"}
                </p>
                {navLinks.map((link, i) => {
                  const isActive = pathname === link.href;
                  return (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: locale === "ar" ? -20 : 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <Link
                        href={link.href}
                        onClick={onClose}
                        className={`flex items-center gap-4 px-4 py-4 rounded-xl text-base font-semibold transition-all duration-300  ${isActive
                          ? "bg-primary text-white shadow-lg shadow-primary/25"
                          : "text-muted-foreground hover:bg-muted hover:translate-x-1 rtl:hover:-translate-x-1"
                          }`}
                      >
                        {getIcon(link.href)}
                        {link.label}
                      </Link>
                    </motion.div>
                  );
                })}
              </div>

              <div className="space-y-1 pb-4">
                <p className="px-4 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground mb-3 rtl:text-right">
                  {locale === "en" ? "Account" : "الحساب"}
                </p>
                <Link
                  href={token ? "/profile" : "/auth"}
                  onClick={onClose}
                  className="flex items-center gap-4 px-4 py-4 rounded-xl text-base font-semibold text-muted-foreground hover:bg-muted hover:translate-x-1 rtl:hover:-translate-x-1 transition-all"
                >
                  {token && user ? (
                    <>
                      <User className="size-5" />
                      {user.name}
                    </>
                  ) : (
                    <>
                      <LogIn className="size-5" />
                      {t("login")}
                    </>
                  )}
                </Link>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
