"use client";

import { useMyResults } from "../../result/hooks/useResult";
import { useTranslations } from "next-intl";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, FileText, CheckCircle2, XCircle } from "lucide-react";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import EmptyState from "@/components/ui/EmptyState";

export default function ResultsSection() {
  const t = useTranslations("result");
  const tp = useTranslations("profile");
  const { data, isLoading } = useMyResults();

  if (isLoading) {
    return <LoadingSpinner/>
  }

  const results = data?.data || [];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-1">
        <h2 className="text-3xl font-extrabold tracking-tight dark:text-white">{tp("results")}</h2>
        <p className="text-muted-foreground dark:text-slate-400">Track your progress and review your past exam performances.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {results.length > 0 ? (
          results.map((result) => (
            <Card key={result._id} className="overflow-hidden border-2 dark:border-slate-800 hover:border-primary/20 dark:hover:border-primary/40 transition-all hover:shadow-lg bg-card transition-colors duration-300">
              <CardHeader className="bg-muted/20 dark:bg-slate-900/40 pb-4 transition-colors">
                <div className="flex justify-between items-start">
                  <div className="p-2 rounded-lg bg-white dark:bg-slate-950 shadow-sm border dark:border-slate-800 transition-colors">
                    <FileText className="w-6 h-6 text-primary" />
                  </div>
                  <Badge variant={result.status === "pass" ? "default" : "destructive"} className="uppercase font-bold">
                    {result.status}
                  </Badge>
                </div>
                <CardTitle className="mt-4 text-lg line-clamp-1 dark:text-white">{result.exam?.title || "Exam Result"}</CardTitle>
                <CardDescription className="dark:text-slate-400">{new Date(result.createdAt).toLocaleDateString()}</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-muted-foreground dark:text-slate-500 uppercase tracking-wider">{t("yourScore")}</span>
                    <span className="text-2xl font-black text-primary">{result.score}%</span>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-xs font-bold text-muted-foreground dark:text-slate-500 uppercase tracking-wider">{t("correctAnswers")}</span>
                    <span className="text-lg font-bold dark:text-slate-200">{result.correctAnswers} / {result.totalQuestions}</span>
                  </div>
                </div>
                
                <div className="mt-6 flex items-center justify-between p-3 rounded-xl bg-muted/30 dark:bg-slate-900/50 border border-muted/20 dark:border-slate-800 transition-colors">
                  <div className="flex items-center gap-2">
                    {result.status === "pass" ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-500" />
                    )}
                    <span className="text-sm font-medium dark:text-slate-200 uppercase tracking-tight">{result.status === "pass" ? t("passed") : t("failed")}</span>
                  </div>
                  {result.status === "pass" && <Trophy className="w-4 h-4 text-amber-500" />}
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="col-span-full py-12 bg-card rounded-[2rem] border-2 border-dashed border-border flex items-center justify-center">
            <EmptyState 
              icon={Trophy} 
              title={t("noResults")} 
              description={t("noResultsDesc")} 
              actionLabel={t("goToExams")} 
              actionHref="/exams" 
            />
          </div>
        )}
      </div>
    </div>
  );
}
