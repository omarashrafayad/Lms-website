"use client";

import Image from "next/image";
import Link from "next/link";
import { useBlogs } from "../../blog/hooks/useBlog";
import { getImageUrl } from "@/lib/image.utils";
import { Loader2 } from "lucide-react";

export function News() {
  const { data: blogsData, isLoading } = useBlogs({ limit: 4 });

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  const blogs = blogsData?.data || [];
  const mainBlog = blogs[0];
  const otherBlogs = blogs.slice(1);

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6 lg:px-24">
        <div className="text-center mb-20">
          <h2 className="text-4xl font-bold text-gray-900">Latest News and Resources</h2>
          <p className="mt-4 text-gray-500">See the developments that have occurred to TOTC in the world</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Main Big News */}
          {mainBlog && (
            <div className="w-full lg:w-1/2 group">
              <div className="relative aspect-[16/10] rounded-3xl overflow-hidden mb-8 shadow-lg">
                <Image 
                  src={getImageUrl(mainBlog.imageCover, 'blogs')} 
                  alt={mainBlog.title} 
                  fill 
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute left-6 bottom-6 rounded-full bg-cyan-400 px-6 py-2 text-xs font-bold text-white uppercase tracking-widest">
                    {mainBlog.category?.name || 'News'}
                </span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 group-hover:text-primary transition-colors mb-4 line-clamp-2">
                {mainBlog.title}
              </h3>
              <p className="text-gray-500 leading-relaxed mb-6 line-clamp-3">
                {mainBlog.description}
              </p>
              <Link href={`/blog/${mainBlog._id}`} className="text-primary font-bold underline underline-offset-4 hover:opacity-80 cursor-pointer">Read more</Link>
            </div>
          )}

          {/* Smaller News Side */}
          <div className="w-full lg:w-1/2 space-y-8">
            {otherBlogs.map((news) => (
              <div key={news._id} className="flex gap-6 group">
                 <div className="relative h-32 w-48 shrink-0 rounded-2xl overflow-hidden shadow-md">
                   <Image 
                     src={getImageUrl(news.imageCover, 'blogs')} 
                     alt={news.title} 
                     fill 
                     className="object-cover transition-transform duration-500 group-hover:scale-105"
                   />
                   <span className="absolute right-2 bottom-2 rounded-full bg-cyan-400/90 px-3 py-1 text-[8px] font-bold text-white uppercase tracking-widest">
                       {news.category?.name || 'News'}
                   </span>
                 </div>
                 <div className="flex flex-col justify-center">
                    <h4 className="font-bold text-gray-900 leading-snug group-hover:text-primary transition-colors mb-3 line-clamp-2">
                      {news.title}
                    </h4>
                    <p className="text-xs text-gray-500 line-clamp-2">
                       {news.description}
                    </p>
                    <Link href={`/blog/${news._id}`} className="mt-2 text-primary text-xs font-bold hover:underline cursor-pointer">
                        Read more
                    </Link>
                 </div>
              </div>
            ))}
            
            {blogs.length === 0 && (
                <div className="h-full flex items-center justify-center bg-gray-50 rounded-3xl border border-dashed border-gray-200">
                    <p className="text-gray-400">No news articles found.</p>
                </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
