import { Button } from "@/components/ui/button";
import { ChevronRight, ChevronLeft, Loader2, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/stores/useAuthStore";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";

interface QuestionCardProps {
  question: any;
  currentQuestionIndex: number;
  totalQuestions: number;
  answers: number[];
  onAnswer: (optionIndex: number) => void;
  onPrevious: () => void;
  onNext: () => void;
  onFinish: () => void;
  isSubmitting: boolean;
}

export default function QuestionCard({
  question,
  currentQuestionIndex,
  totalQuestions,
  answers,
  onAnswer,
  onPrevious,
  onNext,
  onFinish,
  isSubmitting,
}: QuestionCardProps) {
  const { token } = useAuthStore();
  const router = useRouter();
  const t = useTranslations("chat");

  const handleFinishAttempt = () => {
    if (!token) {
      toast.error(t("mustLogin"));
      router.push("/auth");
      return;
    }
    onFinish();
  };
  return (
    <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-10 lg:p-16 shadow-xl border border-slate-50 dark:border-slate-800 min-h-[600px] flex flex-col transition-colors overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestionIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex-1 flex flex-col"
        >
          <div className="space-y-6 mb-12">
            <span className="bg-cyan-50 dark:bg-cyan-950/30 text-cyan-600 dark:text-cyan-400 px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest">
              Multiple Choice
            </span>
            <h2 className="text-2xl lg:text-3xl font-bold text-slate-800 dark:text-white leading-tight mt-5">
              {question.question}
            </h2>
          </div>

          <div className="space-y-4">
            {question.options.map((option: any, idx: number) => (
              <button
                key={idx}
                onClick={() => onAnswer(idx)}
                className={cn(
                  "w-full text-left p-6 rounded-2xl border-2 transition-all duration-200 flex items-center gap-6 group",
                  answers[currentQuestionIndex] === idx
                    ? "border-primary bg-blue-50/30 dark:bg-primary/5"
                    : "border-slate-50 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/10 hover:border-slate-200 dark:hover:border-slate-700 hover:bg-white dark:hover:bg-slate-800"
                )}
              >
                <div
                  className={cn(
                    "h-8 w-8 shrink-0 rounded-full border-2 flex items-center justify-center font-bold transition-colors",
                    answers[currentQuestionIndex] === idx
                      ? "bg-primary border-primary text-white"
                      : "border-slate-300 dark:border-slate-700 text-slate-400 dark:text-slate-500"
                  )}
                >
                  {String.fromCharCode(65 + idx)}
                </div>
                <span
                  className={cn(
                    "font-bold transition-colors",
                    answers[currentQuestionIndex] === idx ? "text-primary" : "text-slate-600 dark:text-slate-300"
                  )}
                >
                  {option}
                </span>
              </button>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="flex flex-wrap items-center gap-y-4 justify-between pt-8 lg:pt-12 border-t border-slate-100 dark:border-slate-800 mt-auto transition-colors">
        <Button
          variant="ghost"
          disabled={currentQuestionIndex === 0}
          onClick={onPrevious}
          className="flex items-center justify-center gap-2 text-slate-400 dark:text-slate-500 font-bold hover:text-primary transition h-12 px-6 rounded-xl cursor-pointer w-full md:w-auto order-2 md:order-1"
        >
          <ChevronLeft size={20} /> Previous
        </Button>

        {currentQuestionIndex < totalQuestions - 1 ? (
          <Button
            onClick={onNext}
            className="bg-primary hover:bg-primary/90 text-white rounded-2xl px-12 h-14 max-md:h-12 max-md:px-8 font-black uppercase tracking-widest text-sm lg:text-lg shadow-xl shadow-primary/30 cursor-pointer w-full md:w-auto order-1 md:order-2"
          >
            Next <ChevronRight size={20} />
          </Button>
        ) : (
          <Button
            onClick={handleFinishAttempt}
            disabled={isSubmitting}
            className="bg-emerald-500 hover:bg-emerald-600 text-white rounded-2xl px-12 h-14 max-md:h-12 max-md:px-8 font-black uppercase tracking-widest text-sm lg:text-lg shadow-xl shadow-emerald-500/20 cursor-pointer w-full md:w-auto order-1 md:order-2"
          >
            {isSubmitting ? (
              <Loader2 className="animate-spin" />
            ) : (
              <CheckCircle2 size={24} className="mr-2" />
            )}{" "}
            Finish Exam
          </Button>
        )}
      </div>
    </div>
  );
}
