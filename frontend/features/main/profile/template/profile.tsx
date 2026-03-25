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

export default function ProfilePage() {
  const router = useRouter();
  const { user, logout } = useAuthStore();
  const [activeTab, setActiveTab] = useState("profile");
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) {
      return (
          <div className="flex justify-center items-center h-screen">
              <Spinner className="w-10 h-10 text-primary" />
          </div>
      );
  }

  const userData = user || {
    name: "Guest User",
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
    toast.success("Logged out successfully");
    router.push("/auth");
  };

  return (
    <div className="container max-w-7xl mx-auto py-8 px-4 md:px-8">
      <div className="flex flex-col md:flex-row items-center gap-6 mb-10 bg-card p-6 rounded-2xl border shadow-sm">
        <Avatar className="h-24 w-24 border-4 border-primary/10">
          <AvatarImage src={userData?.profileImg} alt={userData.name} />
          <AvatarFallback className="text-2xl font-bold bg-primary/5 text-primary">
            {userData.name?.split(" ").map((n: string) => n[0]).join("").toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="text-center md:text-left space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">{userData.name}</h1>
          <p className="text-muted-foreground">{userData.email}</p>
          <Badge variant="secondary" className="mt-2">Member since {userData.createdAt?.split("T")[0]}</Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
        <aside className="hidden lg:block space-y-2">
          <div className="space-y-1">
            <NavButton
              active={activeTab === "profile"}
              onClick={() => setActiveTab("profile")}
              icon={<UserIcon className="w-5 h-5" />}
              label="Profile Information"
            />
            <NavButton
              active={activeTab === "results"}
              onClick={() => setActiveTab("results")}
              icon={<Trophy className="w-5 h-5" />}
              label="My Results"
            />
            <NavButton
              active={activeTab === "security"}
              onClick={() => setActiveTab("security")}
              icon={<ShieldCheck className="w-5 h-5" />}
              label="Security & Privacy"
            />
          </div>
          <div className="pt-4 mt-4 border-t">
            <Button
              variant="destructive"
              className="w-full justify-start gap-3 h-11"
              onClick={handleLogout}
            >
              <LogOut className="w-5 h-5" />
              Logout
            </Button>
          </div>
        </aside>

        {/* Mobile Navigation */}
        <div className="lg:hidden mb-6 flex flex-wrap gap-2">
            <Button variant={activeTab === "profile" ? "default" : "outline"} size="sm" onClick={() => setActiveTab("profile")} className="gap-2">
                <UserIcon className="w-4 h-4" /> Profile
            </Button>
            <Button variant={activeTab === "results" ? "default" : "outline"} size="sm" onClick={() => setActiveTab("results")} className="gap-2">
                <Trophy className="w-4 h-4" /> Results
            </Button>
            <Button variant={activeTab === "security" ? "default" : "outline"} size="sm" onClick={() => setActiveTab("security")} className="gap-2">
                <ShieldCheck className="w-4 h-4" /> Security
            </Button>
            <Button variant="destructive" size="sm" onClick={handleLogout} className="gap-2">
                <LogOut className="w-4 h-4" /> Logout
            </Button>
        </div>

        {/* Content Area */}
        <main className="min-h-[500px]">
          {activeTab === "profile" && <ProfileSection user={userData} />}
          {activeTab === "results" && <ResultsSection />}
          {activeTab === "security" && <SecuritySection />}
        </main>
      </div>
    </div>
  );
}
