"use client";

import { Star, Users } from "lucide-react";
import { cn } from "@/lib/utils";

interface CourseHeroProps {
  course: any;
  t: any;
  tContent: any;
  locale: string;
}

export function CourseHero({ course, t, tContent, locale }: CourseHeroProps) {
  return (
    <div className="relative w-full h-[50vh] lg:h-[55vh] overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 to-slate-900/90" />

      <div className="absolute inset-0 flex items-center container mx-auto px-6 lg:px-24">
        <div className="max-w-4xl text-white space-y-6 text-left rtl:text-right">
          <div className="flex flex-wrap items-center gap-3">
            <span className="bg-primary px-5 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-lg shadow-primary/30">
              {t.has(`categoryNames.${course.category?.name}`)
                ? t(`categoryNames.${course.category?.name}`)
                : ((locale.startsWith("ar") ? course.category?.name_ar : course.category?.name) || course.category?.name || t("uncategorized"))}
            </span>
            <div className="h-4 w-[1px] bg-white/20" />
            <span className="bg-white/10 backdrop-blur-md px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-widest text-white/90 border border-white/10">
              {t(course.level?.toLowerCase() || "beginner")}
            </span>
            <span className="text-white/70 text-sm font-bold">
              {t("updated")} {new Date(course.updatedAt).toLocaleDateString(locale.startsWith("ar") ? "ar-EG" : "en-US", { month: "short", year: "numeric" })}
            </span>
          </div>

          <h1 className="text-4xl lg:text-7xl font-black leading-tight tracking-tight uppercase max-md:text-2xl ">
            {tContent.has(`${course._id}.title`)
              ? tContent(`${course._id}.title`)
              : (locale.startsWith("ar") ? (course.title_ar || course.title) : course.title)}
          </h1>

          <div className="flex flex-wrap items-center gap-8 pt-4 ">
            <div className="flex items-center gap-3 ">
              <div className="flex  ">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={18} className={cn("transition-all", i < Math.floor(course.ratingsAverage || 5) ? "fill-amber-400 text-amber-400 " : "text-white/20")} />
                ))}
              </div>
              <span className="font-bold text-lg">{course.ratingsAverage || 5} <span className="text-white/50 text-sm font-medium">({course.ratingsQuantity || 0} {t("reviews")})</span></span>
            </div>
            <div className="h-6 w-[1px] bg-white/20 hidden sm:block" />
            <div className="flex items-center gap-3 max-[390px]:mb-5 ">
              <div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center ">
                <Users size={18} className="text-white" />
              </div>
              <span className="font-bold text-lg">
                {(course.enrolledCount || 0) > 999 ? `${((course.enrolledCount || 0) / 1000).toFixed(1)}k` : course.enrolledCount || 0}
                <span className="text-white/50 text-sm font-medium ml-2 rtl:ml-0 rtl:mr-2">{t("students")}</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
