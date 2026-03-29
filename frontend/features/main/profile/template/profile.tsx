"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { User as UserIcon, ShieldCheck, LogOut, Trophy } from "lucide-react";
import { useAuthStore } from "@/stores/useAuthStore";
import { logoutAction } from "@/features/auth/api/auth";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import NavButton from "@/components/shared/navButton";
import { toast } from "sonner";
import ProfileSection from "../components/ProfileSection";
import SecuritySection from "../components/SecuritySection";
import ResultsSection from "../components/ResultsSection";
import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";
import { useTranslations, useLocale } from "next-intl";
import LoadingSpinner from "@/components/shared/LoadingSpinner";

export default function ProfilePage() {
  const t = useTranslations("profile");
  const rT = useTranslations("roles");
  const locale = useLocale();
  const router = useRouter();
  const { user, logout } = useAuthStore();
  const [activeTab, setActiveTab] = useState("profile");
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) {
      return <LoadingSpinner/>
  }

  const userData = user || {
    name: t("guest"),
    email: "guest@example.com",
    role: "user",
    active: false,
    phone: "",
    profileImg: "",
    createdAt: new Date().toISOString(),
  };

  const handleLogout = async () => {
    await logoutAction();
    logout();
    toast.success(t("logoutSuccess"));
    router.push("/auth");
  };

  return (
    <div className="container max-w-7xl mx-auto py-8 px-4 md:px-8 transition-colors duration-300 min-h-screen">
      <div className="flex flex-col md:flex-row items-center gap-6 mb-10 bg-card p-6 rounded-2xl border shadow-sm  text-left ">
        <div className="relative">
          <Avatar className="h-32 w-32 border-4 border-card shadow-2xl ring-4 ring-primary/10 transition-colors">
            <AvatarImage src={userData?.profileImg || undefined} alt={userData.name} className="object-cover" />
            <AvatarFallback className="text-4xl font-black bg-primary/5 dark:bg-primary/10 text-primary">
              {userData.name?.split(" ").map((n: string) => n[0]).join("").toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="absolute bottom-2 right-2  h-6 w-6 bg-emerald-500 border-4 border-card rounded-full shadow-lg" />
        </div>
        <div className="text-center md:text-left rtl:md:text-right space-y-2">
          <h1 className="text-3xl md:text-5xl font-black tracking-tighter text-foreground uppercase">{userData.name}</h1>
          <p className="text-muted-foreground font-bold text-lg">{userData.email}</p>
          <div className="flex flex-wrap justify-center md:justify-start  gap-4 mt-4">
             <Badge variant="secondary" className="px-4 py-1.5 rounded-full bg-muted text-muted-foreground font-bold text-[10px] uppercase tracking-widest border-none transition-colors">
               {t("joined")} {new Date(userData.createdAt).toLocaleDateString(locale === "ar" ? "ar-EG" : "en-US", { month: 'long', year: 'numeric' })}
             </Badge>
             <Badge className="px-4 py-1.5 rounded-full bg-primary/10 text-primary font-bold text-[10px] uppercase tracking-widest border-none">
               {userData.role.toLowerCase() as any}
             </Badge>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-12 rtl:lg:grid-cols-[1fr_300px]">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:block space-y-4 rtl:order-2">
          <div className="space-y-2 p-2 bg-card rounded-[2rem] border border-border shadow-sm transition-colors">
            <NavButton
              active={activeTab === "profile"}
              onClick={() => setActiveTab("profile")}
              icon={<UserIcon className="w-5 h-5" />}
              label={t("information")}
              
            />
            <NavButton
              active={activeTab === "results"}
              onClick={() => setActiveTab("results")}
              icon={<Trophy className="w-5 h-5" />}
              label={t("results")}
            />
            <NavButton
              active={activeTab === "security"}
              onClick={() => setActiveTab("security")}
              icon={<ShieldCheck className="w-5 h-5" />}
              label={t("security")}
            />
          </div>
          <div className="pt-2">
            <Button
              variant="destructive"
              className="w-full justify-start gap-4 h-14 rounded-2xl px-6 font-black uppercase tracking-widest text-xs hover:scale-[1.02] transition-transform shadow-lg shadow-rose-500/20"
              onClick={handleLogout}
            >
              <LogOut className="w-5 h-5 rtl:rotate-180" />
              {t("logoutSession")}
            </Button>
          </div>
        </aside>

        {/* Mobile Navigation */}
        <div className="lg:hidden mb-10 flex flex-wrap gap-3 ">
            <Button 
                variant={activeTab === "profile" ? "default" : "outline"} 
                size="sm" 
                onClick={() => setActiveTab("profile")} 
                className={cn("gap-2 h-11 px-6 rounded-xl font-bold transition-all rtl:flex-row-reverse", activeTab === "profile" && "shadow-lg shadow-primary/20")}
            >
                <UserIcon className="w-4 h-4" /> {t("profileNav")}
            </Button>
            <Button 
                variant={activeTab === "results" ? "default" : "outline"} 
                size="sm" 
                onClick={() => setActiveTab("results")} 
                className={cn("gap-2 h-11 px-6 rounded-xl font-bold transition-all rtl:flex-row-reverse", activeTab === "results" && "shadow-lg shadow-primary/20")}
            >
                <Trophy className="w-4 h-4" /> {t("resultsNav")}
            </Button>
            <Button 
                variant={activeTab === "security" ? "default" : "outline"} 
                size="sm" 
                onClick={() => setActiveTab("security")} 
                className={cn("gap-2 h-11 px-6 rounded-xl font-bold transition-all rtl:flex-row-reverse", activeTab === "security" && "shadow-lg shadow-primary/20")}
            >
                <ShieldCheck className="w-4 h-4" /> {t("securityNav")}
            </Button>
            <Button variant="destructive" size="sm" onClick={handleLogout} className="gap-2 h-11 px-6 rounded-xl font-bold shadow-lg shadow-rose-500/20 rtl:flex-row-reverse">
                <LogOut className="w-4 h-4 rtl:rotate-180" /> {t("logout")}
            </Button>
        </div>

        {/* Content Area */}
        <main className="min-h-[600px] animate-in fade-in duration-700 rtl:order-1">
          {activeTab === "profile" && <ProfileSection user={userData} />}
          {activeTab === "results" && <ResultsSection />}
          {activeTab === "security" && <SecuritySection />}
        </main>
      </div>
    </div>
  );
}
