"use client";

import Image from "next/image";
import { Users, Layout } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { motion } from "framer-motion";

export function Features() {
  const t = useTranslations("features");
  const locale = useLocale();
  
  const featureList = [
    {
      title: t("ui.p1"),
      icon: <Layout className="text-blue-600" size={24} />,
    },
    {
      title: t("ui.p2"),
      icon: <Users className="text-orange-500" size={24} />,
    },
    {
      title: t("ui.p3"),
      icon: <Users className="text-purple-600" size={24} />,
    },
  ];

  return (
    <section className="py-24 bg-background overflow-hidden text-left rtl:text-right max-md:py-12">
      <div className="container mx-auto px-6 lg:px-24">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.0, ease: "easeOut", delay: 0.2 }}
          className="text-center mb-20"
        >
          <h2 className="text-3xl font-bold text-foreground md:text-4xl">
            {t("title")} <span className="text-primary">{t("subtitle")}</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            {t("desc")}
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row items-center gap-16 mb-32 rtl:lg:flex-row-reverse">
          <motion.div 
            initial={{ opacity: 0, x: locale === "ar" ? 50 : -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
            className="relative w-full lg:w-3/5"
          >
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl transition-transform duration-500 hover:scale-[1.02]">
              <Image
                src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2670&auto=format&fit=crop"
                alt="UI for Classroom"
                fill
                className="object-cover"
              />
            </div>
            <div className="absolute -top-10 -left-10 rtl:left-auto rtl:-right-10 h-32 w-32 bg-green-400 rounded-full -z-10 opacity-60"></div>
            <div className="absolute -bottom-5 -right-5 rtl:right-auto rtl:-left-5 h-20 w-20 bg-blue-500 rounded-full -z-10 opacity-30"></div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: locale === "ar" ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.5 }}
            className="w-full lg:w-2/5 space-y-6"
          >
            <h3 className="text-3xl font-bold text-foreground leading-tight">
              {t.rich("ui.title", {
                highlight: (chunks) => <span className="text-primary tracking-tight">{chunks}</span>
              })}
            </h3>
            <div className="space-y-6 mt-8">
              {featureList.map((item, idx) => (
                <div key={idx} className="flex items-start gap-4 rtl:flex-row-reverse">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-card shadow-lg border border-border">
                    {item.icon}
                  </div>
                  <p className="text-muted-foreground leading-relaxed font-medium rtl:text-right">{item.title}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="flex flex-col lg:flex-row-reverse items-center gap-16 mb-32 rtl:lg:flex-row">
          <motion.div 
            initial={{ opacity: 0, x: locale === "ar" ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
            className="relative w-full lg:w-1/2"
          >
            <div className="relative aspect-square rounded-full border-[1.5rem] border-border/50 p-8 overflow-hidden transition-all duration-700 hover:rotate-3">
              <Image
                src="https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=2671&auto=format&fit=crop"
                alt="Teacher Tools"
                fill
                className="object-cover scale-110"
              />
            </div>
            <div className="absolute top-1/2 -left-12 rtl:left-auto rtl:-right-12 -translate-y-1/2 h-24 w-24 bg-blue-100 dark:bg-zinc-800 rounded-2xl rotate-45 -z-10"></div>
            <div className="absolute bottom-4 right-12 rtl:right-auto rtl:left-12 h-6 w-6 bg-orange-400 rounded-full"></div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: locale === "ar" ? 50 : -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full lg:w-1/2 space-y-6"
          >
            <h3 className="text-3xl font-bold text-foreground leading-tight">
              {t.rich("tools.title", {
                highlight: (chunks) => <span className="text-primary tracking-tight">{chunks}</span>
              })}
            </h3>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {t("tools.desc")}
            </p>
          </motion.div>
        </div>
        <div className="flex flex-col lg:flex-row items-center gap-16 mb-32 rtl:lg:flex-row-reverse">
          <motion.div 
            initial={{ opacity: 0, x: locale === "ar" ? 50 : -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
            className="relative w-full lg:w-1/2"
          >
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl bg-card p-4 border border-border">
              <Image
                src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=2670&auto=format&fit=crop"
                alt="Assessments"
                fill
                className="object-cover"
              />
            </div>
            <div className="absolute -top-6 -right-6 rtl:right-auto rtl:-left-6 h-12 w-12 bg-pink-400 rounded-full flex items-center justify-center text-white font-bold shadow-lg">Q1</div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: locale === "ar" ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.6, ease: "easeOut" }}
            className="w-full lg:w-1/2 space-y-6"
          >
            <h3 className="text-3xl font-bold text-foreground leading-tight">
              {t.rich("assessments.title", {
                highlight: (chunks) => <span className="text-primary tracking-tight">{chunks}</span>
              })}
            </h3>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {t("assessments.desc")}
            </p>
          </motion.div>
        </div>

        <div className="flex flex-col lg:flex-row-reverse items-center gap-16 mb-32 rtl:lg:flex-row">
          <motion.div 
            initial={{ opacity: 0, x: locale === "ar" ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
            className="relative w-full lg:w-1/2"
          >
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl transition-transform duration-500 hover:scale-[1.02]">
              <Image
                src="https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=2670&auto=format&fit=crop"
                alt="Class Management"
                fill
                className="object-cover"
              />
            </div>
            <div className="absolute -left-10 rtl:left-auto rtl:-right-10 bottom-1/4 h-32 w-32 bg-blue-400/20 rounded-full blur-2xl"></div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: locale === "ar" ? 50 : -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.6, ease: "easeOut" }}
            className="w-full lg:w-1/2 space-y-6"
          >
            <h3 className="text-3xl font-bold text-foreground leading-tight">
              {t.rich("management.title", {
                highlight: (chunks) => <span className="text-primary tracking-tight">{chunks}</span>
              })}
            </h3>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {t("management.desc")}
            </p>
          </motion.div>
        </div>
        <div className="flex flex-col lg:flex-row items-center gap-16 rtl:lg:flex-row-reverse">
          <motion.div 
            initial={{ opacity: 0, x: locale === "ar" ? 50 : -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
            className="relative w-full lg:w-1/2"
          >
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=2670&auto=format&fit=crop"
                alt="Discussions"
                fill
                className="object-cover"
              />
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: locale === "ar" ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.6, ease: "easeOut" }}
            className="w-full lg:w-1/2 space-y-6"
          >
            <h3 className="text-3xl font-bold text-foreground leading-tight">
              {t.rich("discussions.title", {
                highlight: (chunks) => <span className="text-primary tracking-tight">{chunks}</span>
              })}
            </h3>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {t("discussions.desc")}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}