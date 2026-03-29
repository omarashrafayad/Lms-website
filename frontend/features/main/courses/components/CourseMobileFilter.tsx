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
                        <div className="flex flex-col gap-2">
                            {filterCategories.map((cat: any) => (
                                <DialogClose 
                                    key={cat._id} 
                                    render={
                                        <Button
                                            variant="ghost"
                                            onClick={() => onCategoryChange(cat._id)}
                                            className={cn(
                                                "flex items-center gap-3 w-full p-6 h-auto rounded-xl transition-all rtl:flex-row-reverse rtl:text-right",
                                                selectedCategory === cat._id ? "bg-primary/5 text-primary border border-primary/10" : "hover:bg-muted"
                                            )}
                                        />
                                    }
                                >
                                    <>
                                        {cat.icon}
                                        <span className="text-xs font-bold">{cat.name}</span>
                                    </>
                                </DialogClose>
                            ))}
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
}
