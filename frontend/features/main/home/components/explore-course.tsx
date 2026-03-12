"use client";

import Image from "next/image";
import { Star, Globe, Layout, BookOpen, ChevronRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function ExploreCourse() {
  const categories = [
    { name: "Design", color: "bg-orange-500" },
    { name: "Development", color: "bg-pink-400" },
    { name: "Business", color: "bg-amber-800" },
    { name: "Marketing", color: "bg-amber-500" },
    { name: "IT & Software", color: "bg-purple-500" },
    { name: "Lifestyle", color: "bg-blue-500" },
    { name: "Photography", color: "bg-green-500" },
  ];

  const CourseRow = ({ title, icon }: { title: string; icon: any }) => (
    <div className="mb-16">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 flex items-center justify-center bg-gray-100 rounded-lg">
            {icon}
          </div>
          <h3 className="text-2xl font-bold text-gray-900">{title}</h3>
        </div>
        <Link href="/" className="flex items-center gap-1 text-primary font-bold hover:underline">
          SEE ALL <ChevronRight size={20} />
        </Link>
      </div>
      
      <div className="flex flex-col lg:flex-row gap-8 items-center bg-blue-50/50 p-6 rounded-[2rem] border border-blue-50">
        <div className="flex flex-wrap gap-4 lg:w-3/5">
          {categories.map((cat, i) => (
            <div key={i} className="relative h-48 w-24 rounded-full overflow-hidden flex flex-col items-center justify-center p-4 group transition hover:scale-105">
               <div className={`absolute inset-0 ${cat.color} opacity-80 group-hover:opacity-100`}></div>
               <span className="relative z-10 text-white font-bold text-sm [writing-mode:vertical-rl] rotate-180">
                 {cat.name}
               </span>
            </div>
          ))}
        </div>
        
        <div className="lg:w-2/5 w-full">
          <div className="bg-white rounded-3xl overflow-hidden shadow-xl p-6">
            <div className="relative h-48 w-full rounded-2xl overflow-hidden mb-4">
              <Image 
                src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2670&auto=format&fit=crop" 
                alt="Course" 
                fill 
                className="object-cover"
              />
            </div>
            <h4 className="text-xl font-bold text-gray-900 mb-2">Integer id Orc Sed Ante Tincidunt</h4>
            <p className="text-sm text-gray-500 mb-4 line-clamp-2">
              Cras convallis lacus orci, tristique tincidunt magna fringilla at faucibus vel.
            </p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                 {[...Array(5)].map((_, i) => <Star key={i} size={14} className="fill-amber-400 text-amber-400" />)}
              </div>
              <span className="text-lg font-bold text-gray-900">$ 450</span>
            </div>
            <Button className="w-full mt-6 rounded-full bg-white border-primary border text-primary hover:bg-primary hover:text-white transition-colors h-12 uppercase font-bold tracking-wider">
              Explore
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6 lg:px-24">
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-gray-900">Explore Course</h2>
          <p className="mt-4 text-gray-500">Ut sed eros finibus, placerat orci id, dapibus.</p>
        </div>

        <CourseRow title="Lorem Ipsum" icon={<Layout className="text-gray-600" size={24} />} />
        <CourseRow title="Quisque a Consequat" icon={<Globe className="text-gray-600" size={24} />} />
        <CourseRow title="Aenean Facilisis" icon={<BookOpen className="text-gray-600" size={24} />} />
      </div>
    </section>
  );
}
