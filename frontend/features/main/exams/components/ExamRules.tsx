import { Info, CheckCircle2 } from "lucide-react";

export default function ExamRules() {
  return (
    <div className="bg-slate-900 dark:bg-black rounded-[2rem] p-8 text-white space-y-4 shadow-2xl transition-colors">
      <h4 className="font-bold flex items-center gap-2 text-primary font-sans">
        <Info size={16} /> Exam Rules
      </h4>
      <p className="text-[10px] text-slate-400 dark:text-slate-500 leading-relaxed font-bold uppercase tracking-wider">
        Do not refresh the page. This exam is proctored. Your actions are being recorded for quality assurance.
      </p>
      <div className="pt-4">
        <div className="flex items-center gap-3 text-xs font-bold text-slate-300 dark:text-slate-400 mb-2">
          <CheckCircle2 size={14} className="text-emerald-400" />
          No external tools allowed
        </div>
        <div className="flex items-center gap-3 text-xs font-bold text-slate-300 dark:text-slate-400 mb-2">
          <CheckCircle2 size={14} className="text-emerald-400" />
          Single attempt only
        </div>
      </div>
    </div>
  );
}
