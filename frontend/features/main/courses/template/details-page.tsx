"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Star, Check, Smartphone, Users, Share2, Facebook, Twitter, Instagram, Youtube, Linkedin, PlayCircle, Loader2 } from "lucide-react";
import { useCourse } from "../hooks/useCourse";
import { useAddToCart } from "../../checkout/hooks/useCheckout";
import { useParams, useRouter } from "next/navigation";
import { getImageUrl } from "@/lib/image.utils";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function CourseDetailsPage() {
  const { id } = useParams() as { id: string };
  const { data: courseData, isLoading } = useCourse(id);
  const addToCartMutation = useAddToCart();
  const router = useRouter();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  const course = courseData?.data;
  if (!course) return <div>Course not found</div>;

  const handleAddToCart = () => {
    addToCartMutation.mutate(id, {
        onSuccess: () => {
            router.push('/checkout');
        }
    });
  };

  const courseFeatures = [
    "Money Back Guarantee",
    "Access on all devices",
    "Certification of completion",
    "Professional Curriculum",
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Banner */}
      <div className="relative w-full h-[60vh] lg:h-[70vh]">
        <Image 
          src={getImageUrl(course.imageCover, 'courses')}
          alt={course.title}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex items-center justify-center container mx-auto px-6 lg:px-24">
            <div className="max-w-3xl text-white space-y-6">
                <span className="bg-primary/20 backdrop-blur-md text-primary-foreground border border-primary/30 px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest">{course.category?.name}</span>
                <h1 className="text-4xl lg:text-6xl font-black leading-tight">{course.title}</h1>
                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                        <Star className="fill-amber-400 text-amber-400" size={20} />
                        <span className="font-bold">{course.ratingsAverage || 5} ({course.ratingsQuantity || 0} reviews)</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Users size={20} />
                        <span className="font-bold">1.2k Students</span>
                    </div>
                </div>
            </div>
        </div>
      </div>

      <div className="container mx-auto px-6 lg:px-24">
        <div className="flex flex-col lg:flex-row gap-16 -mt-32 relative z-20 pb-24">
          
          {/* Main Content Area */}
          <div className="flex-1 space-y-16">
            <div className="bg-white rounded-[3rem] p-8 lg:p-12 shadow-2xl border border-slate-50">
               {/* Tabs placeholder */}
               <div className="flex flex-wrap gap-4 mb-12">
                 {["Overview", "Curriculum", "Instructor", "Reviews"].map((tab, i) => (
                   <button key={i} className={`px-10 py-4 rounded-2xl font-bold tracking-wider uppercase text-sm border-2 transition ${i === 0 ? 'bg-primary text-white border-primary' : 'bg-slate-50 text-slate-400 border-transparent hover:border-slate-200'}`}>
                     {tab}
                   </button>
                 ))}
               </div>

               <div className="prose prose-slate max-w-none">
                   <h2 className="text-3xl font-bold text-slate-800 mb-6">Course Overview</h2>
                   <p className="text-slate-500 leading-relaxed text-lg">
                       {course.description}
                   </p>
               </div>

               {/* Rating Summary */}
               <div className="bg-blue-50/30 rounded-[2.5rem] p-10 flex flex-col md:flex-row gap-12 items-center mt-12">
                  <div className="text-center space-y-2">
                    <h3 className="text-5xl font-black text-slate-800">{course.ratingsAverage || 5} out of 5</h3>
                    <div className="flex items-center justify-center gap-1">
                       {[...Array(5)].map((_, i) => <Star key={i} size={18} className={i < (course.ratingsAverage || 5) ? "fill-amber-400 text-amber-400" : "text-slate-200"} />)}
                    </div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Top Rating</p>
                  </div>
                  <div className="flex-1 w-full space-y-4">
                     {[5, 4, 3, 2, 1].map((num) => (
                       <div key={num} className="flex items-center gap-4">
                          <span className="text-xs font-bold text-slate-400 w-12">{num} Stars</span>
                          <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                             <div className="h-full bg-primary" style={{ width: `${num === 5 ? 85 : num === 4 ? 12 : 1}%` }} />
                          </div>
                       </div>
                     ))}
                  </div>
               </div>
            </div>
          </div>

          {/* Sidebar Area */}
          <div className="w-full lg:w-[400px] shrink-0">
            <div className="bg-white rounded-[3rem] p-8 shadow-2xl border border-slate-50 sticky top-12">
               <div className="relative aspect-video rounded-3xl overflow-hidden mb-8 shadow-inner border border-slate-100">
                  <Image src={getImageUrl(course.imageCover, 'courses')} alt="Preview" fill className="object-cover" />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20 group hover:bg-black/40 transition-colors">
                      <button className="text-white scale-100 hover:scale-110 transition"><PlayCircle size={64} /></button>
                  </div>
               </div>
               <div className="space-y-6">
                  <div className="flex items-center gap-3">
                     <span className="text-4xl font-black text-slate-800">${course.priceAfterDiscount || course.price}</span>
                     {course.priceAfterDiscount && <span className="text-slate-300 line-through font-bold">${course.price}</span>}
                     {course.priceAfterDiscount && <span className="text-primary font-bold ml-auto uppercase tracking-tighter text-sm">{Math.round(((course.price - course.priceAfterDiscount) / course.price) * 100)}% Off</span>}
                  </div>
                  <p className="text-primary font-bold text-sm tracking-tight">Lifetime access to this course</p>
                  
                  <Button 
                    onClick={handleAddToCart}
                    disabled={addToCartMutation.isPending}
                    className="w-full bg-primary hover:bg-primary/90 text-white rounded-2xl h-14 font-black text-lg uppercase shadow-xl shadow-primary/20 cursor-pointer"
                  >
                    {addToCartMutation.isPending ? <Loader2 className="animate-spin" /> : "Enroll Now"}
                  </Button>
                  
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
                     <h4 className="font-bold text-slate-800 text-lg">Share this course</h4>
                     <div className="flex items-center gap-4">
                        {[Facebook, Twitter, Instagram, Youtube, Linkedin].map((Icon, i) => (
                           <button key={i} className="h-10 w-10 flex items-center justify-center rounded-full bg-slate-50 text-slate-300 hover:text-primary transition hover:bg-white hover:shadow-lg cursor-pointer">
                              <Icon size={18} />
                           </button>
                        ))}
                     </div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
