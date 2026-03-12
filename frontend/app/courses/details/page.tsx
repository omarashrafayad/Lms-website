"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Star, Check, Smartphone, Users, Share2, Facebook, Twitter, Instagram, Youtube, Linkedin, PlayCircle } from "lucide-react";

export default function CourseDetailsPage() {
  const courseFeatures = [
    "Money Back Guarantee",
    "Access on all devices",
    "Certification of completion",
    "32 Modules",
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Banner */}
      <div className="relative w-full h-[60vh] lg:h-[70vh]">
        <Image 
          src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2670&auto=format&fit=crop"
          alt="Course Hero"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      <div className="container mx-auto px-6 lg:px-24">
        <div className="flex flex-col lg:flex-row gap-16 -mt-32 relative z-20 pb-24">
          
          {/* Main Content Area */}
          <div className="flex-1 space-y-16">
            <div className="bg-white rounded-[3rem] p-8 lg:p-12 shadow-2xl border border-slate-50">
               {/* Tabs placeholder */}
               <div className="flex flex-wrap gap-4 mb-12">
                 {["Overview", "Overview", "Overview", "Overview"].map((tab, i) => (
                   <button key={i} className={`px-10 py-4 rounded-2xl font-bold tracking-wider uppercase text-sm border-2 transition ${i === 3 ? 'bg-cyan-400 text-white border-cyan-400' : 'bg-slate-50 text-slate-400 border-transparent hover:border-slate-200'}`}>
                     {tab}
                   </button>
                 ))}
               </div>

               {/* Rating Summary */}
               <div className="bg-blue-50/30 rounded-[2.5rem] p-10 flex flex-col md:flex-row gap-12 items-center">
                  <div className="text-center space-y-2">
                    <h3 className="text-5xl font-black text-slate-800">4 out of 5</h3>
                    <div className="flex items-center justify-center gap-1">
                       {[...Array(5)].map((_, i) => <Star key={i} size={18} className={i < 4 ? "fill-amber-400 text-amber-400" : "text-slate-200"} />)}
                    </div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Top Rating</p>
                  </div>
                  <div className="flex-1 w-full space-y-4">
                     {[5, 4, 3, 2, 1].map((num) => (
                       <div key={num} className="flex items-center gap-4">
                          <span className="text-xs font-bold text-slate-400 w-12">{num} Stars</span>
                          <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                             <div className="h-full bg-cyan-400" style={{ width: `${num * 15}%` }} />
                          </div>
                       </div>
                     ))}
                  </div>
               </div>

               {/* Reviews */}
               <div className="mt-16 space-y-12">
                  {[1, 2].map((i) => (
                    <div key={i} className="flex gap-6 pb-12 border-b border-slate-100 last:border-0">
                       <div className="h-16 w-16 shrink-0 rounded-2xl overflow-hidden border-2 border-primary/20">
                          <Image src={`https://i.pravatar.cc/150?u=review${i}`} alt="Reviewer" width={64} height={64} />
                       </div>
                       <div className="space-y-4">
                          <div className="flex items-center justify-between">
                             <h4 className="font-bold text-slate-800">Lina</h4>
                             <span className="text-xs font-bold text-slate-300">3 Month</span>
                          </div>
                          <div className="flex gap-1">
                             {[...Array(5)].map((_, idx) => <Star key={idx} size={14} className="fill-amber-400 text-amber-400" />)}
                          </div>
                          <p className="text-gray-500 leading-relaxed text-sm">
                             Class, launched less than a year ago by Blackboard co-founder Michael Chasen, integrates exclusively...
                          </p>
                       </div>
                    </div>
                  ))}
               </div>
            </div>

            {/* Feature small section */}
            <div className="flex flex-col lg:flex-row items-center gap-12">
               <div className="lg:w-1/2 space-y-6">
                  <h3 className="text-3xl font-bold text-slate-800">
                    Everything you can do in a physical classroom, <span className="text-primary italic">you can do with TOTC</span>
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    TOTC’s school management software helps traditional and online schools manage scheduling, attendance, payments and virtual classrooms all in one secure cloud-based system.
                  </p>
                  <Link href="/" className="text-primary font-bold underline underline-offset-4">Learn more</Link>
               </div>
               <div className="lg:w-1/2 relative aspect-video rounded-3xl overflow-hidden shadow-2xl">
                 <Image src="https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=2670&auto=format&fit=crop" alt="Video" fill className="object-cover" />
                 <div className="absolute inset-0 flex items-center justify-center">
                    <button className="text-white hover:scale-110 transition"><PlayCircle size={64} /></button>
                 </div>
               </div>
            </div>
          </div>

          {/* Sidebar Area */}
          <div className="w-full lg:w-[400px] shrink-0">
            <div className="bg-white rounded-[3rem] p-8 shadow-2xl border border-slate-50 sticky top-12">
               <div className="relative aspect-video rounded-3xl overflow-hidden mb-8 shadow-inner">
                  <Image src="https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=2670&auto=format&fit=crop" alt="Premium preview" fill className="object-cover" />
               </div>
               <div className="space-y-6">
                  <div className="flex items-center gap-3">
                     <span className="text-4xl font-black text-slate-800">$49.65</span>
                     <span className="text-slate-300 line-through font-bold">$99.99</span>
                     <span className="text-cyan-500 font-bold ml-auto uppercase tracking-tighter text-sm">50% Off</span>
                  </div>
                  <p className="text-cyan-500 font-bold text-sm tracking-tight">11 hour left at this price</p>
                  
                  <Button className="w-full bg-cyan-400 hover:bg-cyan-500 text-white rounded-2xl h-14 font-black text-lg uppercase shadow-xl shadow-cyan-400/20">Buy Now</Button>
                  
                  <div className="pt-8 border-t border-slate-100 space-y-6">
                     <h4 className="font-bold text-slate-800 text-lg">This Course included</h4>
                     <div className="space-y-4">
                        {courseFeatures.map((feat, i) => (
                           <div key={i} className="flex items-center gap-3 text-sm text-slate-400 font-medium">
                              <Check size={18} className="text-primary" /> {feat}
                           </div>
                        ))}
                     </div>
                  </div>

                  <div className="pt-8 border-t border-slate-100 space-y-4">
                     <h4 className="font-bold text-slate-800 text-lg">Training 5 or more people</h4>
                     <p className="text-xs text-slate-400 leading-relaxed font-bold">Class, launched less than a year ago by Blackboard co-founder Michael Chasen, integrates exclusively...</p>
                  </div>

                  <div className="pt-8 border-t border-slate-100 space-y-4">
                     <h4 className="font-bold text-slate-800 text-lg">Share this course</h4>
                     <div className="flex items-center gap-4">
                        {[Facebook, Twitter, Instagram, Youtube, Linkedin].map((Icon, i) => (
                           <button key={i} className="h-10 w-10 flex items-center justify-center rounded-full bg-slate-50 text-slate-300 hover:text-primary transition hover:bg-white hover:shadow-lg">
                              <Icon size={18} />
                           </button>
                        ))}
                     </div>
                  </div>
               </div>
            </div>
          </div>
        </div>

        {/* Marketing Articles Section */}
        <section className="py-24 border-t border-slate-100">
           <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-bold text-slate-800">Marketing Articles</h2>
            <Link href="/courses" className="text-primary font-bold text-sm hover:underline uppercase tracking-widest">See all</Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="group cursor-pointer">
                <div className="relative aspect-video rounded-3xl overflow-hidden mb-6 shadow-md">
                   <Image src={`https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2670&auto=format&fit=crop`} alt="article" fill className="object-cover group-hover:scale-105 transition duration-500" />
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-[10px] font-bold tracking-widest text-slate-400 uppercase">
                    <span>Design</span>
                    <span>3 Month</span>
                  </div>
                  <h4 className="font-bold text-slate-800 leading-snug group-hover:text-primary">AWS Certified solutions Architect</h4>
                  <div className="flex items-center justify-between pt-2">
                     <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-full overflow-hidden">
                           <Image src="https://i.pravatar.cc/100?u=lina" alt="lina" width={32} height={32} />
                        </div>
                        <span className="text-xs font-bold text-slate-700">Lina</span>
                     </div>
                     <span className="text-sm font-bold text-primary">$80</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Bottom Offer Cards */}
        <section className="py-24 border-t border-slate-100">
          <h2 className="text-3xl font-bold text-slate-800 mb-16">Top Education offers and deals are listed here</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[50, 60, 50].map((off, i) => (
              <div key={i} className="bg-slate-50/50 rounded-[2.5rem] p-10 relative overflow-hidden group shadow-lg">
                <div className="absolute top-8 left-8 bg-rose-500 text-white font-black px-6 py-2 rounded-xl text-lg z-10">{off}%</div>
                <div className="space-y-6 relative z-10 pt-16">
                   <h3 className="text-2xl font-black text-slate-800 uppercase tracking-tight">For Instructors</h3>
                   <p className="text-slate-400 text-sm leading-relaxed font-bold">
                     TOTC’s school management software helps traditional and online schools manage scheduling...
                   </p>
                </div>
                <div className="relative h-64 w-full mt-8 rounded-3xl overflow-hidden shadow-2xl">
                   <Image src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2671&auto=format&fit=crop" alt="Offer" fill className="object-cover group-hover:scale-105 transition duration-500" />
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
