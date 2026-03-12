"use client";

import Image from "next/image";
import { Play } from "lucide-react";
import Link from "next/link";

export function ClassroomExperience() {
  return (
    <section className="py-24 overflow-hidden">
      <div className="container mx-auto px-6 lg:px-24">
        <div className="flex flex-col items-center gap-16 lg:flex-row">
          {/* Left Content */}
          <div className="w-full space-y-8 lg:w-1/2">
            <h2 className="text-3xl font-bold md:text-5xl text-gray-900 leading-tight">
              Everything you can do in a physical classroom, <span className="text-primary tracking-tight">you can do with TOTC</span>
            </h2>
            <p className="max-w-xl text-lg text-gray-500 leading-relaxed">
              TOTC’s school management software helps traditional and online schools manage
              scheduling, attendance, payments and virtual classrooms all in one secure cloud-based system.
            </p>
            <Link href="/" className="inline-block text-lg font-medium text-gray-600 underline underline-offset-8 hover:text-primary transition">
              Learn more
            </Link>
          </div>

          {/* Right Image + Decorative Elements */}
          <div className="relative w-full lg:w-1/2">
            <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl z-20">
              <Image
                src="https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=2732&auto=format&fit=crop"
                alt="Classroom"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <button className="flex h-20 w-20 items-center justify-center rounded-full bg-white/30 backdrop-blur-md shadow-2xl transition hover:scale-110">
                  <Play className="text-white fill-white" size={32} />
                </button>
              </div>
            </div>

            {/* Decorative Shapes */}
            <div className="absolute -top-6 -left-6 h-24 w-24 bg-cyan-400 rounded-2xl -z-10 rotate-12 opacity-50"></div>
            <div className="absolute -bottom-6 -right-6 h-32 w-32 bg-primary rounded-3xl -z-10 -rotate-6 opacity-30"></div>
            <div className="absolute -top-12 right-1/4 h-8 w-8 bg-orange-400 rounded-full"></div>
            <div className="absolute bottom-1/4 -left-12 h-12 w-12 bg-green-400 rounded-full opacity-60"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
