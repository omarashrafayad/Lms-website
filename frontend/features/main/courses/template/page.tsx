"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
    ChevronRight,
    ChevronLeft,
    Layout,
    Globe,
    BookOpen,
    Star,
    PenTool,
    Database,
    Camera,
    Activity,
    Briefcase,
    Loader2,
    Search,
    Filter,
    Clock,
    User,
    ArrowRight,
    X,
    TrendingUp,
    PlayCircle,
    CheckCircle2,
    Grid3X3,
    Compass
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
} from "@/components/ui/dialog";
import { useCourses } from "../hooks/useCourse";
import { useAllCategories } from "../../../../features/dashboard/categories/hooks/useCategories";
import { getImageUrl } from "@/lib/image.utils";
import { cn } from "@/lib/utils";

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
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");

    const { data: categoriesData } = useAllCategories({ limit: 10 });
    const categories = categoriesData?.data || [];

    const filterCategories = [
        { _id: "all", name: "All Programs", icon: <Compass size={18} /> },
        ...categories.map((cat: any) => ({
            _id: cat._id,
            name: cat.name,
            icon: CATEGORY_ICONS[cat.name] || <BookOpen size={18} />
        }))
    ];

    const { data: coursesData, isLoading } = useCourses({
        page: currentPage,
        limit: 9,
        category: selectedCategory === "all" ? undefined : selectedCategory,
        keyword: searchQuery || undefined
    });

    const courses = coursesData?.data || [];
    const pagination = coursesData?.paginationResult;

    const CourseCard = ({ course }: { course: any }) => (
        <Link href={`/courses/${course._id}`} className="block group">
            <div className="bg-white rounded-2xl overflow-hidden border border-slate-200/60 shadow-sm transition-all duration-500 hover:shadow-xl hover:border-primary/20 flex flex-col h-full bg-gradient-to-b from-white to-slate-50/20">
                <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                        src={getImageUrl(course.imageCover, 'courses')}
                        alt={course.title}
                        fill
                        unoptimized
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/60 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

                    <div className="absolute top-4 left-4">
                        <div className="bg-white/95 backdrop-blur-md px-3 py-1 rounded-lg shadow-sm">
                            <span className="text-[10px] font-bold text-slate-900 tracking-tight uppercase">{course.category?.name || 'Education'}</span>
                        </div>
                    </div>

                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                        <div className="flex items-center gap-1.5 px-2 py-1 bg-white/20 backdrop-blur-md border border-white/20 rounded-lg text-white">
                            <Clock size={12} />
                            <span className="text-[10px] font-bold">{course.duration || '12'}h</span>
                        </div>
                        <div className="bg-primary p-2 rounded-lg text-white transform translate-y-12 group-hover:translate-y-0 transition-transform duration-500 shadow-lg">
                            <PlayCircle size={16} />
                        </div>
                    </div>
                </div>

                <div className="p-5 flex-1 flex flex-col">
                    <div className="flex items-center gap-1 mb-2">
                        {[...Array(5)].map((_, i) => (
                            <Star key={i} size={12} className={cn("fill-primary text-primary", i >= Math.round(course.ratingsAverage || 5) && "text-slate-200 fill-transparent")} />
                        ))}
                        <span className="text-[10px] font-bold text-slate-400 ml-1">({course.ratingsQuantity || 0})</span>
                    </div>

                    <h3 className="font-bold text-slate-800 text-base leading-snug line-clamp-2 mb-4 group-hover:text-primary transition-colors">
                        {course.title}
                    </h3>

                    <div className="mt-auto pt-4 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <span className="text-xs font-medium text-slate-600 truncate max-w-[100px]">{course.instructor?.name || 'Expert'}</span>
                        </div>
                        <div className="text-right">
                            <span className="text-lg font-bold text-slate-900">${course.priceAfterDiscount || course.price}</span>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );

    if (isLoading) {
        return (
            <div className="flex h-screen items-center justify-center bg-white">
                <div className="flex flex-col items-center gap-6">
                    <div className="h-12 w-12 border-4 border-primary/10 border-t-primary rounded-full animate-spin" />
                    <p className="text-slate-400 font-medium animate-pulse">Initializing courses...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50/50">
            {/* Minimalist Header */}
            <header className="bg-white border-b border-slate-200 py-12">
                <div className="container mx-auto px-6 lg:px-24">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div className="space-y-2">
                            <div className="flex items-center gap-2 text-primary font-bold text-[10px] uppercase tracking-[0.3em]">
                                <GraduationCap size={16} />
                                <span>Academic Programs</span>
                            </div>
                            <h1 className="text-3xl lg:text-5xl font-bold text-slate-950 tracking-tight">
                                Explore <span className="text-primary">Skills</span> of Tomorrow.
                            </h1>
                        </div>
                        <div className="bg-slate-50 px-6 py-4 rounded-2xl border border-slate-100/50 min-w-[180px]">
                            <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-1">Available Programs</p>
                            <p className="text-3xl font-bold text-slate-950 tabular-nums">
                                {courses.length}
                            </p>
                        </div>
                    </div>
                </div>
            </header>
            {/* Mobile Filter Sticky Header */}
            <div className="lg:hidden sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-slate-100 py-4 shadow-sm">
                <div className="container mx-auto px-6">
                    <Dialog>
                        <DialogTrigger render={
                            <button className="flex items-center justify-between w-full px-4 py-2 bg-slate-50 border border-slate-100 rounded-xl shadow-sm">
                                <span className="text-xs font-bold text-slate-700">
                                    {filterCategories.find(c => c._id === selectedCategory)?.name || 'All Programs'}
                                </span>
                                <div className="p-1 px-2.5 bg-primary rounded-lg text-white">
                                    <Filter size={14} />
                                </div>
                            </button>
                        } />
                        <DialogContent className="max-w-[calc(100%-2rem)] w-full rounded-2xl p-6">
                            <DialogHeader className="mb-6">
                                <DialogTitle className="text-xl font-bold">Categories</DialogTitle>
                            </DialogHeader>
                            <div className="flex flex-col gap-2">
                                {filterCategories.map((cat: any) => (
                                    <DialogClose key={cat._id} render={
                                        <button
                                            onClick={() => { setSelectedCategory(cat._id); setCurrentPage(1); }}
                                            className={cn(
                                                "flex items-center gap-3 w-full p-4 rounded-xl transition-all",
                                                selectedCategory === cat._id ? "bg-primary/5 text-primary border border-primary/10" : "hover:bg-slate-50"
                                            )}
                                        >
                                            {cat.icon}
                                            <span className="text-xs font-bold">{cat.name}</span>
                                        </button>
                                    } />
                                ))}
                            </div>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="container mx-auto px-6 lg:px-24 py-12">
                <div className="flex flex-col lg:flex-row gap-12">

                    {/* Desktop Sidebar Sidebar */}
                    <aside className="hidden lg:block w-72 shrink-0">
                        <div className="sticky top-12 space-y-8">
                            <div className="space-y-4">
                                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] flex items-center gap-2">
                                    <Grid3X3 size={14} />
                                    Categories
                                </h3>
                                <nav className="flex flex-col gap-1.5">
                                    {filterCategories.map((cat: any) => (
                                        <button
                                            key={cat._id}
                                            onClick={() => { setSelectedCategory(cat._id); setCurrentPage(1); }}
                                            className={cn(
                                                "flex items-center gap-3 w-full px-5 py-3.5 rounded-2xl transition-all duration-300 group relative",
                                                selectedCategory === cat._id
                                                    ? "bg-primary text-white shadow-xl shadow-primary/20 translate-x-1"
                                                    : "text-slate-500 hover:text-primary hover:bg-white hover:shadow-sm"
                                            )}
                                        >
                                            <div className={cn(
                                                "transition-transform duration-500 group-hover:scale-110",
                                                selectedCategory === cat._id ? "text-white" : "text-slate-300 group-hover:text-primary"
                                            )}>
                                                {cat.icon}
                                            </div>
                                            <span className="text-sm font-bold">{cat.name}</span>
                                            {selectedCategory === cat._id && (
                                                <div className="absolute right-4 w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                                            )}
                                        </button>
                                    ))}
                                </nav>
                            </div>

                            <div className="p-6 rounded-[2rem] bg-slate-900 text-white relative overflow-hidden shadow-2xl">
                                <h4 className="text-sm font-bold mb-2 relative z-10">Premium Access</h4>
                                <p className="text-[10px] text-slate-400 mb-6 leading-relaxed relative z-10">Get unlimited access to all expert-led programs.</p>
                                <Button className="w-full bg-primary hover:bg-primary/90 text-white rounded-xl h-10 font-bold text-xs relative z-10">
                                    Explore Plans
                                </Button>
                                <div className="absolute -bottom-6 -right-6 h-24 w-24 bg-white/5 rounded-full blur-2xl" />
                            </div>
                        </div>
                    </aside>

                    {/* Courses Grid Body */}
                    <main className="flex-1">
                        {courses.length > 0 ? (
                            <>
                                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
                                    {courses.map((course) => (
                                        <CourseCard key={course._id} course={course} />
                                    ))}
                                </div>

                                {/* Pagination */}
                                {pagination && pagination.numberOfPages > 1 && (
                                    <div className="mt-20 flex items-center justify-center gap-3">
                                        <Button
                                            variant="outline"
                                            disabled={currentPage === 1}
                                            onClick={() => { setCurrentPage(prev => Math.max(1, prev - 1)); window.scrollTo({ top: 300, behavior: 'smooth' }); }}
                                            className="h-11 w-11 rounded-xl border-slate-200 p-0 hover:bg-white hover:shadow-sm transition-all"
                                        >
                                            <ChevronLeft size={18} />
                                        </Button>

                                        <div className="flex items-center gap-2">
                                            {[...Array(pagination.numberOfPages)].map((_, i) => (
                                                <button
                                                    key={i + 1}
                                                    onClick={() => { setCurrentPage(i + 1); window.scrollTo({ top: 300, behavior: 'smooth' }); }}
                                                    className={cn(
                                                        "h-11 px-5 rounded-xl font-bold transition-all border text-sm",
                                                        currentPage === i + 1
                                                            ? "bg-slate-950 border-slate-950 text-white shadow-xl"
                                                            : "bg-white border-slate-100 text-slate-400 hover:border-slate-300"
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
                                            className="h-11 w-11 rounded-xl border-slate-200 p-0 hover:bg-white hover:shadow-sm transition-all"
                                        >
                                            <ChevronRight size={18} />
                                        </Button>
                                    </div>
                                )}
                            </>
                        ) : (
                            <div className="py-32 flex flex-col items-center justify-center bg-white rounded-3xl border border-slate-100 shadow-sm border-dashed">
                                <div className="bg-slate-50 p-6 rounded-3xl mb-6 shadow-inner">
                                    <Search className="text-slate-300" size={48} />
                                </div>
                                <h3 className="text-2xl font-bold text-slate-800 mb-2 tracking-tight">Expansion in Progress</h3>
                                <p className="text-slate-400 font-medium text-center max-w-sm">We are currently curating more programs for this specialization. Stay tuned.</p>
                                <Button
                                    variant="link"
                                    onClick={() => { setSelectedCategory("all"); }}
                                    className="text-primary font-bold mt-4"
                                >
                                    Browse All Programs
                                </Button>
                            </div>
                        )}
                    </main>

                </div>
            </div>
        </div>
    );
}

const GraduationCap = ({ size }: { size: number }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
        <path d="M6 12v5c3 3 9 3 12 0v-5" />
    </svg>
);
