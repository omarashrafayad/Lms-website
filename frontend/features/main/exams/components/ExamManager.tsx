"use client";

import { useState, useEffect } from "react";
import { useExam } from "../hooks/useExam";
import { useSubmitExam } from "../../result/hooks/useResult";
import { Button } from "@/components/ui/button";
import { ChevronRight, ChevronLeft, Clock, Info, Loader2, CheckCircle2 } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

export default function ExamManager() {
  const { id } = useParams() as { id: string };
  const { data: examData, isLoading } = useExam(id);
  const submitMutation = useSubmitExam();
  const router = useRouter();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    if (examData?.data) {
      setTimeLeft(examData.data.duration * 60);
      setAnswers(new Array(examData.data.questions.length).fill(-1));
    }
  }, [examData]);

  useEffect(() => {
    if (timeLeft > 0 && !isFinished) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0 && examData?.data && !isFinished) {
      handleFinish();
    }
  }, [timeLeft, isFinished, examData]);

  const handleAnswer = (optionIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = optionIndex;
    setAnswers(newAnswers);
  };

  const handleFinish = () => {
    setIsFinished(true);
    submitMutation.mutate({
      examId: id,
      answers: answers
    }, {
        onSuccess: () => {
            router.push('/result');
        }
    });
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  const exam = examData?.data;
  if (!exam) return <div>Exam not found</div>;

  const currentQuestion = exam.questions[currentQuestionIndex];
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="container mx-auto px-6 lg:px-24 py-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">{exam.title}</h1>
            <p className="text-sm text-slate-400 font-medium">Topic: {exam.course?.title || 'General'}</p>
          </div>
          <div className="flex items-center gap-6">
            <div className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-black border transition-colors ${timeLeft < 60 ? "bg-rose-50 text-rose-500 border-rose-100" : "bg-blue-50 text-primary border-blue-100"}`}>
               <Clock size={20} />
               <span>{formatTime(timeLeft)}</span>
            </div>
            <div className="hidden lg:flex items-center gap-2 text-slate-400 text-sm font-bold">
               <Info size={16} />
               <span>Question {currentQuestionIndex + 1} of {exam.questions.length}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-[2.5rem] p-10 lg:p-16 shadow-xl border border-slate-50 min-h-[500px] flex flex-col">
               <div className="space-y-6 mb-12">
                  <span className="bg-cyan-50 text-cyan-600 px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest">Multiple Choice</span>
                  <h2 className="text-2xl lg:text-3xl font-bold text-slate-800 leading-tight">
                    {currentQuestion.question}
                  </h2>
               </div>

               <div className="space-y-4">
                  {currentQuestion.options.map((option, idx) => (
                    <button 
                      key={idx}
                      onClick={() => handleAnswer(idx)}
                      className={`w-full text-left p-6 rounded-2xl border-2 transition-all duration-200 flex items-center gap-6 group ${answers[currentQuestionIndex] === idx ? "border-primary bg-blue-50/30" : "border-slate-50 bg-slate-50/50 hover:border-slate-200 hover:bg-white"}`}
                    >
                       <div className={`h-8 w-8 shrink-0 rounded-full border-2 flex items-center justify-center font-bold transition-colors ${answers[currentQuestionIndex] === idx ? "bg-primary border-primary text-white" : "border-slate-300 text-slate-400"}`}>
                          {String.fromCharCode(65 + idx)}
                       </div>
                       <span className={`font-bold transition-colors ${answers[currentQuestionIndex] === idx ? "text-primary" : "text-slate-600"}`}>
                          {option}
                       </span>
                    </button>
                  ))}
               </div>

               <div className="flex items-center justify-between pt-12 border-t border-slate-100 mt-auto">
                  <Button 
                    variant="ghost" 
                    disabled={currentQuestionIndex === 0}
                    onClick={() => setCurrentQuestionIndex(prev => prev - 1)}
                    className="flex items-center gap-2 text-slate-400 font-bold hover:text-primary transition h-12 px-6 rounded-xl cursor-pointer"
                  >
                    <ChevronLeft size={20} /> Previous
                  </Button>
                  
                  {currentQuestionIndex < exam.questions.length - 1 ? (
                      <Button 
                        onClick={() => setCurrentQuestionIndex(prev => prev + 1)}
                        className="bg-primary hover:bg-primary/90 text-white rounded-2xl px-12 h-14 font-black uppercase tracking-widest text-lg shadow-xl shadow-primary/20 cursor-pointer"
                      >
                        Next <ChevronRight size={20} />
                      </Button>
                  ) : (
                      <Button 
                        onClick={handleFinish}
                        disabled={submitMutation.isPending}
                        className="bg-emerald-500 hover:bg-emerald-600 text-white rounded-2xl px-12 h-14 font-black uppercase tracking-widest text-lg shadow-xl shadow-emerald-500/20 cursor-pointer"
                      >
                        {submitMutation.isPending ? <Loader2 className="animate-spin" /> : <CheckCircle2 size={24} className="mr-2" />} Finish Exam
                      </Button>
                  )}
               </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-white rounded-[2.5rem] p-8 shadow-xl border border-slate-50">
               <h3 className="text-xl font-bold text-slate-800 mb-8 font-sans">Questions Tracker</h3>
               <div className="grid grid-cols-5 gap-3">
                  {exam.questions.map((_, i) => (
                    <button 
                      key={i} 
                      onClick={() => setCurrentQuestionIndex(i)}
                      className={`h-10 w-10 flex items-center justify-center rounded-xl text-xs font-black transition cursor-pointer ${currentQuestionIndex === i ? "bg-primary text-white scale-110 shadow-lg shadow-primary/20" : answers[i] !== -1 ? "bg-emerald-100 text-emerald-600 border border-emerald-200" : "bg-slate-50 text-slate-300 border border-slate-100 hover:border-slate-300"}`}
                    >
                      {i + 1}
                    </button>
                  ))}
               </div>
               <div className="mt-12 pt-8 border-t border-slate-50 space-y-4">
                  <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest font-sans">
                    <span className="text-slate-400">Total Progress</span>
                    <span className="text-primary">{Math.round((answers.filter(a => a !== -1).length / exam.questions.length) * 100)}% Done</span>
                  </div>
                  <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-primary transition-all duration-500" style={{ width: `${(answers.filter(a => a !== -1).length / exam.questions.length) * 100}%` }} />
                  </div>
               </div>
            </div>

            <div className="bg-slate-900 rounded-[2rem] p-8 text-white space-y-4 shadow-2xl">
               <h4 className="font-bold flex items-center gap-2 text-primary font-sans"><Info size={16} /> Exam Rules</h4>
               <p className="text-[10px] text-slate-400 leading-relaxed font-bold uppercase tracking-wider">
                 Do not refresh the page. This exam is proctored. Your actions are being recorded for quality assurance.
               </p>
               <div className="pt-4">
                   <div className="flex items-center gap-3 text-xs font-bold text-slate-300 mb-2">
                       <CheckCircle2 size={14} className="text-emerald-400" />
                       No external tools allowed
                   </div>
                   <div className="flex items-center gap-3 text-xs font-bold text-slate-300 mb-2">
                       <CheckCircle2 size={14} className="text-emerald-400" />
                       Single attempt only
                   </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
