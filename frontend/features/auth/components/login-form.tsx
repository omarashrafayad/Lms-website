"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

interface LoginFormProps {
  onRegisterClick: () => void;
}

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <form className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="username" className="text-sm font-semibold text-gray-700">
          User name
        </Label>
        <Input
          id="username"
          placeholder="Enter your User name"
          className="h-12 rounded-full border-secondary/50 focus-visible:ring-primary"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password" className="text-sm font-semibold text-gray-700">
          Password
        </Label>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your Password"
            className="h-12 rounded-full border-secondary/50 pr-12 focus-visible:ring-primary"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Checkbox id="remember" className="border-secondary/50 data-[state=checked]:bg-primary" />
          <Label
            htmlFor="remember"
            className="text-xs font-medium leading-none text-gray-500 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Remember me
          </Label>
        </div>
        <Link
          href="/forgot-password"
          className="text-xs font-semibold text-gray-500 hover:text-primary"
        >
          Forgot Password ?
        </Link>
      </div>

      <Button className="h-12 w-full rounded-full bg-primary text-white shadow-lg transition-all hover:bg-primary/90 hover:shadow-xl active:scale-[0.98]">
        Login
      </Button>
    </form>
  );
}
