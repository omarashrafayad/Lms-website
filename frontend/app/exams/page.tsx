"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronRight, ChevronLeft, Clock, Info } from "lucide-react";
import Link from "next/link";

export default function ExamPage() {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const questions = [
    {
      id: 1,
      text: "Which of the following describes a 'Classroom' in the context of TOTC?",
      options: [
        "A physical building only",
        "A virtual space where teachers and students interact in real-time",
        "A static document storage area",
        "A social media group for students"
      ]
    }
  ];

  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="container mx-auto px-6 lg:px-24 py-12">
        {/* Header with Title and Timer */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Final Exam: EdTech Innovations</h1>
            <p className="text-sm text-slate-400 font-medium">Topic: Module 4 - Virtual Learning Suites</p>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 bg-rose-50 px-6 py-3 rounded-2xl text-rose-500 font-black border border-rose-100">
               <Clock size={20} />
               <span>24:59</span>
            </div>
            <div className="hidden lg:flex items-center gap-2 text-slate-400 text-sm font-bold">
               <Info size={16} />
               <span>Question 1 of 25</span>
            </div>
          </div>
        </div>

        {/* Main Exam Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Question Side */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-[2.5rem] p-10 lg:p-16 shadow-xl border border-slate-50 space-y-12">
               <div className="space-y-6">
                  <span className="bg-cyan-50 text-cyan-600 px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest">Multiple Choice</span>
                  <h2 className="text-2xl lg:text-3xl font-bold text-slate-800 leading-tight">
                    {questions[0].text}
                  </h2>
               </div>

               <div className="space-y-4">
                  {questions[0].options.map((option, idx) => (
                    <button 
                      key={idx}
                      onClick={() => setSelectedOption(idx)}
                      className={`w-full text-left p-6 rounded-2xl border-2 transition-all duration-200 flex items-center gap-6 group ${selectedOption === idx ? "border-cyan-400 bg-cyan-50/30" : "border-slate-50 bg-slate-50/50 hover:border-slate-200 hover:bg-white"}`}
                    >
                       <div className={`h-8 w-8 shrink-0 rounded-full border-2 flex items-center justify-center font-bold transition-colors ${selectedOption === idx ? "bg-cyan-400 border-cyan-400 text-white" : "border-slate-300 text-slate-400"}`}>
                          {String.fromCharCode(65 + idx)}
                       </div>
                       <span className={`font-bold transition-colors ${selectedOption === idx ? "text-cyan-700" : "text-slate-600"}`}>
                          {option}
                       </span>
                    </button>
                  ))}
               </div>

               <div className="flex items-center justify-between pt-12 border-t border-slate-100">
                  <button className="flex items-center gap-2 text-slate-400 font-bold hover:text-primary transition">
                    <ChevronLeft size={20} /> Previous
                  </button>
                  <Link href="/result">
                    <Button className="bg-cyan-400 hover:bg-cyan-500 text-white rounded-2xl px-12 h-14 font-black uppercase tracking-widest text-lg shadow-xl shadow-cyan-400/20">
                      Next Question <ChevronRight size={20} />
                    </Button>
                  </Link>
               </div>
            </div>
          </div>

          {/* Sidebar - Progress Tracker */}
          <div className="space-y-8">
            <div className="bg-white rounded-[2.5rem] p-8 shadow-xl border border-slate-50">
               <h3 className="text-xl font-bold text-slate-800 mb-8">Exam Progress</h3>
               <div className="grid grid-cols-5 gap-3">
                  {[...Array(25)].map((_, i) => (
                    <div 
                      key={i} 
                      className={`h-10 w-10 flex items-center justify-center rounded-xl text-xs font-bold transition ${i === 0 ? "bg-cyan-400 text-white" : i < 0 ? "bg-emerald-100 text-emerald-600" : "bg-slate-50 text-slate-300 border border-slate-100"}`}
                    >
                      {i + 1}
                    </div>
                  ))}
               </div>
               <div className="mt-12 pt-8 border-t border-slate-50 space-y-4">
                  <div className="flex items-center justify-between text-xs font-bold uppercase tracking-widest">
                    <span className="text-slate-400">Time Remaining</span>
                    <span className="text-rose-500">Fast! 24m</span>
                  </div>
                  <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-cyan-400 w-1/3" />
                  </div>
               </div>
            </div>

            <div className="bg-slate-900 rounded-[2rem] p-8 text-white space-y-4">
               <h4 className="font-bold flex items-center gap-2"><Info size={16} className="text-cyan-400" /> Exam Rules</h4>
               <p className="text-xs text-slate-400 leading-relaxed font-medium">
                 Do not refresh the page. This exam is proctored. Your webcam and screen are being monitored.
               </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
