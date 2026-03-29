"use client";

import { usePathname, useRouter } from "next/navigation";
import {
    BookOpen,
    Users,
    LayoutDashboard,
    Settings,
    FileText,
    LogOut,
    Bell,
    Search,
    Menu,
    FolderTree,
    CreditCard,
    ShoppingBag,
    LayoutList
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useAuthStore } from "@/stores/useAuthStore";
import { logoutAction } from "@/features/auth/api/auth";
import { toast } from "sonner";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/routing";
import Image from "next/image";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const t = useTranslations("dashboard");
    const locale = useLocale();
    const { user, logout } = useAuthStore();
    const pathname = usePathname();
    const router = useRouter();

    const NAV_ITEMS = [
        { label: t("nav.dashboard"), icon: LayoutDashboard, href: "/dashboard" },
        { label: t("nav.courses"), icon: BookOpen, href: "/dashboard/courses" },
        { label: t("nav.lessons"), icon: LayoutList, href: "/dashboard/lessons" },
        { label: t("nav.categories"), icon: FolderTree, href: "/dashboard/categories" },
        { label: t("nav.exams"), icon: PenTool, href: "/dashboard/exams" },
        { label: t("nav.users"), icon: Users, href: "/dashboard/users" },
    ];

    const handleLogout = async () => {
        await logoutAction();
        logout();
        toast.success(t("logout"));
        router.push("/auth");
    };

    // Strip locale from pathname for active link comparison
    const normalizedPathname = pathname.replace(/^\/(en|ar)/, "") || "/";

    return (
        <div className="flex min-h-screen bg-[#F8F9FA] font-sans transition-all duration-500">
            {/* Sidebar */}
            <aside className={cn(
                "fixed inset-y-0 w-72 bg-white z-50 hidden lg:block overflow-y-auto transition-all duration-500 shadow-2xl",
                "left-0 border-r border-zinc-200 rtl:left-auto rtl:right-0 rtl:border-r-0 rtl:border-l"
            )}>
                <div className="flex h-20 items-center px-8 border-b border-zinc-100 rtl:flex-row-reverse">
                    <div className="flex items-center gap-3 rtl:flex-row-reverse">
                        <div className="size-10 rounded-xl bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/20">
                            <BookOpen className="size-6" />
                        </div>
                        <span className="text-xl font-bold text-zinc-900">
                            {t("title")}
                        </span>
                    </div>
                </div>

                <div className="flex flex-col p-6 gap-8 text-left rtl:text-right">
                    <div>
                        <p className="px-4 text-[11px] font-bold text-zinc-400 uppercase tracking-[0.2em] mb-4">
                            {t("mainMenu")}
                        </p>
                        <nav className="flex flex-col gap-1.5">
                            {NAV_ITEMS.map((item) => {
                                const isActive = normalizedPathname === item.href || (item.href !== "/" && normalizedPathname.startsWith(item.href));
                                return (
                                    <Link
                                        key={item.href}
                                        href={item.href as any}
                                        className={cn(
                                            "group flex items-center justify-between gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 rtl:flex-row-reverse",
                                            isActive
                                                ? "bg-primary text-white shadow-md shadow-primary/10"
                                                : "text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900"
                                        )}
                                    >
                                        <div className="flex items-center gap-3 rtl:flex-row-reverse">
                                            <item.icon className={cn("size-5 transition-transform duration-300 group-hover:scale-110", isActive ? "text-white" : "text-zinc-400 group-hover:text-primary")} />
                                            {item.label}
                                        </div>
                                        {isActive && (
                                            <motion.div layoutId="sidebar-active" className="h-1.5 w-1.5 rounded-full bg-white" />
                                        )}
                                    </Link>
                                );
                            })}
                        </nav>
                    </div>

                    <div>
                        <p className="px-4 text-[11px] font-bold text-zinc-400 uppercase tracking-[0.2em] mb-1">
                            {t("system")}
                        </p>
                        <nav className="flex flex-col gap-1.5">
                            <button
                                onClick={handleLogout}
                                className="w-full flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-red-500 hover:bg-red-50 transition-all duration-200 cursor-pointer rtl:flex-row-reverse rtl:text-right"
                            >
                                <LogOut className="size-5 rtl:rotate-180" />
                                {t("logout")}
                            </button>
                        </nav>
                    </div>
                </div>

                <div className="mt-auto p-6 text-left rtl:text-right">
                    <div className="bg-zinc-50 rounded-2xl p-4 border border-zinc-100 shadow-sm">
                        <div className="flex items-center gap-3 mb-3 rtl:flex-row-reverse">
                            <div className="size-10 rounded-full bg-zinc-200 overflow-hidden relative border border-zinc-300">
                                <Image 
                                    src={user?.profileImg || `https://ui-avatars.com/api/?name=${user?.name}&background=random`} 
                                    alt="Admin" 
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className="flex flex-col rtl:items-end">
                                <span className="text-sm font-bold text-zinc-900">{user?.name}</span>
                                <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">{user?.role}</span>
                            </div>
                        </div>
                        <Link href="/profile">
                            <Button variant="outline" size="sm" className="w-full rounded-lg cursor-pointer h-9 border-zinc-200 bg-white font-bold text-xs">
                                {t("viewProfile")}
                            </Button>
                        </Link>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <div className={cn(
                "flex-1 flex flex-col transition-all duration-500",
                "lg:pl-72 rtl:lg:pl-0 rtl:lg:pr-72"
            )}>
                {/* Header */}
                <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-zinc-200 h-20 px-4 md:px-8 flex items-center justify-between gap-4 rtl:flex-row-reverse">
                    <div className="flex items-center gap-4 flex-1 rtl:flex-row-reverse">
                        <Button variant="ghost" size="icon" className="lg:hidden">
                            <Menu className="size-6" />
                        </Button>
                        <div className="relative max-w-md w-full hidden md:block">
                            <Search className="absolute left-3 rtl:left-auto rtl:right-3 top-1/2 -translate-y-1/2 size-4 text-zinc-400" />
                            <input
                                type="text"
                                placeholder={t("search")}
                                className="w-full bg-zinc-100 border-none rounded-xl py-2.5 pl-10 pr-4 rtl:pl-4 rtl:pr-10 text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-all placeholder:text-zinc-500 text-left rtl:text-right"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-2 md:gap-4 rtl:flex-row-reverse">
                        <Button variant="ghost" size="icon" className="relative rounded-xl hover:bg-zinc-100 h-11 w-11 shadow-sm border border-transparent hover:border-zinc-200">
                            <Bell className="size-5 text-zinc-600" />
                            <span className="absolute top-2.5 right-2.5 rtl:right-auto rtl:left-2.5 size-2 rounded-full bg-red-500 border-2 border-white" />
                        </Button>

                        <div className="h-8 w-px bg-zinc-200 mx-1 hidden sm:block" />

                        <div className="flex items-center gap-3 pl-2 rtl:pl-0 rtl:pr-2 rtl:flex-row-reverse">
                            <div className="hidden sm:flex flex-col items-end rtl:items-start text-right rtl:text-left">
                                <span className="text-sm font-bold text-zinc-900">{user?.name}</span>
                                <span className="text-[10px] text-zinc-500 font-black uppercase tracking-widest">{t("lmsDashboard")}</span>
                            </div>
                            <div className="size-10 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center text-white font-black shadow-lg shadow-primary/20 text-lg">
                                {user?.name?.charAt(0).toUpperCase()}
                            </div>
                        </div>
                    </div>
                </header>

                {/* Dashboard Content */}
                <main className="p-4 md:p-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="max-w-[1600px] mx-auto">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}

const PenTool = ({ className }: { className?: string }) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M12 19l7-7 3 3-7 7-3-3z" />
        <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
        <path d="M2 2l7.5 1.5" />
        <path d="M10.4 10.4L22 22" />
    </svg>
);
