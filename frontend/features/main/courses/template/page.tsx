"use client";

import { useState } from "react";
import { ChevronRight, ChevronLeft, Layout, Globe, BookOpen, PenTool, Database, Camera, Activity, Briefcase, Search, Compass, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCourses } from "../hooks/useCourse";
import { useAllCategories } from "../../../../features/dashboard/categories/hooks/useCategories";
import { cn } from "@/lib/utils";
import { useTranslations, useLocale } from "next-intl";
import { CourseCard } from "../components/CourseCard";
import { CourseSidebar } from "../components/CourseSidebar";
import { CourseMobileFilter } from "../components/CourseMobileFilter";
import EmptyState from "@/components/ui/EmptyState";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import GlobalError from "@/components/shared/globalerror";
import { motion } from "framer-motion";

const CATEGORY_ICONS: Record<string, any> = {
    "Design": <PenTool size={18} />,
    "Development": <Layout size={18} />,
    "Data Science": <Database size={18} />,
    "Business": <Briefcase size={18} />,
    "Marketing": <Globe size={18} />,
    "Photography": <Camera size={18} />,
    "Health": <Activity size={18} />,
    "Literature": <BookOpen size={18} />,
};

export default function CoursesPage() {
    const t = useTranslations("courses");
    const locale = useLocale();
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedCategory, setSelectedCategory] = useState("all");

    const { data: categoriesData} = useAllCategories({ limit: 10 });
    const categories = categoriesData?.data || [];

    const filterCategories = [
        { _id: "all", name: t("allPrograms"), icon: <Compass size={18} /> },
        ...categories.map((cat: any) => ({
            _id: cat._id,
            name: t.has(`categoryNames.${cat.name}`) ? t(`categoryNames.${cat.name}`) : (locale.startsWith("ar") ? (cat.name_ar || cat.name) : cat.name),
            icon: CATEGORY_ICONS[cat.name] || <BookOpen size={18} />
        }))
    ];

    const { data: coursesData, isLoading,error } = useCourses({
        page: currentPage,
        limit: 9,
        category: selectedCategory === "all" ? undefined : selectedCategory,
    });

    const courses = coursesData?.data || [];
    const pagination = coursesData?.paginationResult;

    if(error){
        return <GlobalError error={error} />
    }
    return (
        <div className="min-h-screen bg-muted/20">
            <header className="bg-card border-b border-border py-12">
                <div className="container mx-auto px-6 lg:px-24">
                        <motion.div 
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="flex flex-col md:flex-row md:items-end justify-between gap-6 text-left rtl:text-right"
                        >
                        <div className="space-y-2">
                            <div className="flex items-center gap-2 text-primary font-bold text-[10px] uppercase tracking-[0.3em] rtl:flex-row-reverse rtl:justify-end">
                                <GraduationCap size={16} />
                                <span>{t("academicPrograms")}</span>
                            </div>
                            <h1 className="text-3xl lg:text-5xl font-bold text-foreground tracking-tight">
                                {t("exploreSkills").split(" ").map((word: string, i: number) =>
                                    word.toLowerCase() === "skills" || word === "مهارات" ? <span key={i} className="text-primary mx-1">{word} </span> : word + " "
                                )}
                            </h1>
                        </div>
                        <div className="bg-muted px-6 py-4 rounded-2xl border border-border min-w-[180px]">
                            <p className="text-muted-foreground text-[10px] font-black uppercase tracking-widest mb-1">{t("availablePrograms")}</p>
                            <p className="text-3xl font-bold text-foreground tabular-nums">
                                {coursesData?.results}
                            </p>
                        </div>
                    </motion.div>
                </div>
            </header>

            <CourseMobileFilter
                filterCategories={filterCategories}
                selectedCategory={selectedCategory}
                onCategoryChange={(catId) => { setSelectedCategory(catId); setCurrentPage(1); }}
            />

            <div className="container mx-auto px-6 lg:px-24 py-12">
                <div className="flex flex-col lg:flex-row gap-12">
                    <motion.div
                        initial={{ opacity: 0, x: locale === "ar" ? 20 : -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <CourseSidebar
                            filterCategories={filterCategories}
                            selectedCategory={selectedCategory}
                            onCategoryChange={(catId) => { setSelectedCategory(catId); setCurrentPage(1); }}
                        />
                    </motion.div>

                    <main className="flex-1">
                        {isLoading ? (
                           <LoadingSpinner/>
                        ) : courses.length > 0 ? (
                                    <>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
                                            {courses.map((course, idx) => (
                                                <CourseCard key={course._id} course={course} index={idx} />
                                            ))}
                                        </div>

                                        {pagination && pagination.numberOfPages > 1 && (
                                            <div className="mt-20 flex items-center justify-center gap-3 rtl:flex-row-reverse">
                                                <Button
                                                    variant="outline"
                                                    disabled={currentPage === 1}
                                                    onClick={() => { setCurrentPage(prev => Math.max(1, prev - 1)); window.scrollTo({ top: 300, behavior: 'smooth' }); }}
                                                    className="h-11 w-11 rounded-xl border-border p-0 hover:bg-card hover:shadow-sm transition-all"
                                                >
                                                     <ChevronLeft size={18} />
                                                </Button>

                                                <div className="flex items-center gap-2 rtl:flex-row-reverse">
                                                    {[...Array(pagination.numberOfPages)].map((_, i) => (
                                                        <button
                                                            key={i + 1}
                                                            onClick={() => { setCurrentPage(i + 1); window.scrollTo({ top: 300, behavior: 'smooth' }); }}
                                                            className={cn(
                                                                "h-11 px-5 rounded-xl font-bold transition-all border text-sm",
                                                                currentPage === i + 1
                                                                    ? "bg-primary cursor-pointer border-primary text-background shadow-xl"
                                                                    : "bg-card cursor-pointer border-border text-muted-foreground hover:border-foreground/30"
                                                            )}
                                                        >
                                                            {i + 1}
                                                        </button>
                                                    ))}
                                                </div>

                                                <Button
                                                    variant="outline"
                                                    disabled={currentPage === pagination.numberOfPages}
                                                    onClick={() => { setCurrentPage(prev => Math.min(pagination.numberOfPages, prev + 1)); window.scrollTo({ top: 300, behavior: 'smooth' }); }}
                                                    className="h-11 w-11 rounded-xl border-border p-0 hover:bg-card hover:shadow-sm transition-all"
                                                >
                                                     <ChevronRight size={18} />
                                                </Button>
                                            </div>
                                        )}
                                    </>
                                ) : (
                        <EmptyState
                            icon={Search}
                            title={t("expansionInProgress")}
                            description={t("expansionDesc")}
                            actionLabel={t("browseAll")}
                            onAction={() => setSelectedCategory("all")}
                        />
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
}