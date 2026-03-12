"use client";

import Image from "next/image";
import { Star, ChevronRight, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Testimonial() {
  return (
    <section className="py-24 overflow-hidden">
      <div className="container mx-auto px-6 lg:px-24">
        <div className="flex flex-col lg:flex-row items-center gap-24">
          {/* Left Content */}
          <div className="w-full lg:w-1/2 space-y-8">
            <div className="flex items-center gap-4">
              <div className="h-[2px] w-20 bg-gray-300"></div>
              <span className="text-sm font-bold text-gray-400 tracking-[0.2em] uppercase">Testimonial</span>
            </div>
            <h2 className="text-4xl font-bold text-gray-900 md:text-5xl leading-tight">
              What They Say?
            </h2>
            <div className="space-y-6 text-lg text-gray-500 leading-relaxed">
              <p>TOTC has got more than 100k positive ratings from our users around the world.</p>
              <p>Some of the students and teachers were greatly helped by the Skilline.</p>
              <p>Are you too? Please give your assessment</p>
            </div>
            
            <button className="group flex items-center justify-between gap-4 border-2 border-primary rounded-full px-8 py-4 text-primary font-bold transition hover:bg-primary hover:text-white w-full max-w-xs">
              <span>Write your assessment</span>
              <ArrowRight className="transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          {/* Right Content */}
          <div className="relative w-full lg:w-1/2">
            <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl">
              <Image 
                src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=2576&auto=format&fit=crop" 
                alt="Student Testimonial" 
                fill 
                className="object-cover"
              />
              <button className="absolute right-8 top-1/2 -translate-y-1/2 flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-2xl text-primary transition hover:scale-110 z-30">
                <ChevronRight size={32} />
              </button>
            </div>

            {/* Testimonial Box */}
            <div className="absolute -bottom-12 -right-8 lg:-right-16 bg-white rounded-3xl p-8 shadow-2xl max-w-md border-l-[1rem] border-rose-400 border-opacity-60 z-20">
              <div className="border-l-[1px] border-gray-200 pl-6 mb-8">
                <p className="text-gray-500 italic leading-relaxed text-sm">
                  "Thank you so much for your help. It's exactly what I've been looking for. You won't regret it. It really saves me time and effort. TOTC is exactly what our business has been lacking."
                </p>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-gray-900">Gloria Rose</h4>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1 justify-end">
                    {[...Array(5)].map((_, i) => <Star key={i} size={16} className="fill-amber-400 text-amber-400" />)}
                  </div>
                  <p className="text-[10px] text-gray-400 font-bold mt-1">12 reviews at Yelp</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
