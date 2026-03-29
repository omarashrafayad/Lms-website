"use client";

import React from 'react';
import Link from 'next/link';
import { FileQuestion, Home, ArrowLeft } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function NotFound() {
    const t = useTranslations("notFound");

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-[#0a0b0c] flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 transition-colors duration-300 relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute top-0 left-0 w-full h-full -z-10 pointer-events-none">
                <div className="absolute top-[10%] left-[10%] w-64 h-64 bg-primary/5 rounded-full blur-[80px]" />
                <div className="absolute bottom-[10%] right-[10%] w-96 h-96 bg-blue-500/5 rounded-full blur-[100px]" />
            </div>

            <div className="max-w-2xl w-full text-center space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-1000">
                <div className="relative">
                    {/* Big 404 in background */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] dark:opacity-[0.05] select-none">
                        <span className="text-[20rem] font-black tracking-tighter">404</span>
                    </div>
                    
                    <div className="relative z-10 flex flex-col items-center">
                        {/* Shimmering Icon Container */}
                        <div className="relative group">
                            <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl group-hover:bg-primary/30 transition-all duration-500" />
                            <div className="relative w-32 h-32 bg-white dark:bg-zinc-900 rounded-[2.5rem] shadow-2xl flex items-center justify-center mb-8 border border-white/50 dark:border-zinc-800 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                                <FileQuestion className="w-16 h-16 text-primary" />
                            </div>
                        </div>

                        <h1 className="text-5xl font-black text-slate-800 dark:text-white tracking-tight sm:text-7xl mb-4">
                            {t("title")}
                        </h1>
                        <p className="mt-4 text-xl text-slate-500 dark:text-slate-400 max-w-lg mx-auto font-medium leading-relaxed">
                            {t("description")}
                        </p>
                    </div>
                </div>

                <div className="mt-12 flex flex-col sm:flex-row gap-6 justify-center items-center">
                    <Link
                        href="/"
                        className="group flex items-center justify-center px-10 py-5 bg-primary text-white text-lg font-black rounded-2xl shadow-xl shadow-primary/30 hover:shadow-primary/40 hover:scale-105 active:scale-95 transition-all duration-300 w-full sm:w-auto uppercase tracking-widest"
                    >
                        <Home className="w-6 h-6 mr-3 rtl:mr-0 rtl:ml-3 group-hover:-translate-y-1 transition-transform" />
                        {t("backHome")}
                    </Link>
                    
                    <Link
                        href="/"
                        className="flex items-center justify-center px-10 py-5 bg-white dark:bg-zinc-900 text-slate-700 dark:text-slate-200 text-lg font-bold rounded-2xl border-2 border-slate-200 dark:border-zinc-800 hover:bg-slate-50 dark:hover:bg-zinc-800/80 hover:border-primary/30 transition-all duration-300 w-full sm:w-auto"
                    >
                        <ArrowLeft className="w-5 h-5 mr-3 rtl:mr-0 rtl:ml-3 rtl:rotate-180" />
                        {t("contactSupport")}
                    </Link>
                </div>

                {/* Footer simple mark */}
                <div className="pt-12 border-t border-slate-200 dark:border-zinc-800 max-w-[200px] mx-auto opacity-50">
                    <p className="text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.5em]">
                        TOTC ACADEMY
                    </p>
                </div>
            </div>
        </div>
    );
}
