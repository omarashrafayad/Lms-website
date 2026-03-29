"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";
import { useState } from "react";
import { toast } from "sonner";


export function Footer() {
  const t = useTranslations("footer");
  const [message, setMessage] = useState("");

  return (
    <footer className="bg-slate-900 dark:bg-black pt-24 pb-12 text-white/70">
      <div className="container mx-auto px-6 lg:px-24">
        <div className="flex flex-col items-center justify-center text-center space-y-8 mb-20">
          <div className="flex items-center gap-6 divide-x divide-slate-700 rtl:divide-x-reverse">
            <div className="flex items-center gap-3">
              <div className="border-2 border-primary h-12 w-12 flex items-center justify-center rotate-45">
                <span className="text-xl font-bold text-white -rotate-45">TOTC</span>
              </div>
            </div>
            <div className="pl-6 rtl:pl-0 rtl:pr-6 font-bold text-slate-400 tracking-wider">
              {t("zoom")}
            </div>
          </div>

          <h3 className="text-2xl font-bold text-white tracking-widest uppercase">
            {t("subscribeTitle")}
          </h3>

          <div className="flex w-full max-w-lg items-center gap-4 bg-transparent border border-slate-700 rounded-full p-1 pl-6 rtl:pl-1 rtl:pr-6">
            <input
              type="email"
              placeholder={t("emailPlaceholder")}
              className="bg-transparent border-none outline-none flex-1 text-white placeholder:text-slate-500 text-sm rtl:text-right"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              
            />
            <Button className="rounded-full bg-cyan-400 text-white font-bold px-8 h-12 hover:bg-cyan-500 border-none"
            disabled={message.length === 0}
            onClick={()=>toast.success(t("messageSent")) && setMessage("")}>
              {t("subscribe")}
            </Button>
          </div>
        </div>

        <div className="flex flex-col items-center gap-6 border-t border-slate-800 pt-12">
          <div className="flex gap-8 text-sm font-medium">
            <Link href="/" className="hover:text-white transition-colors">
              {t("home")}
            </Link>
            <span className="text-slate-700">|</span>
            <Link href="/courses" className="hover:text-white transition-colors">
              {t("courses")}
            </Link>
            <span className="text-slate-700">|</span>
            <Link href="/exams" className="hover:text-white transition-colors">
              {t("exams")}
            </Link>
          </div>
          <p className="text-sm font-medium">© 2026 {t("tech")}</p>
        </div>
      </div>
    </footer>
  );
}
