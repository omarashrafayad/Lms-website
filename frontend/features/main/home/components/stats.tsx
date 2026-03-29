"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

export function Stats() {
  const t = useTranslations("stats");

  const stats = [
    { value: "15K+", label: t("students") },
    { value: "75%", label: t("success") },
    { value: "35", label: t("questions") },
    { value: "26", label: t("experts") },
    { value: "16", label: t("years") },
  ];

  return (
    <section className="py-20 bg-background overflow-hidden">
      <div className="container mx-auto px-6 text-center lg:px-24">
        <motion.h2 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.0, ease: "easeOut" }}
          className="text-4xl font-bold text-foreground transition-colors"
        >
          {t("title")}
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="mx-auto mt-4 max-w-3xl text-muted-foreground transition-colors"
        >
          {t("description")}
        </motion.p>

        <div className="mt-16 grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-5">
          {stats.map((stat, idx) => (
            <motion.div 
              key={idx} 
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 + (idx * 0.2), type: "spring", stiffness: 80 }}
              className="space-y-2"
            >
              <p className="text-5xl font-bold bg-gradient-to-br from-primary to-primary/60 bg-clip-text text-transparent">
                {stat.value}
              </p>
              <p className="text-lg font-medium text-muted-foreground transition-colors">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
