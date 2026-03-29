"use client";

import { Grid3X3 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

interface CourseSidebarProps {
    filterCategories: any[];
    selectedCategory: string;
    onCategoryChange: (categoryId: string) => void;
}

export function CourseSidebar({
    filterCategories,
    selectedCategory,
    onCategoryChange
}: CourseSidebarProps) {
    const t = useTranslations("courses");

    return (
        <aside className="hidden lg:block w-72 shrink-0">
            <div className="top-12 space-y-8">
                <div className="space-y-4">
                    <h3 className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.3em] flex items-center gap-2 rtl:flex-row-reverse rtl:text-right">
                        <Grid3X3 size={14} />
                        {t("categories")}
                    </h3>
                    <nav className="flex flex-col gap-1.5">
                        {filterCategories.map((cat: any) => (
                            <button
                                key={cat._id}
                                onClick={() => onCategoryChange(cat._id)}
                                className={cn(
                                    "flex items-center gap-3 w-full px-5 py-3.5 rounded-2xl transition-all duration-300 group relative rtl:flex-row-reverse rtl:text-right",
                                    selectedCategory === cat._id
                                        ? "bg-primary text-white shadow-xl shadow-primary/20 translate-x-1 rtl:-translate-x-1"
                                        : "text-muted-foreground hover:text-primary hover:bg-card hover:shadow-sm"
                                )}
                            >
                                <div className={cn(
                                    "transition-transform duration-500 group-hover:scale-110",
                                    selectedCategory === cat._id ? "text-white" : "text-muted-foreground group-hover:text-primary"
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
            </div>
        </aside>
    );
}
