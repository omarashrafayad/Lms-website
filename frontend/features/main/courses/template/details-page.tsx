"use client";

import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import { useCourse } from "../hooks/useCourse";
import { useParams } from "next/navigation";
import { Link } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { useTranslations, useLocale } from "next-intl";
import { CourseHero } from "../components/CourseHero";
import { CourseMainContent } from "../components/CourseMainContent";
import { CourseDetailsSidebar } from "../components/CourseDetailsSidebar";
import LoadingSpinner from "@/components/shared/LoadingSpinner";

export default function CourseDetailsPage() {
  const t = useTranslations("courseDetails");
  const tContent = useTranslations("courseContent");
  const tLessonTitle = useTranslations("lessonTitle");
  const tLessonDescription = useTranslations("lessonDescription");
  const locale = useLocale();
  const { id } = useParams() as { id: string };
  const { data: courseData, isLoading } = useCourse(id);

  const [activeTab, setActiveTab] = useState("Overview");
  const [previewLesson, setPreviewLesson] = useState<any>(null);

  useEffect(() => {
    const lessons = courseData?.data?.lessons;
    if (lessons && lessons.length > 0 && !previewLesson) {
      const sorted = [...lessons].sort((a: any, b: any) => (a.order || 0) - (b.order || 0));
      setPreviewLesson(sorted[0]);
    }
  }, [courseData, previewLesson]);

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
    return <LoadingSpinner/>
  }

  const course = courseData?.data;
  if (!course) return <div className="p-20 text-center font-bold">{t("notFound")}</div>;

  return (
    <div className="bg-background min-h-screen pb-20">
      <div className="bg-card/80 backdrop-blur-md  top-0 z-50 border-b border-border">
        <div className="container mx-auto px-6 lg:px-24 h-15">
          <Link href="/courses" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors font-bold group">
            <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center group-hover:bg-primary/10 transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={cn("group-hover:translate-x-[-2px] transition-transform", locale === "ar" && "rotate-180 group-hover:translate-x-[2px]")}>
                <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            {t("backToCourses")}
          </Link>
        </div>
      </div>

      <CourseHero
        course={course}
        t={t}
        tContent={tContent}
        locale={locale}
      />

      <div className="container mx-auto px-6 lg:px-24">
        <div className="flex flex-col lg:flex-row gap-12 -mt-8 relative z-20">

          <CourseMainContent
            course={course}
            t={t}
            tContent={tContent}
            tLessonTitle={tLessonTitle}
            tLessonDescription={tLessonDescription}
            locale={locale}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            previewLesson={previewLesson}
            setPreviewLesson={setPreviewLesson}
            getEmbedUrl={getEmbedUrl}
          />
          <CourseDetailsSidebar
            course={course}
            t={t}
            locale={locale}
          />
        </div>
      </div>
    </div>
  );
}
