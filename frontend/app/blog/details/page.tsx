"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Eye, ChevronLeft, ChevronRight } from "lucide-react";

export default function BlogDetailsPage() {
  const relatedBlogs = [
    {
      title: "Class adds $30 million to its balance sheet for a Zoom-friendly edtech solution",
      author: "Lina",
      views: "251,232",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=2576&auto=format&fit=crop",
    },
    {
      title: "Class adds $30 million to its balance sheet for a Zoom-friendly edtech solution",
      author: "Lina",
      views: "251,232",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2671&auto=format&fit=crop",
    }
  ];

  return (
    <div className="bg-white min-h-screen pb-24">
      {/* Hero Image */}
      <div className="relative w-full h-[60vh] lg:h-[70vh]">
        <Image 
          src="https://images.unsplash.com/photo-1522071823942-0331031b8761?q=80&w=2670&auto=format&fit=crop"
          alt="Blog detail hero"
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="container mx-auto px-6 lg:px-24 -mt-32 relative z-10">
        <div className="bg-white rounded-[3rem] p-10 lg:p-20 shadow-2xl border border-slate-50">
          <div className="max-w-4xl mx-auto space-y-12">
            <h1 className="text-4xl lg:text-5xl font-bold text-slate-800 text-center leading-tight">
              Why Swift UI Should Be on the Radar of Every Mobile Developer
            </h1>
            
            <div className="space-y-8 text-gray-500 text-lg leading-relaxed">
              <p>
                is a platform that allows educators to create online classes whereby they can store the course materials online; manage assignments, quizzes and exams; monitor due dates; grade results and provide students with feedback all in one place.
              </p>
              
              <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                   <p key={i}>
                    TOTC is a platform that allows educators to create online classes whereby they can store the course materials online; manage assignments, quizzes and exams; monitor due dates; grade results and provide students with feedback all in one place.
                    TOTC is a platform that allows educators to create online classes whereby they can store the course materials online; manage assignments, quizzes and exams; monitor due dates; grade results and provide students with feedback all in one place.
                  </p>
                ))}
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-4 pt-8">
                {["affordable", "Stunning", "making", "madbrowns"].map((tag, i) => (
                  <span key={i} className="bg-blue-50/50 text-slate-400 px-6 py-2 rounded-full text-sm font-medium border border-blue-50">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Author Card */}
              <div className="border-t border-slate-100 pt-12 mt-12 flex flex-col sm:flex-row items-center justify-between gap-8">
                <div className="flex items-center gap-6">
                  <div className="h-16 w-16 rounded-2xl overflow-hidden border-2 border-primary/20 p-1">
                    <Image src="https://i.pravatar.cc/150?u=lina" alt="Lina" width={64} height={64} className="rounded-xl object-cover" />
                  </div>
                  <div className="text-left">
                    <p className="text-xs font-bold text-slate-300 uppercase tracking-widest mb-1">Written by</p>
                    <h4 className="text-xl font-bold text-slate-800">Lina</h4>
                  </div>
                </div>
                <Button variant="outline" className="rounded-xl border-primary text-primary hover:bg-primary hover:text-white px-10 h-14 font-bold">
                  Follow
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Blog Section */}
      <section className="mt-24 bg-blue-50/10 py-24">
        <div className="container mx-auto px-6 lg:px-24">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-bold text-slate-800">Related Blog</h2>
            <Link href="/blog" className="text-primary font-bold tracking-widest uppercase hover:underline">See all</Link>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
             {relatedBlogs.map((blog, i) => (
              <div key={i} className="bg-white rounded-[2.5rem] p-10 shadow-xl border border-blue-50/50 flex flex-col">
                <div className="relative aspect-[16/10] rounded-3xl overflow-hidden mb-8">
                  <Image src={blog.image} alt={blog.title} fill className="object-cover" />
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-6 line-clamp-2">{blog.title}</h3>
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-12 w-12 rounded-full overflow-hidden border-2 border-primary/20">
                    <Image src="https://i.pravatar.cc/150?u=lina" alt="Author" width={48} height={48} />
                  </div>
                  <span className="font-bold text-slate-700">{blog.author}</span>
                </div>
                <p className="text-gray-500 leading-relaxed mb-8 line-clamp-2">
                   Class, launched less than a year ago by Blackboard co-founder Michael Chasen, integrates exclusively...
                </p>
                <div className="flex items-center justify-between border-t border-slate-100 pt-8 mt-auto">
                   <Link href="/blog/details" className="text-slate-400 font-bold hover:text-primary transition underline underline-offset-4">Read more</Link>
                   <div className="flex items-center gap-2 text-slate-300">
                     <Eye size={18} />
                     <span className="text-sm font-bold">{blog.views}</span>
                   </div>
                </div>
              </div>
            ))}
          </div>
          {/* Pagination Arrows */}
          <div className="flex justify-end gap-3 mt-12">
             <button className="h-10 w-10 flex items-center justify-center rounded-lg bg-cyan-100/50 text-cyan-600"><ChevronLeft /></button>
             <button className="h-10 w-10 flex items-center justify-center rounded-lg bg-cyan-500 text-white shadow-lg"><ChevronRight /></button>
          </div>
        </div>
      </section>
    </div>
  );
}
