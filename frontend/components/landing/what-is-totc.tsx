"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";

export function WhatIsTOTC() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-6 text-center lg:px-24">
        <h2 className="text-3xl font-bold md:text-4xl text-gray-900">
          What is <span className="text-primary">TOTC?</span>
        </h2>
        <p className="mx-auto mt-6 max-w-4xl text-lg text-gray-500 leading-relaxed">
          TOTC is a platform that allows educators to create online classes whereby they can store
          the course materials online; manage assignments, quizzes and exams; monitor due dates;
          grade results and provide students with feedback all in one place.
        </p>

        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* Instructor Card */}
          <div className="relative h-[400px] overflow-hidden rounded-3xl group">
            <Image
              src="https://images.unsplash.com/photo-1544717297-fa154da09f9b?q=80&w=2670&auto=format&fit=crop"
              alt="Instructor"
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center p-8">
              <h3 className="text-3xl font-bold text-white uppercase tracking-wider">For Instructors</h3>
              <Button className="mt-6 rounded-full border-white text-white bg-transparent border hover:bg-white hover:text-black px-8 h-12">
                Start a class today
              </Button>
            </div>
          </div>

          {/* Student Card */}
          <div className="relative h-[400px] overflow-hidden rounded-3xl group">
            <Image
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2671&auto=format&fit=crop"
              alt="Students"
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center p-8">
              <h3 className="text-3xl font-bold text-white uppercase tracking-wider">For Students</h3>
              <Button className="mt-6 rounded-full bg-cyan-500 text-white hover:bg-cyan-600 px-8 h-12 border-none">
                Enter access code
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
