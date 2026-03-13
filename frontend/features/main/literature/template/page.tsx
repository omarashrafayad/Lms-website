"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Star, Users, PlayCircle, Twitter, Youtube, Instagram, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import Link from "next/link";
import { useCourses } from "../../courses/hooks/useCourse";
import { getImageUrl } from "@/lib/image.utils";

export default function LiteratureCoursePage() {
  const tabs = ["About", "Course", "Notes", "Project", "Podcast", "Book", "Review"];
  
  // Filtering for Literature courses. We assume "Literature" is a category.
  // In a real scenario, we'd use the Category ID. For now, we fetch all and show how it works.
  const { data: coursesData, isLoading } = useCourses({ limit: 6 });

  if (isLoading) {
      return (
          <div className="flex min-h-screen items-center justify-center">
              <Loader2 className="h-12 w-12 animate-spin text-primary" />
          </div>
      );
  }

  const courses = coursesData?.data || [];

  return (
    <div className="bg-white min-h-screen pb-24">
      {/* Instructor Profile Header */}
      <section className="pt-24 pb-12">
        <div className="container mx-auto px-6 lg:px-24">
          <div className="bg-blue-50/20 rounded-[3rem] p-10 lg:p-16 relative overflow-hidden shadow-sm border border-slate-50">
             <div className="flex flex-col lg:flex-row items-center gap-12 relative z-10">
                <div className="h-48 w-48 shrink-0 rounded-full border-[6px] border-white shadow-2xl overflow-hidden bg-slate-100">
                   <Image src="https://ui-avatars.com/api/?name=John+Anderson&background=random" alt="John Anderson" width={192} height={192} className="object-cover" />
                </div>
                <div className="flex-1 space-y-6 text-center lg:text-left">
                   <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                      <div className="space-y-2">
                        <h1 className="text-3xl font-bold text-slate-800">John Anderson</h1>
                        <p className="text-sm font-bold text-slate-400">Assistant Professor at McMaster University</p>
                      </div>
                      <Link href="/courses">
                        <Button className="bg-cyan-400 hover:bg-cyan-500 text-white rounded-2xl px-12 h-14 font-black uppercase text-lg shadow-xl shadow-cyan-400/20 cursor-pointer">Explore Courses</Button>
                      </Link>
                   </div>
                   <p className="text-gray-500 leading-relaxed max-w-4xl font-medium">
                     Expert in literature and academic writing with over 15 years of experience in higher education. Dedicated to bringing classical works to life for modern students.
                   </p>
                   <div className="flex flex-col sm:flex-row items-center gap-8 pt-4">
                      <div className="flex items-center gap-2 text-slate-400 font-bold text-xs uppercase tracking-widest">
                         <Star size={16} className="text-amber-400 fill-amber-400" />
                         <span>4.9 Instructor Rating</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-400 font-bold text-xs uppercase tracking-widest">
                         <Users size={16} className="text-primary" />
                         <span>1,592 Students</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-400 font-bold text-xs uppercase tracking-widest">
                         <PlayCircle size={16} className="text-rose-400" />
                         <span>12 Courses</span>
                      </div>
                      <div className="flex gap-4 ml-auto">
                        <Twitter size={18} className="text-cyan-400 cursor-pointer" />
                        <Youtube size={18} className="text-rose-500 cursor-pointer" />
                        <Instagram size={18} className="text-pink-500 cursor-pointer" />
                      </div>
                   </div>
                </div>
             </div>
             {/* Background decoration */}
             <div className="absolute top-0 right-0 h-full w-1/4 bg-white/40 skew-x-[-15deg] -z-0"></div>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <section className="mb-16">
        <div className="container mx-auto px-6 lg:px-24">
           <div className="flex flex-wrap gap-4 items-center justify-center lg:justify-start">
              {tabs.map((tab, i) => (
                <button 
                  key={i} 
                  className={`px-10 py-3 rounded-xl font-bold text-sm tracking-wider shadow-sm transition cursor-pointer ${tab === "Book" ? "bg-cyan-400 text-white" : "bg-slate-100/50 text-slate-400 hover:bg-slate-100"}`}
                >
                  {tab}
                </button>
              ))}
           </div>
        </div>
      </section>

      {/* Book Grid */}
      <section className="container mx-auto px-6 lg:px-24">
        <h2 className="text-2xl font-bold text-slate-800 mb-12">Literature Courses & Resources</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {courses.map((course) => (
            <Link href={`/courses/${course._id}`} key={course._id}>
                <div className="bg-white rounded-[2rem] p-8 shadow-xl border border-slate-50 transition hover:scale-[1.03] cursor-pointer group h-full flex flex-col">
                   <div className="relative aspect-[3/4] rounded-2xl overflow-hidden mb-8 shadow-md">
                     <Image 
                        src={getImageUrl(course.imageCover, 'courses')} 
                        alt={course.title} 
                        fill 
                        className="object-cover group-hover:scale-105 transition duration-500" 
                    />
                   </div>
                   <h3 className="font-bold text-slate-800 mb-2 line-clamp-2">{course.title}</h3>
                   <p className="text-xs text-slate-400 line-clamp-2 mb-6">{course.description}</p>
                   <div className="flex items-center justify-between pt-4 mt-auto border-t border-slate-50">
                      <span className="text-sm font-bold text-slate-400 uppercase tracking-tight">Access Course</span>
                      <span className="text-xl font-bold text-cyan-400">${course.price}</span>
                   </div>
                </div>
            </Link>
          ))}
          
          {courses.length === 0 && (
              <div className="col-span-full py-20 text-center text-slate-400">
                  No literature resources found.
              </div>
          )}
        </div>

        {/* Pagination placeholder */}
        {courses.length > 0 && (
            <div className="flex items-center justify-center gap-4 mt-20">
               <button className="h-10 w-10 flex items-center justify-center rounded-lg bg-cyan-50/50 text-cyan-600 cursor-pointer"><ChevronLeft /></button>
               {[1, 2, 3].map((p) => (
                  <button key={p} className={`h-10 w-10 flex items-center justify-center rounded-lg font-bold transition cursor-pointer ${p === 1 ? "bg-cyan-400 text-white shadow-lg shadow-cyan-400/30" : "text-slate-400 hover:bg-slate-50"}`}>
                    {p}
                  </button>
               ))}
               <button className="h-10 w-10 flex items-center justify-center rounded-lg bg-cyan-50/50 text-cyan-600 cursor-pointer"><ChevronRight /></button>
            </div>
        )}
      </section>
    </div>
  );
}
