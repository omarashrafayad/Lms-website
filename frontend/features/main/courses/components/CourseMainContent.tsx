"use client";

import { PlayCircle, Clock, Book, Users, Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface CourseMainContentProps {
  course: any;
  t: any;
  tContent: any;
  tLessonContent: any;
  locale: string;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  previewLesson: any;
  setPreviewLesson: (lesson: any) => void;
  getEmbedUrl: (url: string) => string;
}

export function CourseMainContent({
  course,
  t,
  tContent,
  tLessonContent,
  locale,
  activeTab,
  setActiveTab,
  previewLesson,
  setPreviewLesson,
  getEmbedUrl
}: CourseMainContentProps) {
  return (
    <div className="flex-1 space-y-12">
      <div className="bg-card rounded-[2.5rem] p-8 lg:p-12 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)] border border-border">
        {/* Custom Tabs Navigation */}
        <div className="flex items-center border-b border-border mb-10 overflow-x-auto no-scrollbar">
          {["Overview", "Lessons"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "px-8 py-5 font-black text-sm uppercase tracking-widest relative transition-all whitespace-nowrap cursor-pointer",
                activeTab === tab ? "text-primary" : "text-muted-foreground hover:text-foreground"
              )}
            >
              {t(tab.toLowerCase())}
              {activeTab === tab && <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-primary rounded-full" />}
            </button>
          ))}
        </div>

        {activeTab === "Overview" ? (
          <div className="prose prose-slate dark:prose-invert max-w-none text-left rtl:text-right">
            <h2 className="text-3xl font-black text-foreground mb-8 flex items-center gap-3 ">
              <div className="h-8 w-1.5 bg-primary rounded-full" />
              {t("aboutCourse")}
            </h2>
            <div className="text-muted-foreground leading-relaxed text-lg space-y-6">
              {(tContent.has(`${course._id}.description`)
                ? tContent(`${course._id}.description`)
                : (locale.startsWith("ar") ? (course.description_ar || course.description) : course.description)).split('\n').map((para: string, idx: number) => (
                  <p key={idx}>{para}</p>
                ))}
            </div>

            {/* Instructor Mini Card */}
            <div className="mt-16 p-8 rounded-3xl bg-muted border border-border flex flex-col md:flex-row items-center gap-8">
              <div className="h-24 w-24 rounded-2xl bg-primary/10 flex items-center justify-center overflow-hidden shrink-0 border-4 border-card shadow-xl">
                <Users size={40} className="text-primary" />
              </div>
              <div className="text-center md:text-left rtl:md:text-right space-y-2">
                <p className="text-primary font-black uppercase tracking-widest text-xs">{"Instructor"}</p>
                <h3 className="text-2xl font-black text-foreground">{course.instructor?.name || "Professional Instructor"}</h3>
                <p className="text-muted-foreground font-medium">{t("senior")}</p>
              </div>
            </div>

            {/* Rating Summary */}
            <div className="mt-16 bg-slate-900 dark:bg-black rounded-[2.5rem] p-10 lg:p-14 text-white">
              <div className="grid md:grid-cols-2 gap-12 items-center rtl:text-right text-left">
                <div className="space-y-6 text-center md:text-left rtl:md:text-right">
                  <h3 className="text-2xl font-black">{t("feedback")}</h3>
                  <div className="space-y-2">
                    <div className="text-7xl font-black text-primary">{course.ratingsAverage || 5}</div>
                    <div className="flex items-center justify-center md:justify-start rtl:md:justify-end gap-1">
                      {[...Array(5)].map((_, i) => <Star key={i} size={20} className={i < Math.floor(course.ratingsAverage || 5) ? "fill-amber-400 text-amber-400" : "text-white/20"} />)}
                    </div>
                    <p className="text-white/50 font-bold uppercase tracking-widest text-xs pt-2">{t("rating")}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {[5, 4, 3, 2, 1].map((num) => (
                    <div key={num} className="flex items-center gap-6 rtl:flex-row-reverse">
                      <span className="text-xs font-bold text-white/40 w-14 shrink-0">{num} {t("stars")}</span>
                      <div className="flex-1 h-2.5 bg-white/5 rounded-full overflow-hidden border border-white/5">
                        <div className="h-full bg-primary transition-all duration-1000" style={{ width: `${num === 5 ? 85 : num === 4 ? 12 : 1}%` }} />
                      </div>
                      <span className="text-xs font-bold text-white/40 w-10 text-right rtl:text-left">{num === 5 ? '85%' : num === 4 ? '12%' : '1%'}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Course Curriculum */}
              <div className="mt-16 space-y-8 pt-10 border-t border-white/10">
                <h3 className="text-2xl font-black text-white uppercase tracking-tight flex items-center gap-3">
                  <div className="h-6 w-1 bg-primary rounded-full" />
                  {t("curriculum")}
                </h3>
                <div className="grid grid-cols-1 gap-4">
                  {course.lessons && course.lessons.length > 0 ? (
                    [...course.lessons].sort((a: any, b: any) => (a.order || 0) - (b.order || 0)).map((lesson: any, i: number) => (
                      <div
                        key={i}
                        onClick={() => {
                          setPreviewLesson(lesson);
                          setActiveTab("Lessons");
                        }}
                        className={cn(
                          "group flex flex-col md:flex-row items-center justify-between p-6 rounded-[2.5rem] border transition-all duration-500 cursor-pointer",
                          previewLesson?._id === lesson._id
                            ? "bg-white border-transparent shadow-[0_20px_40px_-12px_rgba(0,0,0,0.3)] scale-[1.02]"
                            : "bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20"
                        )}
                      >
                        <div className="flex items-center gap-6 w-full ">
                          <div className={cn(
                            "h-14 w-14 rounded-full shadow-sm flex items-center justify-center shrink-0 font-black transition-all duration-500",
                            previewLesson?._id === lesson._id
                              ? "bg-primary text-white scale-110 shadow-lg shadow-primary/30"
                              : "bg-white/10 text-white border border-white/10 group-hover:bg-primary group-hover:text-white"
                          )}>
                            {i + 1}
                          </div>
                          <div className="space-y-1.5 text-left rtl:text-right flex-1">
                            <h4 className={cn(
                              "font-black text-lg transition-colors duration-300",
                              previewLesson?._id === lesson._id ? "text-slate-900" : "text-white"
                            )}>
                                {tLessonContent.has(`${lesson._id}.title`)
                                  ? tLessonContent(`${lesson._id}.title`)
                                  : (locale.startsWith("ar") ? (lesson.title_ar || lesson.title) : lesson.title)}
                              </h4>
                            <div className="flex items-center gap-5 text-[10px] font-bold uppercase tracking-[0.2em] ">
                              <span className={cn(
                                "flex items-center gap-2 transition-colors",
                                previewLesson?._id === lesson._id ? "text-primary" : "text-white/40"
                              )}>
                                <PlayCircle size={14} className={cn(previewLesson?._id === lesson._id ? "fill-primary/10" : "opacity-40")} />
                                {t("video")}
                              </span>
                              <span className={cn(
                                "flex items-center gap-2 transition-colors",
                                previewLesson?._id === lesson._id ? "text-primary/70" : "text-white/40"
                              )}>
                                <Clock size={14} className="opacity-40" />
                                {lesson.duration || '5:00'}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-20 bg-white/5 rounded-[3rem] border-2 border-dashed border-white/10">
                      <Book className="size-16 text-white/20 mx-auto mb-4" />
                      <p className="text-white/40 font-bold uppercase tracking-widest">{t("noLessons")}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-12 animate-in fade-in duration-700">
            {previewLesson ? (
              <div className="space-y-10">
                <div className="space-y-4 px-2 text-left rtl:text-right">
                  <div className="flex items-center gap-3 text-primary font-black uppercase tracking-widest text-[10px] rtl:flex-row-reverse">
                    <div className="px-2 py-0.5 rounded bg-primary/10 border border-primary/20">{t("learningNow")}</div>
                    <span className="text-muted-foreground">{t("lesson")} {(course.lessons?.indexOf(previewLesson) ?? -1) + 1}</span>
                  </div>
                  <h2 className="text-4xl lg:text-5xl font-black text-foreground tracking-tight">
                    {tLessonContent.has(`${previewLesson._id}.title`)
                      ? tLessonContent(`${previewLesson._id}.title`)
                      : (locale.startsWith("ar") ? (previewLesson.title_ar || previewLesson.title) : previewLesson.title)}
                  </h2>
                </div>

                {/* Video player */}
                <div className="relative aspect-video rounded-[2.5rem] overflow-hidden bg-slate-900 shadow-2xl border border-border group">
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
                      <p className="font-black uppercase tracking-widest text-sm">{t("noPreview")}</p>
                    </div>
                  )}
                </div>

                <div className="px-2 text-left rtl:text-right">
                  <h3 className="text-xl font-black text-foreground uppercase tracking-tight flex items-center gap-3 mb-4 rtl:flex-row-reverse">
                    <div className="h-6 w-1 bg-primary rounded-full" />
                    {t("aboutLesson")}
                  </h3>
                  <p className="text-muted-foreground font-medium leading-relaxed text-lg max-w-4xl">
                    {tLessonContent.has(`${previewLesson._id}.description`)
                      ? tLessonContent(`${previewLesson._id}.description`)
                      : ((locale.startsWith("ar") ? (previewLesson.description_ar || previewLesson.description) : previewLesson.description) || "In this session, we dive into the module's core objectives and implementation strategies.")}
                  </p>
                </div>
              </div>
            ) : (
              <div className="text-center py-20 bg-muted/30 rounded-[3rem] border-2 border-dashed border-border">
                <PlayCircle className="size-16 text-muted-foreground/30 mx-auto mb-4" />
                <p className="text-muted-foreground font-bold uppercase tracking-widest">{t("selectToStart")}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
