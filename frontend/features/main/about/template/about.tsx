"use client";

import { useTranslations } from "next-intl";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Target, History, Star, Lightbulb, Users } from "lucide-react";
import { motion, Variants } from "framer-motion";

export default function AboutPage() {
  const t = useTranslations("aboutUs");

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  return (
    <div className="min-h-screen bg-background transition-colors duration-300 pb-20 overflow-hidden">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden bg-primary pt-20">
        <motion.div 
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.2 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop')] bg-cover bg-center"
        ></motion.div>
        
        <div className="container relative z-10 text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge className="mb-6 bg-white/20 text-white border-none backdrop-blur-md px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.3em]">
              TOTC ACADEMY
            </Badge>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-8xl font-black text-white tracking-tighter uppercase mb-8 drop-shadow-2xl"
          >
            {t("title")}
          </motion.h1>
        </div>

        {/* Floating Shapes */}
        <motion.div 
          animate={{ scale: [1, 1.2, 1], x: [0, 50, 0] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute -bottom-24 -left-20 w-80 h-80 bg-white/10 rounded-full blur-3xl"
        ></motion.div>
        <motion.div 
          animate={{ scale: [1, 1.3, 1], y: [0, 40, 0] }}
          transition={{ duration: 12, repeat: Infinity, delay: 2 }}
          className="absolute -top-24 -right-20 w-80 h-80 bg-white/10 rounded-full blur-3xl"
        ></motion.div>
      </section>

      <div className="container mx-auto px-4 -mt-24 relative z-20">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {/* Mission Card */}
          <motion.div variants={itemVariants}>
            <Card className="h-full border-none shadow-2xl rounded-[3rem] bg-card/80 backdrop-blur-2xl hover:translate-y-[-12px] transition-all duration-500 overflow-hidden group">
              <CardContent className="p-12 text-center space-y-8 h-full flex flex-col justify-center">
                <div className="w-20 h-20 bg-primary/10 rounded-[2rem] flex items-center justify-center mx-auto text-primary rotate-6 group-hover:rotate-12 transition-transform duration-500">
                  <Target size={40} />
                </div>
                <h3 className="text-3xl font-black uppercase tracking-tight">{t("missionTitle")}</h3>
                <p className="text-muted-foreground leading-relaxed font-semibold text-lg">
                  {t("missionDesc")}
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Story Card */}
          <motion.div variants={itemVariants}>
            <Card className="h-full border-none shadow-2xl rounded-[3rem] bg-card/80 backdrop-blur-2xl hover:translate-y-[-12px] transition-all duration-500 md:mt-16 group overflow-hidden">
              <CardContent className="p-12 text-center space-y-8 h-full flex flex-col justify-center">
                <div className="w-20 h-20 bg-emerald-500/10 rounded-[2rem] flex items-center justify-center mx-auto text-emerald-500 -rotate-6 group-hover:-rotate-12 transition-transform duration-500">
                  <History size={40} />
                </div>
                <h3 className="text-3xl font-black uppercase tracking-tight">{t("storyTitle")}</h3>
                <p className="text-muted-foreground leading-relaxed font-semibold text-lg">
                  {t("storyDesc")}
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Excellence Card */}
          <motion.div variants={itemVariants}>
            <Card className="h-full border-none shadow-2xl rounded-[3rem] bg-card/80 backdrop-blur-2xl hover:translate-y-[-12px] transition-all duration-500 overflow-hidden group">
              <CardContent className="p-12 text-center space-y-8 h-full flex flex-col justify-center">
                <div className="w-20 h-20 bg-amber-500/10 rounded-[2rem] flex items-center justify-center mx-auto text-amber-500 rotate-12 group-hover:rotate-1 transition-transform duration-500">
                  <Shield size={40} />
                </div>
                <h3 className="text-3xl font-black uppercase tracking-tight">{t("values.excellence")}</h3>
                <p className="text-muted-foreground leading-relaxed font-semibold text-lg">
                  {t("excellenceDesc")}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        {/* Values Section */}
        <section className="mt-48 text-center space-y-24">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <Badge variant="outline" className="px-8 py-3 rounded-full border-primary/20 text-primary font-black uppercase tracking-[0.4em] text-[10px]">
              {t("principlesBadge")}
            </Badge>
            <h2 className="text-5xl md:text-8xl font-black tracking-tighter uppercase leading-[0.9]">
              {t("whyTitle")}
            </h2>
          </motion.div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16"
          >
            {[
              { icon: Users, title: t("communityTitle"), desc: t("communityDesc"), color: "bg-blue-500/10 text-blue-500" },
              { icon: Lightbulb, title: t("innovationTitle"), desc: t("innovationDesc"), color: "bg-purple-500/10 text-purple-500" },
              { icon: Star, title: t("qualityTitle"), desc: t("qualityDesc"), color: "bg-amber-500/10 text-amber-500" },
              { icon: Shield, title: t("trustTitle"), desc: t("trustDesc"), color: "bg-emerald-500/10 text-emerald-500" },
            ].map((value, idx) => (
              <motion.div key={idx} variants={itemVariants} className="space-y-6 group">
                <div className={`w-20 h-20 ${value.color} rounded-3xl flex items-center justify-center mx-auto transition-all duration-500 group-hover:scale-110 group-hover:rotate-12`}>
                  <value.icon size={32} />
                </div>
                <h4 className="text-2xl font-black uppercase tracking-tight">{value.title}</h4>
                <p className="text-muted-foreground text-base font-bold leading-relaxed px-4">
                  {value.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </section>
      </div>
    </div>
  );
}
