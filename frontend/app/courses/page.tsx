"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronRight, ChevronLeft, Layout, Globe, BookOpen, Star, PenTool, Database, Camera, Activity, Briefcase } from "lucide-react";

export default function CoursesPage() {
  const topCategories = [
    { name: "Design", icon: <PenTool size={32} className="text-cyan-500" />, desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do" },
    { name: "Development", icon: <Layout size={32} className="text-cyan-500" />, desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do" },
    { name: "Development", icon: <Database size={32} className="text-cyan-500" />, desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do" },
    { name: "Business", icon: <Briefcase size={32} className="text-cyan-500" />, desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do" },
    { name: "Marketing", icon: <Globe size={32} className="text-orange-400" />, desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do" },
    { name: "Photography", icon: <Camera size={32} className="text-pink-400" />, desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do" },
    { name: "Acting", icon: <Activity size={32} className="text-slate-500" />, desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do" },
    { name: "Business", icon: <Briefcase size={32} className="text-cyan-500" />, desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do" },
  ];

  const CourseCard = ({ isProgress = false }) => (
    <div className="bg-white rounded-[2rem] p-6 shadow-xl border border-slate-50 transition hover:scale-[1.02] cursor-pointer">
      <div className="relative aspect-video rounded-2xl overflow-hidden mb-6">
        <Image src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2670&auto=format&fit=crop" alt="Course" fill className="object-cover" />
      </div>
      <div className="space-y-4">
        {!isProgress && (
          <div className="flex items-center justify-between text-[10px] font-bold tracking-widest text-slate-400 uppercase">
             <span>Design</span>
             <span>3 Month</span>
          </div>
        )}
        <h4 className="font-bold text-slate-800 leading-snug">AWS Certified solutions Architect</h4>
        <div className="flex items-center gap-2">
           <div className="h-8 w-8 rounded-full overflow-hidden">
              <Image src="https://i.pravatar.cc/100?u=lina" alt="lina" width={32} height={32} />
           </div>
           <span className="text-xs font-bold text-slate-700">Lina</span>
        </div>
        
        {isProgress ? (
          <div className="pt-4 space-y-2">
             <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-primary w-2/3 rounded-full" />
             </div>
             <p className="text-[10px] text-slate-400 font-bold text-right uppercase tracking-widest">Lesson 5 of 7</p>
          </div>
        ) : (
          <div className="flex items-center justify-between pt-2 border-t border-slate-50">
             <div className="flex items-center gap-1">
               <span className="text-xs font-bold text-slate-300 line-through">$160</span>
               <span className="text-sm font-bold text-primary">$80</span>
             </div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="bg-white min-h-screen">
      {/* Welcome & Progress Section */}
      <section className="py-20 bg-blue-50/20">
        <div className="container mx-auto px-6 lg:px-24">
          <div className="flex items-center justify-between mb-12">
            <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Welcome back, ready for your next lesson?</h1>
            <button className="text-primary font-bold text-sm hover:underline uppercase tracking-widest">View History</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <CourseCard isProgress={true} />
            <CourseCard isProgress={true} />
            <CourseCard isProgress={true} />
          </div>
          <div className="flex justify-end gap-3 mt-10">
             <button className="h-10 w-10 flex items-center justify-center rounded-lg bg-cyan-100 text-cyan-600"><ChevronLeft /></button>
             <button className="h-10 w-10 flex items-center justify-center rounded-lg bg-cyan-500 text-white shadow-lg"><ChevronRight /></button>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-24">
        <div className="container mx-auto px-6 lg:px-24">
          <h2 className="text-3xl font-bold text-slate-800 mb-16">Choice favourite course from top category</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {topCategories.map((cat, i) => (
              <div key={i} className="bg-white rounded-[2rem] p-8 shadow-xl border border-slate-50 text-center space-y-6 group cursor-pointer transition hover:-translate-y-2">
                <div className="mx-auto h-16 w-16 flex items-center justify-center bg-cyan-50/50 rounded-2xl group-hover:bg-cyan-500 group-hover:text-white transition-colors duration-300">
                   {cat.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-800">{cat.name}</h3>
                <p className="text-xs text-slate-400 leading-relaxed font-medium">
                  {cat.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recommended For You */}
      <section className="py-24 bg-blue-50/10">
        <div className="container mx-auto px-6 lg:px-24">
           <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-bold text-slate-800">Recommended for you</h2>
            <Link href="/courses" className="text-primary font-bold text-sm hover:underline uppercase tracking-widest">See all</Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[...Array(4)].map((_, i) => <CourseCard key={i} />)}
          </div>
           <div className="flex justify-end gap-3 mt-10">
             <button className="h-10 w-10 flex items-center justify-center rounded-lg bg-cyan-100 text-cyan-600"><ChevronLeft /></button>
             <button className="h-10 w-10 flex items-center justify-center rounded-lg bg-cyan-500 text-white shadow-lg"><ChevronRight /></button>
          </div>
        </div>
      </section>

      {/* Get chance at your course */}
      <section className="py-24">
        <div className="container mx-auto px-6 lg:px-24">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-bold text-slate-800">Get chance at your course</h2>
            <Link href="/courses" className="text-primary font-bold text-sm hover:underline uppercase tracking-widest">See all</Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[...Array(4)].map((_, i) => <CourseCard key={i} />)}
          </div>
        </div>
      </section>

      {/* Banner */}
      <section className="py-16">
        <div className="container mx-auto px-6 lg:px-24">
           <div className="bg-slate-900 rounded-[3rem] p-16 text-center text-white space-y-6">
              <h2 className="text-3xl font-bold uppercase tracking-wider">Online coaching lessons for remote learning.</h2>
              <p className="text-slate-400 max-w-2xl mx-auto">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              </p>
              <Button className="bg-primary hover:bg-primary/90 text-white rounded-xl px-12 h-14 font-bold">Start learning now</Button>
           </div>
        </div>
      </section>

       {/* Personal Development Section */}
      <section className="py-24">
        <div className="container mx-auto px-6 lg:px-24">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-bold text-slate-800">The course in personal development</h2>
            <Link href="/courses" className="text-primary font-bold text-sm hover:underline uppercase tracking-widest">See all</Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[...Array(4)].map((_, i) => <CourseCard key={i} />)}
          </div>
        </div>
      </section>

       {/* Student are viewing */}
      <section className="py-24 bg-blue-50/10">
        <div className="container mx-auto px-6 lg:px-24">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-bold text-slate-800">Student are viewing</h2>
            <Link href="/courses" className="text-primary font-bold text-sm hover:underline uppercase tracking-widest">See all</Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[...Array(4)].map((_, i) => <CourseCard key={i} />)}
          </div>
        </div>
      </section>
    </div>
  );
}
