"use client";

import Image from "next/image";
import Link from "next/link";

export function News() {
  const smallNews = [
    {
      title: "Class Technologies Inc. Closes $30 Million Series A Financing to Meet High Demand",
      tag: "PRESS RELEASE",
      image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=2670&auto=format&fit=crop",
    },
    {
      title: "Zoom's earliest investors are betting millions on a better Zoom for schools",
      tag: "NEWS",
      image: "https://images.unsplash.com/photo-1543269664-7eef42226a21?q=80&w=2670&auto=format&fit=crop",
    },
    {
      title: "Former Blackboard CEO Raises $16M to Bring LMS Features to Zoom Classrooms",
      tag: "NEWS",
      image: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=2670&auto=format&fit=crop",
    },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6 lg:px-24">
        <div className="text-center mb-20">
          <h2 className="text-4xl font-bold text-gray-900">Latest News and Resources</h2>
          <p className="mt-4 text-gray-500">See the developments that have occurred to TOTC in the world</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Main Big News */}
          <div className="w-full lg:w-1/2 group">
            <div className="relative aspect-[16/10] rounded-3xl overflow-hidden mb-8 shadow-lg">
              <Image 
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2671&auto=format&fit=crop" 
                alt="Main News" 
                fill 
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <span className="absolute left-6 bottom-6 rounded-full bg-cyan-400 px-6 py-2 text-xs font-bold text-white uppercase tracking-widest">News</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 group-hover:text-primary transition-colors mb-4">
              Class adds $30 million to its balance sheet for a Zoom-friendly edtech solution
            </h3>
            <p className="text-gray-500 leading-relaxed mb-6">
              Class, launched less than a year ago by Blackboard co-founder Michael Chasen, integrates exclusively...
            </p>
            <Link href="/" className="text-primary font-bold underline underline-offset-4 hover:opacity-80">Read more</Link>
          </div>

          {/* Smaller News Side */}
          <div className="w-full lg:w-1/2 space-y-8">
            {smallNews.map((news, idx) => (
              <div key={idx} className="flex gap-6 group">
                 <div className="relative h-32 w-48 shrink-0 rounded-2xl overflow-hidden shadow-md">
                   <Image 
                     src={news.image} 
                     alt={news.title} 
                     fill 
                     className="object-cover transition-transform duration-500 group-hover:scale-105"
                   />
                   <span className="absolute right-2 bottom-2 rounded-full bg-cyan-400/90 px-3 py-1 text-[8px] font-bold text-white uppercase tracking-widest">{news.tag}</span>
                 </div>
                 <div className="flex flex-col justify-center">
                    <h4 className="font-bold text-gray-900 leading-snug group-hover:text-primary transition-colors mb-3">
                      {news.title}
                    </h4>
                    <p className="text-xs text-gray-500 line-clamp-2">
                       Class Technologies Inc., the company that created Class,...
                    </p>
                 </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
