"use client";

import { useExams } from "../hooks/useExam";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Clock, BookOpen, Loader2, Play } from "lucide-react";

export default function ExamPage() {
  const { data: examsData, isLoading } = useExams();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  const exams = examsData?.data || [];

  return (
    <div className="bg-slate-50 min-h-screen py-20">
      <div className="container mx-auto px-6 lg:px-24">
        <div className="mb-12">
            <h1 className="text-4xl font-bold text-slate-800 tracking-tight">Available Exams</h1>
            <p className="text-slate-500 mt-2">Test your knowledge and earn your certificates.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {exams.map((exam) => (
                <div key={exam._id} className="bg-white rounded-[2rem] p-8 shadow-xl border border-slate-50 flex flex-col h-full group">
                    <div className="h-14 w-14 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors duration-300 text-primary">
                        <BookOpen size={28} />
                    </div>
                    <h3 className="text-xl font-bold text-slate-800 mb-4">{exam.title}</h3>
                    <p className="text-sm text-slate-500 mb-8 line-clamp-3">
                        {exam.description || "Take this exam to evaluate your understanding of the course materials."}
                    </p>
                    
                    <div className="mt-auto space-y-6">
                        <div className="flex items-center justify-between text-xs font-bold uppercase tracking-widest text-slate-400">
                            <span className="flex items-center gap-2">
                                <Clock size={14} className="text-primary" />
                                {exam.duration} Minutes
                            </span>
                            <span className="flex items-center gap-2">
                                <BookOpen size={14} className="text-primary" />
                                {exam.questions?.length || 0} Questions
                            </span>
                        </div>
                        
                        <Link href={`/exams/${exam._id}`} className="block">
                            <Button className="w-full bg-primary hover:bg-primary/90 text-white rounded-xl h-12 font-bold flex gap-2 cursor-pointer shadow-lg shadow-primary/20">
                                <Play size={16} fill="currentColor" /> Start Exam
                            </Button>
                        </Link>
                    </div>
                </div>
            ))}
            
            {exams.length === 0 && (
                <div className="col-span-full py-20 text-center bg-white rounded-[2rem] border border-dashed border-slate-200">
                    <p className="text-slate-400 font-medium">No exams are currently available.</p>
                </div>
            )}
        </div>
      </div>
    </div>
  );
}
