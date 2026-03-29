"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/routing";
import { useParams } from "next/navigation";
import { Globe } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTransition } from "react";

export function LanguageSwitcher() {
  const t = useTranslations("navbar");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const [isPending, startTransition] = useTransition();

  const toggleLanguage = () => {
    const nextLocale = locale === "en" ? "ar" : "en";
    
    startTransition(() => {
      // @ts-ignore
      router.replace(pathname, { locale: nextLocale });
    });
  };

  return (
    <button
      onClick={toggleLanguage}
      disabled={isPending}
      className={cn(
        "relative flex h-10 px-4 items-center justify-center gap-2 rounded-full transition-all duration-300",
        "bg-white/10 text-white hover:bg-white/20 active:scale-95 disabled:opacity-50",
        "dark:bg-white/10 dark:text-white dark:hover:bg-white/20 transition-all font-bold text-xs"
      )}
      aria-label="Toggle language"
    >
      <Globe size={16} className={cn(isPending && "animate-spin")} />
      <span>{locale === "en" ? "العربية" : "English"}</span>
    </button>
  );
}
