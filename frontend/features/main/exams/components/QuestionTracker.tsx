import { cn } from "@/lib/utils";

interface QuestionTrackerProps {
  questions: any[];
  currentQuestionIndex: number;
  answers: number[];
  onSelectQuestion: (index: number) => void;
}

export default function QuestionTracker({
  questions,
  currentQuestionIndex,
  answers,
  onSelectQuestion,
}: QuestionTrackerProps) {
  const answeredCount = answers.filter((a) => a !== -1).length;
  const progress = Math.round((answeredCount / questions.length) * 100);

  return (
    <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 shadow-xl border border-slate-50 dark:border-slate-800 transition-colors">
      <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-8 font-sans">Questions Tracker</h3>
      <div className="grid grid-cols-5 gap-3">
        {questions.map((_, i) => (
          <button
            key={i}
            onClick={() => onSelectQuestion(i)}
            className={cn(
              "h-10 w-10 flex items-center justify-center rounded-xl text-xs font-black transition cursor-pointer",
              currentQuestionIndex === i
                ? "bg-primary text-white scale-110 shadow-lg shadow-primary/20"
                : answers[i] !== -1
                ? "bg-emerald-100 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900"
                : "bg-slate-50 dark:bg-slate-800 text-slate-300 dark:text-slate-600 border border-slate-100 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600"
            )}
          >
            {i + 1}
          </button>
        ))}
      </div>
      <div className="mt-12 pt-8 border-t border-slate-50 dark:border-slate-800 space-y-4 transition-colors">
        <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest font-sans">
          <span className="text-slate-400 dark:text-slate-500">Total Progress</span>
          <span className="text-primary">{progress}% Done</span>
        </div>
        <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden transition-colors">
          <div
            className="h-full bg-primary transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
