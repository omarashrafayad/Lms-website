"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Navbar() {
  return (
    <nav className="flex items-center justify-between px-6 py-4 md:px-12 lg:px-24">
      <div className="flex items-center space-x-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/20 shadow-lg backdrop-blur-sm">
          <span className="text-xl font-bold text-white">TOTC</span>
        </div>
      </div>
      
      <div className="hidden items-center space-x-8 md:flex">
        <Link href="/" className="text-sm font-medium text-white/90 hover:text-white">Home</Link>
        <Link href="/courses" className="text-sm font-medium text-white/90 hover:text-white">Courses</Link>
        <Link href="/exams" className="text-sm font-medium text-white/90 hover:text-white">Exams</Link>
        <Link href="/blog" className="text-sm font-medium text-white/90 hover:text-white">Blog</Link>
        <Link href="/about" className="text-sm font-medium text-white/90 hover:text-white">About Us</Link>
      </div>

      <div className="flex items-center space-x-4">
        <Link href="/auth" className="rounded-full px-8 text-sm font-medium text-white hover:bg-white/10 flex items-center h-10 transition-colors">
          Login
        </Link>
        <Link href="/auth" className="rounded-full bg-white/20 px-8 text-sm font-medium text-white backdrop-blur-sm hover:bg-white/30 flex items-center h-10 transition-colors">
          Sign Up
        </Link>
      </div>
    </nav>
  );
}
