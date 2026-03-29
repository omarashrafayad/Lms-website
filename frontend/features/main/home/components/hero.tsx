"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Play, Calendar, Mail } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { useLocale } from "next-intl";
import { motion } from "framer-motion";

export function Hero() {
  const t = useTranslations("hero");
  const locale = useLocale();

  return (
    <section className="relative overflow-hidden bg-primary pb-24 pt-32 text-white">
      <div className="container mx-auto px-6 md:px-12 lg:px-24">
        <div className="flex flex-col items-center lg:flex-row">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.0, ease: "easeOut", delay: 0.2 }}
            className="z-10 w-full space-y-8 lg:w-1/2 rtl:text-right text-left"
          >
            <h1 className="text-5xl font-bold leading-tight md:text-6xl">
              <span className="text-orange-400">{t("studying")}</span> {t("title").replace(t("studying"), "")}
            </h1>
            <p className="max-w-md text-lg text-white/80">
              {t("subtitle")}
            </p>
            <div className="flex flex-wrap items-center gap-6">
              <Button className="h-14 rounded-full bg-white/20 px-10 text-lg font-semibold backdrop-blur-md hover:bg-white/30">
                 <Link href="/courses">{t("joinFree")}</Link>
              </Button>
              <button className="flex items-center space-x-3 rtl:space-x-reverse text-lg font-medium transition hover:opacity-80">
                <div className={`flex h-14 w-14 items-center justify-center rounded-full bg-white text-primary shadow-xl ${locale === "ar" ? "ml-4 flex-row-reverse" : ""}`}>
                  <Play className="fill-current"/>
                </div>
                <Link href="/about-us">{t("watchHow")}</Link>
              </button>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.5 }}
            className="relative mt-16 w-full lg:mt-0 lg:w-1/2"
          >
            <div className="relative mx-auto max-w-lg">
              <div className="relative h-[500px] w-full overflow-hidden rounded-3xl md:h-[600px]">
                <Image
                  src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2670&auto=format&fit=crop"
                  alt="Student"
                  fill
                  className="object-cover"
                />
              </div>

              <div className="absolute -left-8 2 top-1/4 animate-bounce rounded-2xl bg-white/90 p-4 shadow-2xl backdrop-blur-md md:-left-12 max-md:-left-5">
                <div className="flex items-center space-x-3 rtl:space-x-reverse text-slate-900">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/20">
                    <Calendar className="text-primary" size={20} />
                  </div>
                  <div className="text-left rtl:text-right">
                    <p className="text-sm font-bold text-gray-800">{"250k"}</p>
                    <p className="text-[10px] text-gray-500">{t("students")}</p>
                  </div>
                </div>
              </div>

              <div className="absolute max-md:hidden -right-8 top-1/2 animate-pulse rounded-2xl bg-white/90 p-4 shadow-2xl backdrop-blur-md md:-right-12 rtl:right-auto ">
                <div className="flex items-center space-x-3 rtl:space-x-reverse text-slate-900">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-400/20">
                    <Mail className="text-orange-400" size={20} />
                  </div>
                  <div className="text-left rtl:text-right">
                    <p className="text-xs font-bold text-gray-800">{t("congratulations")}</p>
                    <p className="text-[10px] text-gray-500">{t("admission")}</p>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-6 left-1/2 w-64 -translate-x-1/2 rounded-2xl bg-white/90 p-4 shadow-2xl backdrop-blur-md">
                <div className="flex items-center space-x-3 rtl:space-x-reverse text-slate-900">
                  <div className="h-10 w-10 overflow-hidden rounded-full">
                    <Image src="https://i.pravatar.cc/150?u=1" alt="User" width={40} height={40} />
                  </div>
                  <div className="flex-1 text-left rtl:text-right">
                    <p className="text-xs font-bold text-gray-800">{t("class")}</p>
                    <p className="text-[10px] text-gray-500">{t("time")}</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
