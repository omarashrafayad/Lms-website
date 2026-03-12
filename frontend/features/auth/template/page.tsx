"use client";

import { useState } from "react";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { LoginForm } from "@/components/auth/login-form";
import { RegisterForm } from "@/components/auth/register-form";

export default function AuthPage() {
  const [mode, setMode] = useState<"login" | "register">("login");

  // Random school images from Unsplash
  const loginImage = "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2670&auto=format&fit=crop";
  const registerImage = "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=2673&auto=format&fit=crop";

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 p-4 md:p-8">
      <Card className="flex w-full max-w-6xl overflow-hidden rounded-3xl border-none shadow-2xl">
        {/* Left Section - Image Area */}
        <div className="relative hidden w-1/2 md:block">
          <Image
            src={mode === "login" ? loginImage : registerImage}
            alt="School environment"
            fill
            className="object-cover transition-all duration-700 ease-in-out"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          <div className="absolute bottom-12 left-12 right-12 text-white">
            <h2 className="text-4xl font-bold leading-tight drop-shadow-lg text-white">
              Lorem Ipsum is simply
            </h2>
            <p className="mt-2 text-lg opacity-90 text-white">
              Lorem Ipsum is simply dummy text
            </p>
          </div>
        </div>

        {/* Right Section - Form Area */}
        <div className="flex w-full flex-col bg-white p-8 md:w-1/2 md:p-16">
          <div className="mx-auto w-full max-w-sm space-y-8">
            <div className="text-center">
              <h1 className="text-2xl font-semibold tracking-tight text-gray-900">
                Welcome to lorem..!
              </h1>
            </div>

            {/* Toggle Login/Register */}
            <div className="relative flex h-12 w-full items-center justify-between rounded-full bg-secondary/30 p-1">
              <button
                onClick={() => setMode("login")}
                className={cn(
                  "relative z-10 flex h-full w-1/2 items-center justify-center rounded-full text-sm font-medium transition-all duration-300",
                  mode === "login" ? "bg-primary text-white shadow-md" : "text-primary/70 hover:text-primary"
                )}
              >
                Login
              </button>
              <button
                onClick={() => setMode("register")}
                className={cn(
                  "relative z-10 flex h-full w-1/2 items-center justify-center rounded-full text-sm font-medium transition-all duration-300",
                  mode === "register" ? "bg-primary text-white shadow-md" : "text-primary/70 hover:text-primary"
                )}
              >
                Register
              </button>
            </div>

            <p className="text-center text-sm text-gray-500">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            </p>
            {mode === "login" ? <LoginForm /> : <RegisterForm />}
          </div>
        </div>
      </Card>
    </div>
  );
}