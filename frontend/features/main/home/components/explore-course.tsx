"use client";

import Image from "next/image";
import { Star, Globe, Layout, BookOpen, ChevronRight, Loader2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useHome } from "../hooks/useHome";
import { getImageUrl } from "@/lib/image.utils";

export function ExploreCourse() {
  const { data: homeData, isLoading } = useHome();

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  const newCourses = homeData?.data?.newCourses || [];
  const trendingCourses = homeData?.data?.trendingCourses || [];
  const categories = homeData?.data?.categories || [];

  const CategoryColors = [
      "bg-orange-500", "bg-pink-400", "bg-amber-800", "bg-amber-500", "bg-purple-500", "bg-blue-500", "bg-green-500"
  ];

  const CourseRow = ({ title, icon, courses }: { title: string; icon: any; courses: any[] }) => (
    <div className="mb-16">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 flex items-center justify-center bg-gray-100 rounded-lg">
            {icon}
          </div>
          <h3 className="text-2xl font-bold text-gray-900">{title}</h3>
        </div>
        <Link href="/courses" className="flex items-center gap-1 text-primary font-bold hover:underline">
          SEE ALL <ChevronRight size={20} />
        </Link>
      </div>
      
      <div className="flex flex-col lg:flex-row gap-8 items-stretch">
        <div className="flex flex-wrap gap-4 lg:w-1/2">
            {categories.slice(0, 6).map((cat, i) => (
                <div key={i} className="relative h-48 w-24 rounded-full overflow-hidden flex flex-col items-center justify-center p-4 group transition hover:scale-105 cursor-pointer">
                    <div className={`absolute inset-0 ${CategoryColors[i % CategoryColors.length]} opacity-80 group-hover:opacity-100`}></div>
                    <span className="relative z-10 text-white font-bold text-sm [writing-mode:vertical-rl] rotate-180">
                        {cat.name}
                    </span>
                </div>
            ))}
        </div>
        
        <div className="lg:w-1/2 w-full grid grid-cols-1 md:grid-cols-2 gap-6">
          {courses.slice(0, 2).map((course) => (
            <div key={course._id} className="bg-white rounded-3xl overflow-hidden shadow-xl p-6 border border-gray-50 flex flex-col">
              <div className="relative h-40 w-full rounded-2xl overflow-hidden mb-4">
                <Image 
                  src={getImageUrl(course.imageCover, 'courses')} 
                  alt={course.title} 
                  fill 
                  className="object-cover"
                />
              </div>
              <h4 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">{course.title}</h4>
              <p className="text-sm text-gray-500 mb-4 line-clamp-2">
                {course.description}
              </p>
              <div className="flex items-center justify-between mt-auto">
                <div className="flex items-center gap-1">
                   {[...Array(5)].map((_, i) => <Star key={i} size={14} className={cn("fill-amber-400 text-amber-400", i >= (course.ratingsAverage || 5) && "fill-gray-200 text-gray-200")} />)}
                </div>
                <span className="text-lg font-bold text-gray-900">${course.price}</span>
              </div>
              <Link href={`/courses/${course._id}`} className="mt-4">
                <Button className="w-full rounded-full bg-white border-primary border text-primary hover:bg-primary hover:text-white transition-colors h-10 uppercase font-bold tracking-wider text-xs cursor-pointer">
                  Explore
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6 lg:px-24">
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-gray-900">Explore Course</h2>
          <p className="mt-4 text-gray-500">Find the right course for your career path.</p>
        </div>

        <CourseRow title="New Courses" icon={<Layout className="text-gray-600" size={24} />} courses={newCourses} />
        <CourseRow title="Trending Courses" icon={<Globe className="text-gray-600" size={24} />} courses={trendingCourses} />
      </div>
    </section>
  );
}

import { cn } from "@/lib/utils";
