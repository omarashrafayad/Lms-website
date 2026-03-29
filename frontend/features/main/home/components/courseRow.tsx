"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { getImageUrl } from "@/lib/image.utils";
import { cn } from "@/lib/utils";
import { Link } from "@/i18n/routing";
import { ChevronRight, Star } from "lucide-react";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import { motion } from "framer-motion";

export default function CourseRow({ title, icon, courses }: { title: string; icon: any; courses: any[] }) {
  const locale = useLocale();
  const t = useTranslations("hero");
  const tc = useTranslations("courses");
  const td = useTranslations("courseDetails");
  const tContent = useTranslations("courseContent");
  
  return (
    <div className="mb-16">
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex items-center justify-between mb-8"
      >
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 flex items-center justify-center bg-muted rounded-lg">
            {icon}
          </div>
          <h3 className="text-2xl font-bold text-foreground">{title}</h3>
        </div>
        <Link href="/courses" className="flex items-center gap-1 text-primary font-bold hover:underline">
          {t("seeAll")} <ChevronRight size={20} className="rtl:rotate-180" />
        </Link>
      </motion.div>
      <div className="flex flex-col lg:flex-row gap-8 items-stretch">
        <div className="w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {courses.map((course: any, idx: number) => (
              <motion.div 
                key={course._id} 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: idx * 0.2, ease: "easeOut" }}
                className="bg-card rounded-3xl overflow-hidden shadow-xl p-6 border border-border flex flex-col text-left rtl:text-right"
              >
                <div className="relative h-40 w-full rounded-2xl overflow-hidden mb-4">
                  <Image
                    src={getImageUrl(course.imageCover, 'courses')}
                    alt={course.title}
                    fill
                    unoptimized
                    className="object-cover"
                  />
                </div>
                <div className="flex items-center gap-2 mb-2">
                  {course.category && (
                    <span className="text-[10px] font-bold uppercase tracking-wider text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                      {tc(`categoryNames.${course.category.name}`)}
                    </span>
                  )}
                  {course.level && (
                    <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                      {td(course.level.toLowerCase())}
                    </span>
                  )}
                </div>
                <h4 className="text-lg font-bold text-foreground mb-2 line-clamp-2">
                  {tContent.has(`${course._id}.title`) ? tContent(`${course._id}.title`) : course.title}
                </h4>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xs text-muted-foreground">{course.instructor?.name}</span>
                </div>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {tContent.has(`${course._id}.description`) ? tContent(`${course._id}.description`) : course.description}
                </p>
                <div className="flex items-center justify-between mt-auto">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => <Star key={i} size={14} className={cn("fill-amber-400 text-amber-400", i >= (course.ratingsAverage || 5) && "fill-muted text-muted-foreground")} />)}
                  </div>
                  <span className="text-lg font-bold text-foreground">${course.price}</span>
                </div>
                <Link href={`/courses/${course._id}`} className="mt-4">
                  <Button className="w-full rounded-full bg-card border-primary border text-primary hover:bg-primary hover:text-white transition-colors h-10 uppercase font-bold tracking-wider text-xs cursor-pointer">
                    {t("explore")}
                  </Button>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}