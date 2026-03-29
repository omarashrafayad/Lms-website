"use client";

import { useExams } from "../hooks/useExam";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Clock, BookOpen, Loader2, Play, Trophy, CheckCircle2 } from "lucide-react";
import EmptyState from "@/components/ui/EmptyState";
import { useTranslations, useLocale } from "next-intl";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import GlobalError from "@/components/shared/globalerror";
import { motion } from "framer-motion";

export default function ExamPage() {
    const t = useTranslations("exams");
    const locale = useLocale();
    const { data: examsData, isLoading,error } = useExams();

    if (isLoading) {
        return <LoadingSpinner/>
    }
    if(error){
        return <GlobalError error={error}/>
    }

    const exams = examsData?.data || [];

    return (
        <div className="bg-background min-h-screen py-20 transition-colors duration-300">
            <div className="container mx-auto px-6 lg:px-24">
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 , delay: 0.3}}
                    className="mb-12 text-left rtl:text-right"
                >
                    <h1 className="text-4xl font-bold text-foreground tracking-tight">{t("availableExams")}</h1>
                    <p className="text-muted-foreground mt-2 font-medium">{t("testKnowledge")}</p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 rtl:flex-row-reverse">
                    {exams.map((exam, idx) => (
                        <motion.div 
                            key={exam._id} 
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: (idx % 3) * 0.2 }}
                            whileHover={{ y: -8 }}
                            className="bg-card rounded-[2rem] p-8 shadow-xl border border-border flex flex-col h-full group text-left rtl:text-right transition-all duration-300 hover:shadow-2xl hover:border-primary/20"
                        >
                            <div className="h-14 w-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors duration-300 text-primary rtl:ml-auto">
                                <BookOpen size={28} />
                            </div>
                            <h3 className="text-xl font-bold text-foreground mb-4">
                                {t(`examContent.${exam._id}.title`, { defaultValue: exam.title })}
                            </h3>
                            <p className="text-sm text-muted-foreground mb-8 line-clamp-3">
                                {t(`examContent.${exam._id}.description`, { defaultValue: exam.description || t("examDefaultDesc") })}
                            </p>
                            <div className="mt-auto space-y-6">
                                <div className="grid grid-cols-2 gap-y-3 text-[10px] font-bold uppercase tracking-widest text-muted-foreground rtl:flex-row-reverse">
                                    <span className="flex items-center gap-2 rtl:flex-row-reverse">
                                        <Clock size={14} className="text-primary" />
                                        {exam.duration} {t("min")}
                                    </span>
                                    <span className="flex items-center gap-2 rtl:flex-row-reverse">
                                        <BookOpen size={14} className="text-primary" />
                                        {exam.questions?.length || 0} {t("ques")}
                                    </span>
                                    <span className="flex items-center gap-2 rtl:flex-row-reverse">
                                        <Trophy size={14} className="text-amber-500" />
                                        {exam.totalMarks || 100} {t("marks")}
                                    </span>
                                    <span className="flex items-center gap-2 rtl:flex-row-reverse">
                                        <CheckCircle2 size={14} className="text-green-500" />
                                        {exam.passingScore || 50} {t("pass")}
                                    </span>
                                </div>

                                <Link href={`/exams/${exam._id}`} className="block">
                                    <Button className="w-full bg-primary hover:bg-primary/90 text-white rounded-xl h-12 font-bold flex gap-2 cursor-pointer shadow-lg shadow-primary/20 rtl:flex-row-reverse">
                                        <Play size={16} fill="currentColor" className="rtl:rotate-180" /> {t("startExam")}
                                    </Button>
                                </Link>
                            </div>
                        </motion.div>
                    ))}

                    {exams.length === 0 && (
                        <div className="col-span-full py-20 bg-card rounded-[2rem] border border-dashed border-border text-center">
                            <EmptyState icon={BookOpen} title={t("noExams")} description={t("noExamsDesc")} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
