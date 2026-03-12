"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Play, Calendar, User, Mail } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-primary pb-24 pt-12 text-white">
      <div className="container mx-auto px-6 md:px-12 lg:px-24">
        <div className="flex flex-col items-center lg:flex-row">
          {/* Left Content */}
          <div className="z-10 w-full space-y-8 lg:w-1/2">
            <h1 className="text-5xl font-bold leading-tight md:text-6xl">
              <span className="text-orange-400">Studying</span> Online is now <br />
              much easier
            </h1>
            <p className="max-w-md text-lg text-white/80">
              TOTC is an interesting platform that will teach you in more an interactive way
            </p>
            <div className="flex flex-wrap items-center gap-6">
              <Button className="h-14 rounded-full bg-white/20 px-10 text-lg font-semibold backdrop-blur-md hover:bg-white/30">
                Join for free
              </Button>
              <button className="flex items-center space-x-3 text-lg font-medium transition hover:opacity-80">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-primary shadow-xl">
                  <Play className="fill-current" />
                </div>
                <span>Watch how it works</span>
              </button>
            </div>
          </div>

          {/* Right Image + Floating Cards */}
          <div className="relative mt-16 w-full lg:mt-0 lg:w-1/2">
            <div className="relative mx-auto max-w-lg">
              <div className="relative h-[500px] w-full overflow-hidden rounded-3xl md:h-[600px]">
                <Image
                  src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2670&auto=format&fit=crop"
                  alt="Student"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Floating UI Elements */}
              <div className="absolute -left-8 top-1/4 animate-bounce rounded-2xl bg-white/90 p-4 shadow-2xl backdrop-blur-md md:-left-12">
                <div className="flex items-center space-x-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/20">
                    <Calendar className="text-primary" size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-800">250k</p>
                    <p className="text-[10px] text-gray-500">Assisted Student</p>
                  </div>
                </div>
              </div>

              <div className="absolute -right-8 top-1/2 animate-pulse rounded-2xl bg-white/90 p-4 shadow-2xl backdrop-blur-md md:-right-12">
                <div className="flex items-center space-x-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-400/20">
                    <Mail className="text-orange-400" size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-800">Congratulations</p>
                    <p className="text-[10px] text-gray-500">Your admission completed</p>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-6 left-1/2 w-64 -translate-x-1/2 rounded-2xl bg-white/90 p-4 shadow-2xl backdrop-blur-md">
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 overflow-hidden rounded-full">
                    <Image src="https://i.pravatar.cc/150?u=1" alt="User" width={40} height={40} />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-bold text-gray-800">User Experience Class</p>
                    <p className="text-[10px] text-gray-500">Today at 12.00 PM</p>
                  </div>
                  <Button size="sm" className="h-8 rounded-full bg-pink-500 px-4 text-[10px] hover:bg-pink-600">
                    Join Now
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Wave Bottom Effect */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block h-20 w-full fill-white">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.43,143,111.41,224.51,91.8,273.39,80,321.39,56.44,321.39,56.44Z"></path>
        </svg>
      </div>
    </section>
  );
}
