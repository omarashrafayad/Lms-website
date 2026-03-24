"use client";

import { Globe, Layout, Loader2 } from "lucide-react";
import { useHome } from "../hooks/useHome";
import CourseRow from "./courseRow";

export function ExploreCourse() {
  const { data: homeData, isLoading } = useHome();

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  const newCourses = homeData?.newCourses || [];
  const trendingCourses = homeData?.trendingCourses || [];

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
