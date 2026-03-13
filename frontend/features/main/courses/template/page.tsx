"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronRight, ChevronLeft, Layout, Globe, BookOpen, Star, PenTool, Database, Camera, Activity, Briefcase, Loader2 } from "lucide-react";
import { useCourses } from "../hooks/useCourse";
import { getImageUrl } from "@/lib/image.utils";
import { cn } from "@/lib/utils";

const TOP_CATEGORIES = [
    { name: "Design", icon: <PenTool size={32} /> },
    { name: "Development", icon: <Layout size={32} /> },
    { name: "Data Science", icon: <Database size={32} /> },
    { name: "Business", icon: <Briefcase size={32} /> },
    { name: "Marketing", icon: <Globe size={32} /> },
    { name: "Photography", icon: <Camera size={32} /> },
    { name: "Health", icon: <Activity size={32} /> },
    { name: "Literature", icon: <BookOpen size={32} /> },
];

export default function CoursesPage() {
  const { data: coursesData, isLoading } = useCourses();

  const courses = coursesData?.data || [];

  const CourseCard = ({ course, isProgress = false }: { course: any; isProgress?: boolean }) => (
    <Link href={`/courses/${course._id}`} className="block">
        <div className="bg-white rounded-[2rem] p-6 shadow-xl border border-slate-50 transition hover:scale-[1.02] cursor-pointer h-full flex flex-col group">
          <div className="relative aspect-video rounded-2xl overflow-hidden mb-6">
            <Image 
                src={getImageUrl(course.imageCover, 'courses')} 
                alt={course.title} 
                fill 
                className="object-cover group-hover:scale-105 transition-transform duration-500" 
            />
          </div>
          <div className="space-y-4 flex-1 flex flex-col">
            {!isProgress && (
              <div className="flex items-center justify-between text-[10px] font-bold tracking-widest text-slate-400 uppercase">
                 <span>{course.category?.name || 'Education'}</span>
                 <span>3 Month</span>
              </div>
            )}
            <h4 className="font-bold text-slate-800 leading-snug line-clamp-2 h-12">{course.title}</h4>
            <div className="flex items-center gap-2 mt-auto">
               <div className="h-8 w-8 rounded-full overflow-hidden bg-slate-100 border border-primary/10">
                  <Image src={`https://ui-avatars.com/api/?name=${course.instructor?.name || 'A'}&background=random`} alt="Author" width={32} height={32} />
               </div>
               <span className="text-xs font-bold text-slate-700">{course.instructor?.name || 'Admin'}</span>
            </div>
            
            {isProgress ? (
              <div className="pt-4 space-y-2">
                 <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-primary w-2/3 rounded-full" />
                 </div>
                 <p className="text-[10px] text-slate-400 font-bold text-right uppercase tracking-widest">Lesson 5 of 7</p>
              </div>
            ) : (
              <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                 <div className="flex items-center gap-1">
                   {course.priceAfterDiscount && <span className="text-xs font-bold text-slate-300 line-through">${course.price}</span>}
                   <span className="text-sm font-bold text-primary">${course.priceAfterDiscount || course.price}</span>
                 </div>
                 <div className="flex items-center gap-1">
                    <Star size={12} className="fill-amber-400 text-amber-400" />
                    <span className="text-xs font-bold text-slate-400">{course.ratingsAverage || 5}</span>
                 </div>
              </div>
            )}
          </div>
        </div>
    </Link>
  );

  if (isLoading) {
      return (
          <div className="flex min-h-screen items-center justify-center">
              <Loader2 className="h-12 w-12 animate-spin text-primary" />
          </div>
      );
  }

  return (
    <div className="bg-white min-h-screen">
      {/* Welcome & Progress Section */}
      <section className="py-20 bg-blue-50/20">
        <div className="container mx-auto px-6 lg:px-24">
          <div className="flex items-center justify-between mb-12">
            <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Welcome back, ready for your next lesson?</h1>
            <button className="text-primary font-bold text-sm hover:underline uppercase tracking-widest cursor-pointer">View History</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.slice(0, 3).map((course) => (
                <CourseCard key={course._id} course={course} isProgress={true} />
            ))}
            {courses.length === 0 && <p className="text-gray-400 col-span-full text-center py-10">No recent courses found.</p>}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-24">
        <div className="container mx-auto px-6 lg:px-24">
          <h2 className="text-3xl font-bold text-slate-800 mb-16">Choice favourite course from top category</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {TOP_CATEGORIES.map((cat, i) => (
              <div key={i} className="bg-white rounded-[2rem] p-8 shadow-xl border border-slate-50 text-center space-y-6 group cursor-pointer transition hover:-translate-y-2">
                <div className="mx-auto h-16 w-16 flex items-center justify-center bg-cyan-50/50 rounded-2xl group-hover:bg-cyan-500 group-hover:text-white transition-colors duration-300 text-cyan-600">
                   {cat.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-800">{cat.name}</h3>
                <p className="text-xs text-slate-400 leading-relaxed font-medium">
                  Explore thousands of courses in {cat.name.toLowerCase()} and master your skills.
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
            {courses.slice(0, 4).map((course) => (
                <CourseCard key={course._id} course={course} />
            ))}
          </div>
          {courses.length > 4 && (
               <div className="flex justify-end gap-3 mt-10">
                 <button className="h-10 w-10 flex items-center justify-center rounded-lg bg-cyan-100 text-cyan-600 cursor-pointer"><ChevronLeft /></button>
                 <button className="h-10 w-10 flex items-center justify-center rounded-lg bg-cyan-500 text-white shadow-lg cursor-pointer"><ChevronRight /></button>
               </div>
          )}
        </div>
      </section>

      {/* Banner */}
      <section className="py-16">
        <div className="container mx-auto px-6 lg:px-24">
           <div className="bg-slate-900 rounded-[3rem] p-16 text-center text-white space-y-6">
              <h2 className="text-3xl font-bold uppercase tracking-wider">Online coaching lessons for remote learning.</h2>
              <p className="text-slate-400 max-w-2xl mx-auto">
                Join our premium community of learners and get access to high-quality educational content today.
              </p>
              <Button className="bg-primary hover:bg-primary/90 text-white rounded-xl px-12 h-14 font-bold cursor-pointer">Start learning now</Button>
           </div>
        </div>
      </section>

       {/* Latest Courses Section */}
      <section className="py-24">
        <div className="container mx-auto px-6 lg:px-24">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-bold text-slate-800">Latest added courses</h2>
            <Link href="/courses" className="text-primary font-bold text-sm hover:underline uppercase tracking-widest">See all</Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {courses.slice(0, 8).map((course) => (
                <CourseCard key={course._id} course={course} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
