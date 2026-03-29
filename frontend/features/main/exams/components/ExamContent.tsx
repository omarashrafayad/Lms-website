"use client";

import { useState, useEffect, useCallback } from "react";
import { useSubmitExam } from "../../result/hooks/useResult";
import { Clock, Info } from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import QuestionCard from "./QuestionCard";
import QuestionTracker from "./QuestionTracker";
import ExamRules from "./ExamRules";

interface ExamContentProps {
  exam: any;
  id: string;
}

export default function ExamContent({ exam, id }: ExamContentProps) {
  const submitMutation = useSubmitExam();
  const router = useRouter();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>(() => new Array(exam.questions.length).fill(-1));
  const [timeLeft, setTimeLeft] = useState<number>(exam.duration * 60);
  const [isFinished, setIsFinished] = useState(false);

  const handleFinish = useCallback(() => {
    if (isFinished) return;
    setIsFinished(true);
    submitMutation.mutate({
      examId: id,
      answers: answers
    }, {
      onSuccess: () => {
        router.push('/result');
      }
    });
  }, [id, answers, isFinished, submitMutation, router]);

  const handleAnswer = useCallback((optionIndex: number) => {
    setAnswers((prev) => {
      const newAnswers = [...prev];
      newAnswers[currentQuestionIndex] = optionIndex;
      return newAnswers;
    });
  }, [currentQuestionIndex]);

  useEffect(() => {
    if (timeLeft > 0 && !isFinished) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0 && !isFinished) {
      const timeout = setTimeout(() => {
        handleFinish();
      }, 0);
      return () => clearTimeout(timeout);
    }
  }, [timeLeft, isFinished, handleFinish]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div dir="ltr" className="bg-background dark:bg-[#0a0b0c] min-h-screen transition-colors duration-300">
      <div className="container mx-auto px-6 lg:px-24 py-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 bg-white dark:bg-slate-900 p-8 rounded-[2rem] shadow-sm border border-slate-100 dark:border-slate-800 transition-colors">
          <div>
            <h1 className="text-2xl font-bold text-slate-800 dark:text-white">{exam.title}</h1>
            <p className="text-sm text-slate-400 dark:text-slate-500 font-medium">Topic: {exam.course?.title || 'General'}</p>
          </div>
          <div className="flex items-center gap-6">
            <div className={cn(
              "flex items-center gap-2 px-6 py-3 rounded-2xl font-black border transition-colors",
              timeLeft < 60
                ? "bg-rose-50 dark:bg-rose-950/20 text-rose-500 border-rose-100 dark:border-rose-900"
                : "bg-blue-50 dark:bg-blue-950/20 text-primary border-blue-100 dark:border-blue-900"
            )}>
              <Clock size={20} />
              <span>{formatTime(timeLeft)}</span>
            </div>
            <div className="hidden lg:flex items-center gap-2 text-slate-400 dark:text-slate-500 text-sm font-bold">
              <Info size={16} />
              <span>Question {currentQuestionIndex + 1} of {exam.questions.length}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <QuestionCard
              question={exam.questions[currentQuestionIndex]}
              currentQuestionIndex={currentQuestionIndex}
              totalQuestions={exam.questions.length}
              answers={answers}
              onAnswer={handleAnswer}
              onPrevious={() => setCurrentQuestionIndex(prev => prev - 1)}
              onNext={() => setCurrentQuestionIndex(prev => prev + 1)}
              onFinish={handleFinish}
              isSubmitting={submitMutation.isPending}
            />
          </div>

          <div className="space-y-8">
            <QuestionTracker
              questions={exam.questions}
              currentQuestionIndex={currentQuestionIndex}
              answers={answers}
              onSelectQuestion={setCurrentQuestionIndex}
            />
            <ExamRules />
          </div>
        </div>
      </div>
    </div>
  );
}
