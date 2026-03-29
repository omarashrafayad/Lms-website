"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/routing";
import { motion } from "framer-motion";

export function WhatIsTOTC() {
  const t = useTranslations("whatIs");
  const locale = useLocale();

  return (
    <section className="py-24 bg-background transition-all duration-300 max-md:py-12">
      <div className="container mx-auto px-6 text-center lg:px-24">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 1.2, ease: "easeOut" }}
        >
            <h2 className="text-3xl font-bold md:text-4xl text-foreground">
              {t("title")} <span className="text-primary">{t("totc")}</span>
            </h2>
            <p className="mx-auto mt-6 max-w-4xl text-lg text-muted-foreground leading-relaxed rtl:text-center text-center">
              {t("description")}
            </p>
        </motion.div>

        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.4, ease: "easeOut" }}
            className="relative h-[400px] overflow-hidden rounded-3xl group"
          >
            <Image
              src="https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=2671&auto=format&fit=crop"
              alt="Instructor"
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
             <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center p-8">
              <h3 className="text-3xl font-bold text-white uppercase tracking-wider">{t("forInstructors")}</h3>
              <Button className="mt-6 rounded-full border-white text-white bg-transparent border hover:bg-white hover:text-black px-8 h-12">
                <Link href="/courses">{t("startClass")}</Link>
              </Button>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.7, ease: "easeOut" }}
            className="relative h-[400px] overflow-hidden rounded-3xl group"
          >
            <Image
              src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2671&auto=format&fit=crop"
              alt="Students"
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center p-8">
              <h3 className="text-3xl font-bold text-white uppercase tracking-wider">{t("forStudents")}</h3>
              <Button className="mt-6 rounded-full bg-cyan-500 text-white hover:bg-cyan-600 px-8 h-12 border-none">
                <Link href="/courses">{t("enterCode")}</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
