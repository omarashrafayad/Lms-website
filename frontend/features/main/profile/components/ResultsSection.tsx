"use client";

import { useQuery } from "@tanstack/react-query";
import { getMyResults } from "@/features/main/result/api/resultApi";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Spinner } from "@/components/ui/spinner";
import { Trophy, FileText, CheckCircle2, XCircle } from "lucide-react";

export default function ResultsSection() {
  const { data, isLoading } = useQuery({
    queryKey: ["my-results"],
    queryFn: getMyResults,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spinner className="w-8 h-8 text-primary" />
      </div>
    );
  }

  const results = data?.data || [];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-1">
        <h2 className="text-3xl font-extrabold tracking-tight">Exam Results</h2>
        <p className="text-muted-foreground">Track your progress and review your past exam performances.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {results.length > 0 ? (
          results.map((result) => (
            <Card key={result._id} className="overflow-hidden border-2 hover:border-primary/20 transition-all hover:shadow-lg">
              <CardHeader className="bg-muted/20 pb-4">
                <div className="flex justify-between items-start">
                  <div className="p-2 rounded-lg bg-white shadow-sm">
                    <FileText className="w-6 h-6 text-primary" />
                  </div>
                  <Badge variant={result.status === "pass" ? "default" : "destructive"} className="uppercase font-bold">
                    {result.status}
                  </Badge>
                </div>
                <CardTitle className="mt-4 text-lg line-clamp-1">{result.exam?.title || "Exam Result"}</CardTitle>
                <CardDescription>{new Date(result.createdAt).toLocaleDateString()}</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Score</span>
                    <span className="text-2xl font-black text-primary">{result.score}%</span>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Correct</span>
                    <span className="text-lg font-bold">{result.correctAnswers} / {result.totalQuestions}</span>
                  </div>
                </div>
                
                <div className="mt-6 flex items-center justify-between p-3 rounded-xl bg-muted/30">
                  <div className="flex items-center gap-2">
                    {result.status === "pass" ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-500" />
                    )}
                    <span className="text-sm font-medium">{result.status === "pass" ? "Successful Completion" : "Keep Practicing"}</span>
                  </div>
                  {result.status === "pass" && <Trophy className="w-4 h-4 text-amber-500" />}
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="col-span-full py-20 text-center bg-muted/10 rounded-3xl border-2 border-dashed border-muted">
            <Trophy className="w-16 h-16 mx-auto text-muted-foreground/30 mb-4" />
            <h3 className="text-xl font-bold">No results found</h3>
            <p className="text-muted-foreground">You haven't taken any exams yet. Start learning and test your skills!</p>
          </div>
        )}
      </div>
    </div>
  );
}
