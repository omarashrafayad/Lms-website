"use client";

import { useState } from "react";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { LoginForm } from "../components/login-form";
import { RegisterForm } from "../components/register-form";
import { useTranslations, useLocale } from "next-intl";

export default function AuthPage() {
  const t = useTranslations("auth");
  const locale = useLocale();
  const [mode, setMode] = useState<"login" | "register">("login");

  const loginImage = "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2670&auto=format&fit=crop";
  const registerImage = "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2670&auto=format&fit=crop";

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 p-4 md:p-8">
      <Card className="flex w-full max-w-6xl overflow-hidden rounded-3xl border-none shadow-2xl flex-col md:flex-row rtl:md:flex-row-reverse">
        <div className="relative w-full h-48 md:h-auto md:w-1/2 bg-primary/10 max-md:hidden">
          <Image
            src={mode === "login" ? loginImage : registerImage}
            alt="Study"
            fill
            unoptimized
            className="object-cover transition-all duration-700 ease-in-out"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          <div className="absolute bottom-8 left-8 right-8 text-white text-left rtl:text-right">
            <h2 className="text-3xl font-bold leading-tight drop-shadow-xl">
              {t("heroTitle")}
            </h2>
            <p className="mt-2 text-md opacity-90">
              {t("heroDesc")}
            </p>
          </div>
        </div>

        <div className="flex w-full flex-col bg-card p-6 md:p-12 lg:p-16 md:w-1/2">
          <div className="mx-auto w-full max-w-sm space-y-8">
            <div className="text-center">
              <h1 className="text-3xl font-bold tracking-tight text-foreground">
                {t("welcome")}
              </h1>
              <p className="text-sm text-muted-foreground mt-2">
                {t("authFooter")}
              </p>
            </div>

            <div className="flex h-12 w-full items-center justify-between rounded-full bg-muted/50 p-1">
              <Button
                variant={mode === "login" ? "default" : "ghost"}
                onClick={() => setMode("login")}
                className={cn(
                  "h-full w-1/2 rounded-full text-sm font-semibold transition-all duration-300",
                  mode === "login" ? "shadow-md" : "hover:bg-muted"
                )}
              >
                {t("login")}
              </Button>
              <Button
                variant={mode === "register" ? "default" : "ghost"}
                onClick={() => setMode("register")}
                className={cn(
                  "h-full w-1/2 rounded-full text-sm font-semibold transition-all duration-300",
                  mode === "register" ? "shadow-md" : "hover:bg-muted"
                )}
              >
                {t("register")}
              </Button>
            </div>

            {mode === "login" ? <LoginForm /> : <RegisterForm />}
          </div>
        </div>
      </Card>
    </div>
  );
}