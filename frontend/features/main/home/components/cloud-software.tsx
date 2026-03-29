"use client";

import { FileText, Calendar, Users } from "lucide-react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

export function CloudSoftware() {
  const t = useTranslations("cloudSoftware");
  
  const cards = [
    {
      title: t("billing.title"),
      desc: t("billing.desc"),
      icon: <FileText className="text-white" size={32} />,
      color: "bg-blue-500",
    },
    {
      title: t("scheduling.title"),
      desc: t("scheduling.desc"),
      icon: <Calendar className="text-white" size={32} />,
      color: "bg-primary",
    },
    {
      title: t("tracking.title"),
      desc: t("tracking.desc"),
      icon: <Users className="text-white" size={32} />,
      color: "bg-cyan-500",
    },
  ];

  return (
    <section className="py-24 bg-muted/30 text-left rtl:text-right">
      <div className="container mx-auto px-6 text-center lg:px-24">
        <h2 className="text-3xl font-bold md:text-4xl text-foreground">
          {t("title")} <span className="text-primary">{t("subtitle")}</span>
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-muted-foreground ">
          {t("desc")}
        </p>

        <div className="mt-16 flex flex-wrap justify-center gap-12">
          {cards.map((card, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: idx * 0.3, ease: "easeOut" }}
              className="group relative rounded-3xl bg-card border border-border p-8 pt-16 shadow-xl transition-all hover:-translate-y-2 hover:shadow-2xl w-full md:w-[calc(33.333%-2rem)]"
            >
              <div
                className={`absolute -top-10 left-1/2 -translate-x-1/2 rounded-full p-6 shadow-lg ${card.color}`}
              >
                {card.icon}
              </div>
              <h3 className="text-xl font-bold text-foreground md:text-2xl">{card.title}</h3>
              <p className="mt-4 text-muted-foreground leading-relaxed line-clamp-3">{card.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
