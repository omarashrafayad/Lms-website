"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Star, Check, Users, Share2, Facebook, Twitter, Instagram, Youtube, Linkedin, PlayCircle, Loader2, Clock, Book } from "lucide-react";
import { useCourse } from "../hooks/useCourse";
import { useAddToCart } from "../../checkout/hooks/useCheckout";
import { useParams, useRouter } from "next/navigation";
import { getImageUrl } from "@/lib/image.utils";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function CourseDetailsPage() {
  const { id } = useParams() as { id: string };
  const { data: courseData, isLoading } = useCourse(id);
  const addToCartMutation = useAddToCart();
  const router = useRouter();

  const [activeTab, setActiveTab] = useState("Overview");
  const [previewLesson, setPreviewLesson] = useState<any>(null);

  // Auto-select first lesson for fixed preview
  useEffect(() => {
    const lessons = courseData?.data?.lessons;
    if (lessons && lessons.length > 0 && !previewLesson) {
      const sorted = [...lessons].sort((a: any, b: any) => (a.order || 0) - (b.order || 0));
      setPreviewLesson(sorted[0]);
    }
  }, [courseData, previewLesson]);

  // Helper to convert YouTube URL to embed URL
  const getEmbedUrl = (url: string) => {
    if (!url) return '';
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    if (match && match[2].length === 11) {
      return `https://www.youtube.com/embed/${match[2]}?autoplay=1`;
    }
    return url;
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  const course = courseData?.data;
  if (!course) return <div>Course not found</div>;

  return (
    <div className="bg-[#fafbfc] min-h-screen pb-20">
      {/* Navigation Header */}
      <div className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-100">
        <div className="container mx-auto px-6 lg:px-24 h-20 flex items-center justify-between">
          <Link href="/courses" className="flex items-center gap-2 text-slate-500 hover:text-primary transition-colors font-bold group">
            <div className="h-8 w-8 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="group-hover:translate-x-[-2px] transition-transform">
                <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            Back to Courses
          </Link>
          <div className="hidden md:flex items-center gap-4">
            <button className="h-10 w-10 flex items-center justify-center rounded-xl bg-slate-50 text-slate-400 hover:text-primary transition-all cursor-pointer">
              <Share2 size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Hero Banner Section */}
      <div className="relative w-full h-[50vh] lg:h-[55vh] overflow-hidden">
        {/* Blurred Background Image */}
        <Image
          src={getImageUrl(course.imageCover, 'courses')}
          alt=""
          fill
          unoptimized
          className="object-cover blur-2xl scale-110 opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 to-slate-900/90" />

        <div className="absolute inset-0 flex items-center container mx-auto px-6 lg:px-24">
          <div className="max-w-4xl text-white space-y-6">
            <div className="flex flex-wrap items-center gap-3">
              <span className="bg-primary px-5 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-lg shadow-primary/30">
                {course.category?.name || "Uncategorized"}
              </span>
              <div className="h-4 w-[1px] bg-white/20" />
              <span className="bg-white/10 backdrop-blur-md px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-widest text-white/90 border border-white/10">
                {course.level || "Beginner"}
              </span>
              <div className="h-1 w-1 rounded-full bg-white/30" />
              <span className="text-white/70 text-sm font-bold">
                Updated {new Date(course.updatedAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
              </span>
            </div>

            <h1 className="text-4xl lg:text-7xl font-black leading-tight tracking-tight">
              {course.title}
            </h1>

            <div className="flex flex-wrap items-center gap-8 pt-4">
              <div className="flex items-center gap-3">
                <div className="flex -space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={18} className={cn("transition-all", i < Math.floor(course.ratingsAverage || 5) ? "fill-amber-400 text-amber-400" : "text-white/20")} />
                  ))}
                </div>
                <span className="font-bold text-lg">{course.ratingsAverage || 5} <span className="text-white/50 text-sm font-medium">({course.ratingsQuantity || 0} reviews)</span></span>
              </div>
              <div className="h-6 w-[1px] bg-white/20 hidden sm:block" />
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center">
                  <Users size={18} className="text-white" />
                </div>
                <span className="font-bold text-lg">
                  {(course.enrolledCount || 0) > 999 ? `${((course.enrolledCount || 0) / 1000).toFixed(1)}k` : course.enrolledCount || 0}
                  <span className="text-white/50 text-sm font-medium ml-2">Students</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 lg:px-24">
        <div className="flex flex-col lg:flex-row gap-12 -mt-20 relative z-20">

          {/* Main Content Area */}
          <div className="flex-1 space-y-12">
            <div className="bg-white rounded-[2.5rem] p-8 lg:p-12 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)] border border-slate-100">
              {/* Custom Tabs Navigation */}
              <div className="flex items-center border-b border-slate-100 mb-10 overflow-x-auto no-scrollbar">
                {["Overview", "Lessons"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={cn(
                      "px-8 py-5 font-black text-sm uppercase tracking-widest relative transition-all whitespace-nowrap cursor-pointer",
                      activeTab === tab ? "text-primary" : "text-slate-400 hover:text-slate-600"
                    )}
                  >
                    {tab}
                    {activeTab === tab && <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-primary rounded-full" />}
                  </button>
                ))}
              </div>

              {activeTab === "Overview" ? (
                <div className="prose prose-slate max-w-none">
                  <h2 className="text-3xl font-black text-slate-800 mb-8 flex items-center gap-3">
                    <div className="h-8 w-1.5 bg-primary rounded-full" />
                    About this course
                  </h2>
                  <div className="text-slate-500 leading-relaxed text-lg space-y-6">
                    {course.description.split('\n').map((para: string, idx: number) => (
                      <p key={idx}>{para}</p>
                    ))}
                  </div>

                  {/* Instructor Mini Card - Moved here */}
                  <div className="mt-16 p-8 rounded-3xl bg-slate-50 border border-slate-100 flex flex-col md:flex-row items-center gap-8">
                    <div className="h-24 w-24 rounded-2xl bg-primary/10 flex items-center justify-center overflow-hidden shrink-0 border-4 border-white shadow-xl">
                      <Users size={40} className="text-primary" />
                    </div>
                    <div className="text-center md:text-left space-y-2">
                      <p className="text-primary font-black uppercase tracking-widest text-xs">Instructor</p>
                      <h3 className="text-2xl font-black text-slate-800">{course.instructor?.name || "Professional Instructor"}</h3>
                      <p className="text-slate-500 font-medium">Senior Expert & Dedicated Educator with 10+ years of experience in the field.</p>
                    </div>
                  </div>

                  {/* Rating Summary Section - Moved here */}
                  <div className="mt-16 bg-slate-900 rounded-[2.5rem] p-10 lg:p-14 text-white">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                      <div className="space-y-6 text-center md:text-left">
                        <h3 className="text-2xl font-black">Student Feedback</h3>
                        <div className="space-y-2">
                          <div className="text-7xl font-black text-primary">{course.ratingsAverage || 5}</div>
                          <div className="flex items-center justify-center md:justify-start gap-1">
                            {[...Array(5)].map((_, i) => <Star key={i} size={20} className={i < Math.floor(course.ratingsAverage || 5) ? "fill-amber-400 text-amber-400" : "text-white/20"} />)}
                          </div>
                          <p className="text-white/50 font-bold uppercase tracking-widest text-xs pt-2">Course Rating</p>
                        </div>
                      </div>

                      <div className="space-y-4">
                        {[5, 4, 3, 2, 1].map((num) => (
                          <div key={num} className="flex items-center gap-6">
                            <span className="text-xs font-bold text-white/40 w-14 shrink-0">{num} Stars</span>
                            <div className="flex-1 h-2.5 bg-white/5 rounded-full overflow-hidden border border-white/5">
                              <div className="h-full bg-primary shadow-[0_0_12px_rgba(var(--primary),0.5)] transition-all duration-1000" style={{ width: `${num === 5 ? 85 : num === 4 ? 12 : 1}%` }} />
                            </div>
                            <span className="text-xs font-bold text-white/40 w-10 text-right">{num === 5 ? '85%' : num === 4 ? '12%' : '1%'}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    {/* Curriculum Playlist moved here to keep Lessons tab clean */}
                    <div className="mt-16 space-y-8 pt-10 border-t border-slate-100">
                      <h3 className="text-2xl font-black text-slate-800 uppercase tracking-tight flex items-center gap-3">
                        <div className="h-6 w-1 bg-primary rounded-full" />
                        Course Curriculum
                      </h3>
                      <div className="grid grid-cols-1 gap-4">
                        {course.lessons && course.lessons.length > 0 ? (
                          [...course.lessons].sort((a: any, b: any) => (a.order || 0) - (b.order || 0)).map((lesson: any, i: number) => (
                            <div
                              key={i}
                              onClick={() => {
                                setPreviewLesson(lesson);
                                setActiveTab("Lessons"); // Switch to Lessons tab when clicked
                              }}
                              className={cn(
                                "group flex flex-col md:flex-row items-center justify-between p-6 rounded-[2rem] border transition-all duration-300 cursor-pointer",
                                previewLesson?._id === lesson._id
                                  ? "bg-white border-primary shadow-2xl shadow-primary/10"
                                  : "bg-slate-50/50 border-slate-100 hover:bg-white hover:border-slate-200"
                              )}
                            >
                              <div className="flex items-center gap-6 w-full">
                                <div className={cn(
                                  "h-14 w-14 rounded-2xl shadow-sm flex items-center justify-center shrink-0 border font-black transition-all",
                                  previewLesson?._id === lesson._id
                                    ? "bg-primary text-white border-primary"
                                    : "bg-white text-primary border-slate-50 group-hover:bg-primary group-hover:text-white"
                                )}>
                                  {i + 1}
                                </div>
                                <div className="space-y-1">
                                  <h4 className="font-black text-slate-800 text-lg">{lesson.title}</h4>
                                  <div className="flex items-center gap-4 text-xs font-bold text-slate-400 uppercase tracking-widest">
                                    <span className="flex items-center gap-1.5">
                                      <PlayCircle size={14} className={cn(previewLesson?._id === lesson._id ? "text-primary" : "text-slate-300")} />
                                      Video
                                    </span>
                                    <span className="flex items-center gap-1.5">
                                      <Clock size={14} className={cn(previewLesson?._id === lesson._id ? "text-primary" : "text-slate-300")} />
                                      {lesson.duration || '5:00'}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="text-center py-20 bg-slate-50/50 rounded-[3rem] border-2 border-dashed border-slate-100">
                            <Book className="size-16 text-slate-200 mx-auto mb-4" />
                            <p className="text-slate-400 font-bold uppercase tracking-widest">No lessons uploaded yet</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-12 animate-in fade-in duration-700">
                  {/* Integrated Player Section - REORDERED */}
                  {previewLesson ? (
                    <div className="space-y-10">
                      {/* 1. Header/Title First */}
                      <div className="space-y-4 px-2">
                        <div className="flex items-center gap-3 text-primary font-black uppercase tracking-widest text-[10px]">
                          <div className="px-2 py-0.5 rounded bg-primary/10 border border-primary/20">Learning Now</div>
                          <span className="text-slate-400">Lesson {course.lessons.indexOf(previewLesson) + 1}</span>
                        </div>
                        <h2 className="text-4xl lg:text-5xl font-black text-slate-800 tracking-tight">{previewLesson.title}</h2>
                      </div>

                      {/* 2. Video Second */}
                      <div className="relative aspect-video rounded-[2.5rem] overflow-hidden bg-slate-900 shadow-2xl border border-slate-100 group">
                        {previewLesson.videoUrl ? (
                          <iframe
                            className="w-full h-full"
                            src={getEmbedUrl(previewLesson.videoUrl)}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          ></iframe>
                        ) : (
                          <div className="absolute inset-0 flex flex-col items-center justify-center text-white/40 space-y-4">
                            <PlayCircle size={64} className="opacity-20" />
                            <p className="font-black uppercase tracking-widest text-sm">No Preview Available</p>
                          </div>
                        )}
                      </div>

                      {/* 3. Description Bottom */}
                      <div className="px-2">
                        <h3 className="text-xl font-black text-slate-800 uppercase tracking-tight flex items-center gap-3 mb-4">
                          <div className="h-6 w-1 bg-primary rounded-full" />
                          About This Lesson
                        </h3>
                        <p className="text-slate-500 font-medium leading-relaxed text-lg max-w-4xl">
                          {previewLesson.description || "In this session, we dive into the module's core objectives and implementation strategies. Make sure to follow the step-by-step instructions provided in the video."}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-20 bg-slate-50/50 rounded-[3rem] border-2 border-dashed border-slate-100">
                      <PlayCircle className="size-16 text-slate-200 mx-auto mb-4" />
                      <p className="text-slate-400 font-bold uppercase tracking-widest">Select a lesson from the Overview to start</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar Area */}
          <div className="w-full lg:w-[420px] shrink-0">
            <div className="bg-white rounded-[2.5rem] p-8 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.12)] border border-slate-100 sticky top-28">
              {/* Course Preview Container */}
              <div className="relative aspect-[16/10] rounded-3xl overflow-hidden mb-8 shadow-2xl border-4 border-slate-50 group">
                {/* Background filler for contain */}
                <div className="absolute inset-0 bg-slate-900" />
                <Image
                  src={getImageUrl(course.imageCover, 'courses')}
                  unoptimized
                  alt="Preview"
                  fill
                  className="object-contain"
                />
                {/* Glass Overlay for Play Button */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/50 transition-all duration-500 backdrop-blur-[2px] group-hover:backdrop-blur-none">
                  <div className="relative">
                    <div className="absolute inset-0 bg-primary/30 rounded-full blur-2xl animate-pulse" />
                    <button className="relative h-20 w-20 flex items-center justify-center bg-white rounded-full text-primary scale-100 hover:scale-110 transition-transform shadow-2xl">
                      <PlayCircle size={40} className="fill-primary" />
                    </button>
                  </div>
                </div>
              </div>
              <div className="space-y-8">
                <div className="pt-8 border-t border-slate-100 space-y-6">
                  <h4 className="font-black text-slate-800 text-lg flex items-center gap-2">
                    Course Inclusions
                  </h4>
                  <div className="grid grid-cols-1 gap-4">
                    {["Full lifetime access", "Access on all devices", "Certification of completion", "Money Back Guarantee"].map((feat, i) => (
                      <div key={i} className="flex items-center gap-4 text-sm text-slate-600 font-bold bg-slate-50 p-4 rounded-2xl border border-slate-100/50">
                        <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                          <Check size={14} className="text-primary" />
                        </div>
                        {feat}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-8 border-t border-slate-100 space-y-5">
                  <h4 className="font-black text-slate-800 text-sm uppercase tracking-widest">Share with friends</h4>
                  <div className="flex items-center gap-3">
                    {[Facebook, Twitter, Instagram, Youtube, Linkedin].map((Icon, i) => (
                      <button key={i} className="h-12 w-12 flex items-center justify-center rounded-2xl bg-slate-50 text-slate-400 hover:text-white hover:bg-primary transition-all hover:shadow-xl hover:shadow-primary/20 cursor-pointer">
                        <Icon size={20} />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
