"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <form className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="email" className="text-sm font-semibold text-gray-700">
          Email Address
        </Label>
        <Input
          id="email"
          type="email"
          placeholder="Enter your Email Address"
          className="h-12 rounded-full border-secondary/50 focus-visible:ring-primary"
        />
      </div>

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

      <Button className="h-12 w-full rounded-full bg-primary text-white shadow-lg transition-all hover:bg-primary/90 hover:shadow-xl active:scale-[0.98]">
        Register
      </Button>
    </form>
  );
}
