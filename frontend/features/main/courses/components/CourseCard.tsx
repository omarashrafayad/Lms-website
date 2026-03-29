"use client";

import Image from "next/image";
import { Clock, PlayCircle, Star } from "lucide-react";
import { Link } from "@/i18n/routing";
import { getImageUrl } from "@/lib/image.utils";
import { cn } from "@/lib/utils";
import { useTranslations, useLocale } from "next-intl";
import { motion } from "framer-motion";

interface CourseCardProps {
    course: any;
    index?: number;
}

export const CourseCard = ({ course, index = 0 }: CourseCardProps) => {
    const t = useTranslations("courses");
    const tContent = useTranslations("courseContent");
    const locale = useLocale();

    return (
        <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: .7, delay:  0.3 }}
            whileHover={{ y: -8 }}
            className="h-full"
        >
            <Link href={`/courses/${course._id}`} className="block group h-full">
                <div className="bg-card rounded-2xl overflow-hidden border border-border shadow-sm transition-all duration-500 hover:shadow-xl hover:border-primary/20 flex flex-col h-full text-left rtl:text-right">
                <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                        src={getImageUrl(course.imageCover, 'courses')}
                        alt={course.title}
                        fill
                        unoptimized
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/60 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

                    <div className="absolute top-4 left-4 rtl:left-auto rtl:right-4">
                        <div className="bg-white/95 backdrop-blur-md px-3 py-1 rounded-lg shadow-sm">
                            <span className="text-[10px] font-bold text-slate-900 tracking-tight uppercase">
                                {t.has(`categoryNames.${course.category?.name}`)
                                    ? t(`categoryNames.${course.category?.name}`)
                                    : ((locale.startsWith("ar") ? (course.category?.name_ar || course.category?.name) : course.category?.name) || course.category?.name || t('education'))}
                            </span>
                        </div>
                    </div>

                    <div className="absolute bottom-4 left-4 right-4 rtl:flex-row-reverse flex items-center justify-between">
                        <div className="flex items-center gap-1.5 px-2 py-1 bg-white/20 backdrop-blur-md border border-white/20 rounded-lg text-white rtl:flex-row-reverse">
                            <Clock size={12} />
                            <span className="text-[10px] font-bold">{course.duration || '12'} {t("hours")}</span>
                        </div>
                        <div className="bg-primary p-2 rounded-lg text-white transform translate-y-12 group-hover:translate-y-0 transition-transform duration-500 shadow-lg">
                            <PlayCircle size={16} className="rtl:rotate-180" />
                        </div>
                    </div>
                </div>

                <div className="p-5 flex-1 flex flex-col">
                    <div className="flex items-center gap-1 mb-2 rtl:flex-row-reverse">
                        <div className="flex items-center gap-1 rtl:flex-row-reverse">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} size={12} className={cn("fill-amber-400 text-amber-400", i >= Math.round(course.ratingsAverage || 5) && "text-muted fill-transparent")} />
                            ))}
                        </div>
                        <span className="text-[10px] font-bold text-muted-foreground ml-1 rtl:ml-0 rtl:mr-1">({course.ratingsQuantity || 0})</span>
                    </div>

                    <h3 className="font-bold text-foreground text-base leading-snug line-clamp-2 mb-4 group-hover:text-primary transition-colors">
                        {tContent.has(`${course._id}.title`)
                            ? tContent(`${course._id}.title`)
                            : (locale.startsWith("ar") ? (course.title_ar || course.title) : course.title)}
                    </h3>

                    <div className="mt-auto pt-4 flex items-center justify-between rtl:flex-row-reverse">
                        <div className="flex items-center gap-2">
                            <span className="text-xs font-medium text-muted-foreground truncate max-w-[100px]">{course.instructor?.name || t('expert')}</span>
                        </div>
                        <div className="text-right rtl:text-left">
                            <span className="text-lg font-bold text-foreground">${course.priceAfterDiscount || course.price}</span>
                        </div>
                    </div>
                </div>
                </div>
            </Link>
        </motion.div>
    );
};
