"use client";

import { Filter } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
} from "@/components/ui/dialog";

interface CourseMobileFilterProps {
    filterCategories: any[];
    selectedCategory: string;
    onCategoryChange: (categoryId: string) => void;
}

export function CourseMobileFilter({ 
    filterCategories, 
    selectedCategory, 
    onCategoryChange 
}: CourseMobileFilterProps) {
    const t = useTranslations("courses");

    return (
        <div className="lg:hidden top-30 z-40 bg-card/80 backdrop-blur-xl border-b border-border py-4 shadow-sm">
            <div className="container mx-auto px-6">
                <Dialog>
                    <DialogTrigger 
                        render={<Button variant="outline" className="flex items-center justify-between w-full px-4 h-12 bg-muted border border-border rounded-xl shadow-sm rtl:flex-row-reverse" />}
                    >
                        <span className="text-xs font-bold text-foreground">
                                {filterCategories.find(c => c._id === selectedCategory)?.name || t('allPrograms')}
                            </span>
                            <div className="p-1 px-2.5 bg-primary rounded-lg text-white">
                                <Filter size={14} />
                            </div>
                    </DialogTrigger>
                    <DialogContent className="max-w-[calc(100%-2rem)] w-full rounded-2xl p-6">
                        <DialogHeader className="mb-6">
                            <DialogTitle className="text-xl font-bold rtl:text-right">{t("categories")}</DialogTitle>
                        </DialogHeader>
                        <div className="grid grid-cols-2 gap-3">
                            {filterCategories.map((cat: any) => (
                                <DialogClose 
                                    key={cat._id} 
                                    render={
                                        <Button
                                            variant="ghost"
                                            onClick={() => onCategoryChange(cat._id)}
                                            className={cn(
                                                "flex flex-col items-center justify-center gap-3 w-full p-4 h-auto rounded-xl transition-all",
                                                selectedCategory === cat._id ? "bg-primary/5 text-primary border border-primary/20" : "hover:bg-muted bg-card border border-border"
                                            )}
                                        />
                                    }
                                >
                                    <div className="flex flex-col items-center gap-2">
                                        <div className={cn(
                                            "p-2 rounded-lg",
                                            selectedCategory === cat._id ? "bg-primary text-white" : "bg-muted text-muted-foreground"
                                        )}>
                                            {cat.icon}
                                        </div>
                                        <span className="text-[10px] font-bold text-center line-clamp-1">{cat.name}</span>
                                    </div>
                                </DialogClose>
                            ))}
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
}
