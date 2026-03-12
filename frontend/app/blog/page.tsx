"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronRight, ChevronLeft, Eye } from "lucide-react";

export default function BlogPage() {
  const categories = [
    { title: "UX/UI", image: "https://images.unsplash.com/photo-1586717791821-3f44a563cc4c?q=80&w=2670&auto=format&fit=crop" },
    { title: "React", image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2670&auto=format&fit=crop" },
    { title: "PHP", image: "https://images.unsplash.com/photo-1599507593499-a3f7f7d9a266?q=80&w=2670&auto=format&fit=crop" },
    { title: "JavaScript", image: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?q=80&w=2670&auto=format&fit=crop" },
  ];

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

  const marketingArticles = [
    {
      title: "AWS Certified solutions Architect",
      price: "$80",
      oldPrice: "$160",
      image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=2574&auto=format&fit=crop",
    },
    {
      title: "AWS Certified solutions Architect",
      price: "$80",
      oldPrice: "$160",
      image: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=2670&auto=format&fit=crop",
    },
    {
      title: "AWS Certified solutions Architect",
      price: "$80",
      oldPrice: "$160",
      image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=2670&auto=format&fit=crop",
    },
    {
      title: "AWS Certified solutions Architect",
      price: "$80",
      oldPrice: "$160",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2670&auto=format&fit=crop",
    },
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="py-16 bg-blue-50/30">
        <div className="container mx-auto px-6 lg:px-24">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <div className="lg:w-1/2 space-y-6">
              <p className="text-sm font-medium text-gray-500">
                By Themadbrains in <span className="text-primary font-bold">inspiration</span>
              </p>
              <h1 className="text-4xl lg:text-5xl font-bold text-slate-800 leading-tight">
                Why Swift UI Should Be on the Radar of Every Mobile Developer
              </h1>
              <p className="text-gray-500 leading-relaxed text-lg">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              </p>
              <Button className="rounded-xl bg-primary hover:bg-primary/90 text-white px-8 py-6 h-auto text-lg">
                Start learning now
              </Button>
            </div>
            <div className="lg:w-1/2">
              <div className="relative aspect-video rounded-[2rem] overflow-hidden shadow-2xl">
                <Image 
                  src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2672&auto=format&fit=crop"
                  alt="Feature Blog"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reading Blog List - Categories */}
      <section className="py-20">
        <div className="container mx-auto px-6 lg:px-24">
          <h2 className="text-2xl font-bold text-slate-800 mb-10">Reading blog list</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((cat, i) => (
              <Link href={`/blog/category/${cat.title.toLowerCase()}`} key={i} className="group relative h-64 rounded-3xl overflow-hidden shadow-lg transition hover:-translate-y-2">
                <Image src={cat.image} alt={cat.title} fill className="object-cover transition duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="bg-white/90 backdrop-blur-sm px-8 py-3 rounded-xl font-bold text-slate-800 uppercase tracking-widest text-sm shadow-xl">
                    {cat.title}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Related Blog */}
      <section className="py-20 bg-blue-50/20">
        <div className="container mx-auto px-6 lg:px-24">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-2xl font-bold text-slate-800">Related Blog</h2>
            <Link href="/blog" className="text-primary font-bold text-sm tracking-wider uppercase hover:underline">See all</Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {relatedBlogs.map((blog, i) => (
              <div key={i} className="bg-white rounded-[2.5rem] p-8 shadow-xl border border-blue-50/50">
                <div className="relative aspect-video rounded-3xl overflow-hidden mb-8">
                  <Image src={blog.image} alt={blog.title} fill className="object-cover" />
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-6 line-clamp-2">{blog.title}</h3>
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-12 w-12 rounded-full overflow-hidden bg-slate-100 flex items-center justify-center border-2 border-primary/20">
                    <Image src="https://i.pravatar.cc/150?u=lina" alt="Author" width={48} height={48} />
                  </div>
                  <span className="font-bold text-slate-700">{blog.author}</span>
                </div>
                <p className="text-gray-500 text-sm leading-relaxed mb-8 line-clamp-3">
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
          <div className="flex justify-end gap-4 mt-12">
            <button className="h-10 w-10 flex items-center justify-center rounded-lg bg-cyan-200/50 text-cyan-700 hover:bg-cyan-200 transition"><ChevronLeft /></button>
            <button className="h-10 w-10 flex items-center justify-center rounded-lg bg-cyan-500 text-white shadow-lg"><ChevronRight /></button>
          </div>
        </div>
      </section>

      {/* Marketing Articles */}
      <section className="py-20">
        <div className="container mx-auto px-6 lg:px-24">
           <div className="flex items-center justify-between mb-10">
            <h2 className="text-2xl font-bold text-slate-800">Marketing Articles</h2>
            <Link href="/blog" className="text-primary font-bold text-sm tracking-wider uppercase hover:underline">See all</Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {marketingArticles.map((art, i) => (
              <div key={i} className="group cursor-pointer">
                <div className="relative aspect-square rounded-3xl overflow-hidden mb-6 shadow-md border border-slate-100">
                   <Image src={art.image} alt={art.title} fill className="object-cover transition duration-500 group-hover:scale-105" />
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-[10px] font-bold tracking-widest text-slate-400 uppercase">
                    <span className="flex items-center gap-2">Design</span>
                    <span className="flex items-center gap-2">3 Month</span>
                  </div>
                  <h4 className="font-bold text-slate-800 leading-snug group-hover:text-primary transition">{art.title}</h4>
                  <p className="text-xs text-slate-400 leading-relaxed line-clamp-3">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                  </p>
                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center gap-2">
                       <div className="h-8 w-8 rounded-full overflow-hidden">
                          <Image src="https://i.pravatar.cc/100?u=lina" alt="lina" width={32} height={32} />
                       </div>
                       <span className="text-xs font-bold text-slate-700">Lina</span>
                    </div>
                    <div className="flex items-center gap-2">
                       <span className="text-[10px] text-slate-300 line-through font-bold">{art.oldPrice}</span>
                       <span className="text-sm font-bold text-primary">{art.price}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
