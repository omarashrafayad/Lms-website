"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronRight, ChevronLeft, Eye, Loader2 } from "lucide-react";
import { useBlogs } from "../hooks/useBlog";
import { getImageUrl } from "@/lib/image.utils";

export default function BlogPage() {
  const { data: blogsData, isLoading } = useBlogs();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  const blogs = blogsData?.data || [];
  const featuredBlog = blogs[0];
  const relatedBlogs = blogs.slice(1, 4);

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      {featuredBlog && (
        <section className="py-16 bg-blue-50/30">
          <div className="container mx-auto px-6 lg:px-24">
            <div className="flex flex-col lg:flex-row gap-12 items-center">
              <div className="lg:w-1/2 space-y-6">
                <p className="text-sm font-medium text-gray-500">
                  By {featuredBlog.author || 'Admin'} in <span className="text-primary font-bold">{featuredBlog.category?.name || 'Inspiration'}</span>
                </p>
                <h1 className="text-4xl lg:text-5xl font-bold text-slate-800 leading-tight">
                  {featuredBlog.title}
                </h1>
                <p className="text-gray-500 leading-relaxed text-lg line-clamp-3">
                  {featuredBlog.description}
                </p>
                <Link href={`/blog/${featuredBlog._id}`}>
                  <Button className="rounded-xl bg-primary hover:bg-primary/90 text-white px-8 py-6 h-auto text-lg mt-4 cursor-pointer">
                    Read more
                  </Button>
                </Link>
              </div>
              <div className="lg:w-1/2">
                <div className="relative aspect-video rounded-[2rem] overflow-hidden shadow-2xl">
                  <Image 
                    src={getImageUrl(featuredBlog.imageCover, 'blogs')}
                    alt={featuredBlog.title}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Blog List */}
      <section className="py-20">
        <div className="container mx-auto px-6 lg:px-24">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-2xl font-bold text-slate-800">Latest Blogs</h2>
            <Link href="/blog" className="text-primary font-bold text-sm tracking-wider uppercase hover:underline">See all</Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {blogs.slice(1).map((blog, i) => (
              <div key={blog._id} className="bg-white rounded-[2.5rem] p-8 shadow-xl border border-gray-50 flex flex-col h-full group">
                <div className="relative aspect-video rounded-3xl overflow-hidden mb-8">
                  <Image src={getImageUrl(blog.imageCover, 'blogs')} alt={blog.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-6 line-clamp-2 h-16">{blog.title}</h3>
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-10 w-10 rounded-full overflow-hidden bg-slate-100 flex items-center justify-center border-2 border-primary/20">
                    <Image src={`https://ui-avatars.com/api/?name=${blog.author || 'A'}&background=random`} alt="Author" width={40} height={40} />
                  </div>
                  <span className="font-bold text-slate-700 text-sm">{blog.author || 'Admin'}</span>
                </div>
                <p className="text-gray-500 text-sm leading-relaxed mb-8 line-clamp-3">
                  {blog.description}
                </p>
                <div className="flex items-center justify-between border-t border-slate-100 pt-8 mt-auto">
                   <Link href={`/blog/${blog._id}`} className="text-slate-400 font-bold hover:text-primary transition underline underline-offset-4">Read more</Link>
                   <div className="flex items-center gap-2 text-slate-300">
                     <Eye size={18} />
                     <span className="text-sm font-bold">1.2k</span>
                   </div>
                </div>
              </div>
            ))}
          </div>
          
          {blogs.length === 0 && (
              <div className="text-center py-20 bg-gray-50 rounded-3xl border border-dashed border-gray-200">
                  <p className="text-gray-400">No blogs found yet.</p>
              </div>
          )}

          {blogs.length > 6 && (
            <div className="flex justify-center gap-4 mt-12">
                <button className="h-12 w-12 flex items-center justify-center rounded-xl bg-gray-100 text-gray-400 hover:bg-gray-200 transition cursor-pointer"><ChevronLeft /></button>
                <button className="h-12 w-12 flex items-center justify-center rounded-xl bg-primary text-white shadow-lg shadow-primary/20 cursor-pointer"><ChevronRight /></button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
