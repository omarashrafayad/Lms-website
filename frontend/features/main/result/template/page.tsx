"use client";

import { Button } from "@/components/ui/button";
import { CheckCircle2, XCircle, RotateCcw, Home, Award, ChevronRight, Star, Loader2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useMyResults } from "../hooks/useResult";

export default function ResultPage() {
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
        <div className="bg-slate-50 min-h-screen py-24 flex items-center justify-center">
             <div className="text-center space-y-6">
                <div className="mx-auto h-24 w-24 bg-white rounded-3xl shadow-xl flex items-center justify-center text-slate-300">
                    <Award size={48} />
                </div>
                <h1 className="text-2xl font-bold text-slate-800">No results found</h1>
                <p className="text-slate-500">You haven't taken any exams yet.</p>
                <Link href="/exams">
                    <Button className="bg-primary hover:bg-primary/90 text-white rounded-xl h-12 px-8 cursor-pointer shadow-lg shadow-primary/20">
                        Go to Exams
                    </Button>
                </Link>
             </div>
        </div>
    );
  }

  const stats = [
    { label: "Correct Answers", value: latestResult.correctAnswers.toString(), icon: <CheckCircle2 className="text-emerald-500" />, sub: `/ ${latestResult.totalQuestions} Questions` },
    { label: "Points Earned", value: latestResult.score.toString(), icon: <Award className="text-amber-500" />, sub: `/ 100 Total` },
    { label: "Wrong Answers", value: latestResult.wrongAnswers.toString(), icon: <XCircle className="text-rose-500" />, sub: "Check mistakes" },
  ];

  const isPassed = latestResult.status === "pass";

  return (
    <div className="bg-slate-50 min-h-screen py-24">
      <div className="container mx-auto px-6 lg:px-24">
        <div className="max-w-4xl mx-auto">
          {/* Result Card */}
          <div className="bg-white rounded-[3.5rem] shadow-2xl overflow-hidden border border-slate-100">
             {/* Header Section */}
             <div className={cn("p-12 lg:p-20 text-center text-white space-y-6 relative overflow-hidden", isPassed ? "bg-emerald-500" : "bg-rose-500")}>
                <div className="relative z-10 space-y-4">
                  <h1 className="text-4xl lg:text-5xl font-black uppercase tracking-tighter">{isPassed ? "Congratulations!" : "Keep Trying!"}</h1>
                  <p className="text-cyan-50 font-bold text-lg">You {isPassed ? "passed" : "failed"} the {latestResult.exam?.title || "Exam"}</p>
                </div>
                {/* Decorative circles */}
                <div className="absolute top-0 right-0 h-40 w-40 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 h-24 w-24 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />
             </div>

             {/* Score Circle Section */}
             <div className="p-12 lg:p-20 -mt-24 relative z-20">
                <div className="bg-white rounded-[2.5rem] shadow-2xl p-10 flex flex-col items-center">
                   <div className="relative h-48 w-48 flex items-center justify-center mb-10">
                      <svg className="h-full w-full rotate-[-90deg]">
                         <circle cx="96" cy="96" r="88" className="stroke-slate-100 fill-none" strokeWidth="12" />
                         <circle 
                            cx="96" 
                            cy="96" 
                            r="88" 
                            className={cn("fill-none transition-all duration-1000", isPassed ? "stroke-emerald-400" : "stroke-rose-400")} 
                            strokeWidth="12" 
                            strokeDasharray="552.92" 
                            strokeDashoffset={552.92 - (552.92 * (latestResult.score / 100))} 
                            strokeLinecap="round"
                         />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                         <span className="text-5xl font-black text-slate-800">{latestResult.score}%</span>
                         <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Your Score</span>
                      </div>
                   </div>

                   {/* Stats Grid */}
                   <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-8 pt-10 border-t border-slate-100">
                      {stats.map((s, i) => (
                        <div key={i} className="text-center space-y-3">
                           <div className="mx-auto h-12 w-12 rounded-2xl bg-slate-50 flex items-center justify-center">
                              {s.icon}
                           </div>
                           <div>
                              <p className="text-3xl font-black text-slate-800">{s.value}</p>
                              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">{s.label}</p>
                              <p className="text-[9px] font-bold text-slate-300 mt-1">{s.sub}</p>
                           </div>
                        </div>
                      ))}
                   </div>
                </div>

                {/* Performance Message */}
                <div className="mt-12 text-center max-w-2xl mx-auto space-y-6">
                   <h3 className="text-2xl font-bold text-slate-800 tracking-tight">{isPassed ? "Great job!" : "Don't give up!"}</h3>
                   <p className="text-slate-400 leading-relaxed font-medium">
                     {isPassed ? "You have successfully completed this assessment. Your certificate is ready to be shared." : "Review your materials and try again to improve your score and earn your certification."}
                   </p>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-16 pt-12 border-t border-slate-100">
                   <Link href="/exams">
                    <button className="flex items-center gap-3 px-10 py-5 rounded-2xl bg-white border-2 border-slate-100 text-slate-600 font-bold hover:bg-slate-50 transition cursor-pointer">
                      <RotateCcw size={18} /> Retake Exam
                    </button>
                   </Link>
                   <Link href="/">
                    <Button className="bg-primary hover:bg-primary/90 text-white rounded-2xl px-12 h-16 font-black uppercase tracking-widest text-lg shadow-xl shadow-primary/30 cursor-pointer">
                      Back to Home <Home size={18} className="ml-2" />
                    </Button>
                   </Link>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import { cn } from "@/lib/utils";
