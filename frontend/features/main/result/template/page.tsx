"use client";

import { Button } from "@/components/ui/button";
import { CheckCircle2, XCircle, RotateCcw, Home, Award, Loader2 } from "lucide-react";
import { Link } from "@/i18n/routing";
import { useMyResults } from "../hooks/useResult";
import EmptyState from "@/components/ui/EmptyState";
import { cn } from "@/lib/utils";
import { useTranslations, useLocale } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";

export default function ResultPage() {
  const t = useTranslations("result");
  const locale = useLocale();
  const { data: resultsData, isLoading } = useMyResults();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  const results = resultsData?.data || [];
  const latestResult = results[0];

  if (!latestResult) {
    return (
      <div className="bg-muted/30 min-h-screen py-24 flex items-center justify-center">
        <div className="text-center space-y-6 w-full max-w-md bg-card rounded-[2rem] p-10 shadow-xl border border-border">
          <EmptyState icon={Award} title={t("noResults")} description={t("noResultsDesc")} actionLabel={t("goToExams")} actionHref="/exams" />
        </div>
      </div>
    );
  }

  const stats = [
    { label: t("correctAnswers"), value: (latestResult.correctAnswers ?? 0).toString(), icon: <CheckCircle2 className="text-emerald-500" />, sub: `/ ${latestResult.totalQuestions || 0} ${t("questions")}` },
    { label: t("pointsEarned"), value: (latestResult.score ?? 0).toString(), icon: <Award className="text-amber-500" />, sub: `/ 100 ${t("total")}` },
    { label: t("wrongAnswers"), value: (latestResult.wrongAnswers ?? 0).toString(), icon: <XCircle className="text-rose-500" />, sub: t("checkMistakes") },
  ];

  const isPassed = latestResult.status === "pass";

  return (
    <div className="bg-muted/30 min-h-screen py-24">
      <div className="container mx-auto px-6 lg:px-24">
        <motion.div 
          initial={{ opacity: 0, y: 40, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
          className="max-w-4xl mx-auto"
        >
          {/* Result Card */}
          <div className="bg-card rounded-[3.5rem] shadow-2xl overflow-hidden border border-border">
            {/* Header Section */}
            <div className={cn("p-12 lg:p-20 text-center text-white space-y-6 relative overflow-hidden", isPassed ? "bg-emerald-500" : "bg-rose-500")}>
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6, duration: 1.0, type: "spring", stiffness: 50 }}
                className="relative z-10 space-y-4"
              >
                <h1 className="text-4xl lg:text-5xl font-black uppercase tracking-tighter">{isPassed ? t("congratulations") : t("keepTrying")}</h1>
                <p className="text-cyan-50 font-bold text-lg">
                  {t("resultStatus", { status: isPassed ? t("passed") : t("failed"), title: latestResult.exam?.title || t("exam") })}
                </p>
              </motion.div>
              {/* Decorative circles */}
              <div className="absolute top-0 right-0 h-40 w-40 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 h-24 w-24 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />
            </div>

            {/* Score Circle Section */}
            <div className="p-12 lg:p-20 -mt-24 relative z-20">
              <div className="bg-card rounded-[2.5rem] shadow-2xl p-10 flex flex-col items-center border border-border">
                <div className="relative h-48 w-48 flex items-center justify-center mb-10">
                  <svg className="h-full w-full rotate-[-90deg]">
                    <circle cx="96" cy="96" r="88" className="stroke-border fill-none" strokeWidth="12" />
                    <motion.circle 
                      initial={{ strokeDashoffset: 552.92 }}
                      animate={{ strokeDashoffset: 552.92 - (552.92 * (latestResult.score / 100)) }}
                      transition={{ duration: 2.5, ease: "easeInOut", delay: 1.0 }}
                      cx="96" 
                      cy="96" 
                      r="88" 
                      className={cn("fill-none", isPassed ? "stroke-emerald-400" : "stroke-rose-400")} 
                      strokeWidth="12" 
                      strokeDasharray="552.92" 
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <motion.span 
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 1.8, duration: 0.8 }}
                      className="text-5xl font-black text-foreground"
                    >{latestResult.score}%</motion.span>
                    <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{t("yourScore")}</span>
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-8 pt-10 border-t border-border rtl:flex-row-reverse">
                  {stats.map((s, i) => (
                    <motion.div 
                      key={i} 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 2.2 + (i * 0.2) }}
                      className="text-center space-y-3"
                    >
                      <div className="mx-auto h-12 w-12 rounded-2xl bg-muted flex items-center justify-center">
                        {s.icon}
                      </div>
                      <div>
                        <p className="text-3xl font-black text-foreground">{s.value}</p>
                        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mt-1">{s.label}</p>
                        <p className="text-[9px] font-bold text-muted-foreground/60 mt-1">{s.sub}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Performance Message */}
              <div className="mt-12 text-center max-w-2xl mx-auto space-y-6">
                <h3 className="text-2xl font-bold text-foreground tracking-tight">{isPassed ? t("greatJob") : t("dontGiveUp")}</h3>
                <p className="text-muted-foreground leading-relaxed font-medium">
                  {isPassed ? t("passMessage") : t("failMessage")}
                </p>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap flex-col sm:flex-row items-center justify-center gap-6 mt-16 pt-12 border-t border-border rtl:flex-row-reverse">
                <Link href="/exams" className="w-full sm:w-auto">
                  <button className="w-full flex items-center justify-center gap-3 px-6 sm:px-10 py-3 sm:py-5 rounded-2xl bg-card border-2 border-border text-foreground font-bold hover:bg-muted transition cursor-pointer rtl:flex-row-reverse">
                    <RotateCcw size={18} className="rtl:rotate-180" /> {t("retake")}
                  </button>
                </Link>
                <Link href="/" className="w-full sm:w-auto">
                  <Button className="w-full bg-primary hover:bg-primary/90 text-white rounded-2xl px-6 sm:px-12 h-12 sm:h-16 font-black uppercase tracking-widest text-base sm:text-lg shadow-xl shadow-primary/30 cursor-pointer rtl:flex-row-reverse">
                    {t("backHome")} <Home size={18} className="ml-2 rtl:ml-0 rtl:mr-2" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
