"use client";

import { Button } from "@/components/ui/button";
import { CheckCircle2, XCircle, RotateCcw, Home, Award, ChevronRight, Star } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function ResultPage() {
  const stats = [
    { label: "Correct Answers", value: "22", icon: <CheckCircle2 className="text-emerald-500" />, sub: "/ 25 Questions" },
    { label: "Points Earned", value: "880", icon: <Award className="text-amber-500" />, sub: "/ 1000 Total" },
    { label: "Wrong Answers", value: "3", icon: <XCircle className="text-rose-500" />, sub: "Check mistakes" },
  ];

  return (
    <div className="bg-slate-50 min-h-screen py-24">
      <div className="container mx-auto px-6 lg:px-24">
        <div className="max-w-4xl mx-auto">
          {/* Result Card */}
          <div className="bg-white rounded-[3.5rem] shadow-2xl overflow-hidden border border-slate-100">
             {/* Header Section */}
             <div className="bg-cyan-500 p-12 lg:p-20 text-center text-white space-y-6 relative overflow-hidden">
                <div className="relative z-10 space-y-4">
                  <h1 className="text-4xl lg:text-5xl font-black uppercase tracking-tighter">Congratulations!</h1>
                  <p className="text-cyan-50 font-bold text-lg">You passed the EdTech Innovations Exam</p>
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
                            className="stroke-emerald-400 fill-none" 
                            strokeWidth="12" 
                            strokeDasharray="552.92" 
                            strokeDashoffset="66.35" 
                            strokeLinecap="round"
                         />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                         <span className="text-5xl font-black text-slate-800">88%</span>
                         <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Global Score</span>
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
                   <h3 className="text-2xl font-bold text-slate-800 tracking-tight">Great job, Lina!</h3>
                   <p className="text-slate-400 leading-relaxed font-medium">
                     You are now certified in Virtual Learning Suites. This certificate has been added to your profile and can be shared on LinkedIn.
                   </p>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-16 pt-12 border-t border-slate-100">
                   <Link href="/exams">
                    <button className="flex items-center gap-3 px-10 py-5 rounded-2xl bg-white border-2 border-slate-100 text-slate-600 font-bold hover:bg-slate-50 transition">
                      <RotateCcw size={18} /> Retake Exam
                    </button>
                   </Link>
                   <Link href="/">
                    <Button className="bg-cyan-400 hover:bg-cyan-500 text-white rounded-2xl px-12 h-16 font-black uppercase tracking-widest text-lg shadow-xl shadow-cyan-400/30">
                      Back to Home <Home size={18} className="ml-2" />
                    </Button>
                   </Link>
                </div>
             </div>
          </div>

          {/* Featured Courses for Results */}
          <div className="mt-24 space-y-12">
             <div className="flex items-center justify-between">
                <h2 className="text-3xl font-black text-slate-800 tracking-tight uppercase">Recommended for you</h2>
                <Link href="/courses" className="text-primary font-bold hover:underline">View all</Link>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[1, 2].map((i) => (
                  <div key={i} className="bg-white rounded-[2.5rem] p-8 shadow-xl border border-slate-50 flex gap-6 items-center group cursor-pointer hover:-translate-y-1 transition duration-300">
                     <div className="relative h-24 w-24 shrink-0 rounded-2xl overflow-hidden shadow-md">
                        <Image src={`https://images.unsplash.com/photo-${i === 1 ? '1516321497487-e288fb19713f' : '1522202176988-66273c2fd55f'}?q=80&w=200&auto=format&fit=crop`} alt="course" fill className="object-cover" />
                     </div>
                     <div className="flex-1 space-y-2">
                        <h4 className="font-bold text-slate-800 group-hover:text-primary transition">Advanced EdTech Implementation</h4>
                        <p className="text-xs text-slate-400 font-medium">Continue your path to mastery</p>
                        <div className="flex items-center gap-1 text-amber-500">
                           <Star size={14} fill="currentColor" />
                           <span className="text-xs font-bold">4.9</span>
                        </div>
                     </div>
                     <ChevronRight className="text-slate-200 group-hover:text-primary transition" />
                  </div>
                ))}
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
