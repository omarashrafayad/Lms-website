"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Check, ChevronDown, ChevronRight, ChevronLeft, Apple, Smartphone } from "lucide-react";
import { Card } from "@/components/ui/card";

export default function MembershipPage() {
  const plans = [
    {
      name: "Free",
      price: "0",
      desc: "Like a pussy",
      period: "FOREVER",
      features: ["Components-driven system", "Sales-boosting landing pages", "Awesome Feather icons pack"],
      cta: "Try for free",
      accent: "text-slate-400",
      btnVariant: "outline",
    },
    {
      name: "$24",
      price: "24",
      desc: "Individual",
      period: "MONTH",
      features: ["Components-driven system", "Sales-boosting landing pages", "Awesome Feather icons pack", "Themed into 3 different styles", "Will help to learn Figma"],
      cta: "Regular license",
      popular: true,
      accent: "text-cyan-500",
      btnVariant: "primary",
    },
    {
      name: "$12",
      price: "12",
      desc: "Corporate",
      period: "EDITOR",
      features: ["Components-driven system", "Sales-boosting landing pages", "Awesome Feather icons pack", "Themed into 3 different styles"],
      cta: "Extended license",
      accent: "text-slate-400",
      btnVariant: "outline",
    }
  ];

  const testimonials = [
    { name: "Bulkin Simons", role: "Student" },
    { name: "Bulkin Simons", role: "Student" },
    { name: "Bulkin Simons", role: "Student" },
    { name: "Bulkin Simons", role: "Student" },
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* Pricing Header */}
      <section className="py-24 text-center">
        <h1 className="text-4xl font-bold text-cyan-500 mb-16">Affordable pricing</h1>
        <div className="container mx-auto px-6 lg:px-24">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-end">
            {plans.map((plan, i) => (
              <div key={i} className={`relative bg-white rounded-[2rem] p-10 shadow-2xl border border-slate-50 text-left transition hover:scale-105 duration-300 ${plan.popular ? 'md:scale-110 z-10' : ''}`}>
                {plan.popular && <span className="absolute top-6 right-8 bg-slate-100 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">Best!</span>}
                <div className="mb-8">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                    <Check size={14} className={plan.popular ? 'text-primary' : ''} /> {plan.desc}
                  </p>
                  <div className="flex items-baseline gap-1 mt-2">
                    <span className="text-4xl font-black text-slate-800">{plan.name}</span>
                    <span className="text-slate-400 font-bold">/ {plan.period}</span>
                  </div>
                </div>
                <div className="space-y-4 mb-10">
                  {plan.features.map((feat, idx) => (
                    <div key={idx} className="flex gap-3 items-start">
                      <div className={`mt-1 h-5 w-5 shrink-0 rounded-full flex items-center justify-center ${plan.popular ? 'bg-primary/20 text-primary' : 'bg-slate-100 text-slate-400'}`}>
                        <Check size={12} />
                      </div>
                      <span className="text-sm font-medium text-slate-600">{feat}</span>
                    </div>
                  ))}
                </div>
                <Button className={`w-full h-14 rounded-2xl font-bold ${plan.btnVariant === 'outline' ? 'border-primary text-primary hover:bg-primary/5' : 'bg-primary text-white shadow-xl shadow-primary/20 hover:bg-primary/90'}`} variant={plan.btnVariant as any}>
                  {plan.cta}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hero Banner Section */}
      <section className="container mx-auto px-6 lg:px-24 py-16">
        <div className="bg-slate-900 rounded-[3rem] p-12 lg:p-24 text-center text-white relative overflow-hidden">
          <div className="max-w-2xl mx-auto space-y-8 relative z-10">
             <h2 className="text-3xl lg:text-4xl font-bold leading-tight uppercase tracking-wide">
               Online coaching lessons for remote learning.
             </h2>
             <p className="text-slate-400 text-lg leading-relaxed">
               Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
             </p>
             <Button className="bg-primary hover:bg-primary/90 text-white rounded-xl px-12 h-14 font-bold">
               Start learning now
             </Button>
          </div>
          {/* Decorative shapes */}
          <div className="absolute top-0 right-0 h-full w-1/3 bg-white/5 skew-x-[-20deg]"></div>
        </div>
      </section>

      {/* Accordion List */}
      <section className="py-24 max-w-4xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-slate-800 text-center mb-16 uppercase tracking-wider">
           Online coaching lessons for remote learning
        </h2>
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="group border-b border-slate-100 pb-4">
               <button className="w-full flex items-center justify-between py-4 text-left">
                  <span className="flex items-center gap-4 text-slate-700 font-medium">
                    <div className="h-2 w-2 rounded-full bg-cyan-200" />
                    Lorem ipsum dolor sit amet
                  </span>
                  <ChevronDown className="text-slate-300 group-hover:text-primary transition" />
               </button>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-blue-50/20">
        <div className="container mx-auto px-6 lg:px-24 text-center">
          <h2 className="text-3xl font-bold text-slate-800 mb-16">What our students have to say</h2>
          <div className="flex items-center gap-6 relative">
            <button className="hidden lg:flex absolute -left-12 top-1/2 -translate-y-1/2 h-12 w-12 items-center justify-center rounded-full bg-white shadow-xl text-primary"><ChevronLeft /></button>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {testimonials.map((t, i) => (
                <Card key={i} className="rounded-3xl p-8 border-none shadow-xl text-center space-y-6">
                   <div className="mx-auto h-20 w-20 rounded-full overflow-hidden border-4 border-white shadow-lg">
                      <Image src={`https://i.pravatar.cc/150?u=${i}`} alt={t.name} width={80} height={80} />
                   </div>
                   <h4 className="font-bold text-slate-800">{t.name}</h4>
                   <p className="text-gray-400 text-xs leading-relaxed">
                     Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor Lorem ipsum dolor sit amet
                   </p>
                </Card>
              ))}
            </div>
            <button className="hidden lg:flex absolute -right-12 top-1/2 -translate-y-1/2 h-12 w-12 items-center justify-center rounded-full bg-cyan-500 text-white shadow-xl"><ChevronRight /></button>
          </div>
        </div>
      </section>

      {/* App Promo */}
      <section className="container mx-auto px-6 lg:px-24 py-24">
         <div className="bg-slate-900 rounded-[3rem] p-12 lg:px-24 flex flex-col md:flex-row items-center justify-between gap-12 text-white">
            <h2 className="text-4xl font-bold">APP is available for free</h2>
            <div className="flex flex-wrap gap-6">
               <button className="bg-cyan-400 hover:bg-cyan-500 text-white rounded-2xl flex items-center gap-4 px-10 py-5 transition shadow-lg">
                 <Smartphone size={32} />
                 <div className="text-left leading-none">
                    <p className="text-[10px] font-bold opacity-80 uppercase mb-1">Download on</p>
                    <p className="text-xl font-bold">Android APP</p>
                 </div>
               </button>
               <button className="bg-emerald-400 hover:bg-emerald-500 text-white rounded-2xl flex items-center gap-4 px-10 py-5 transition shadow-lg">
                 <Apple size={32} />
                 <div className="text-left leading-none">
                    <p className="text-[10px] font-bold opacity-80 uppercase mb-1">Download on</p>
                    <p className="text-xl font-bold">iOS APP</p>
                 </div>
               </button>
            </div>
         </div>
      </section>

      {/* Bottom CTA section */}
      <section className="container mx-auto px-6 lg:px-24 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
           <div className="bg-white rounded-[3rem] p-10 shadow-2xl space-y-8 flex flex-col border border-slate-50">
              <div className="relative aspect-video rounded-3xl overflow-hidden">
                <Image src="https://images.unsplash.com/photo-1544717305-27a734ef1904?q=80&w=2670&auto=format&fit=crop" alt="Teacher" fill className="object-cover" />
              </div>
              <h3 className="text-2xl font-bold text-slate-800">Become a Teacher</h3>
              <p className="text-slate-400 leading-relaxed">
                Class, launched less than a year ago by Blackboard co-founder Michael Chasen, integrates exclusively...
              </p>
              <div className="mt-auto pt-8">
                 <Button className="bg-primary hover:bg-primary/90 text-white rounded-xl px-10 h-14 ml-auto block">Apply a Teacher</Button>
              </div>
           </div>
           
           <div className="bg-white rounded-[3rem] p-10 shadow-2xl space-y-8 flex flex-col border border-slate-50">
              <div className="relative aspect-video rounded-3xl overflow-hidden">
                <Image src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2671&auto=format&fit=crop" alt="Coursector" fill className="object-cover" />
              </div>
              <h3 className="text-2xl font-bold text-slate-800">Become a Coursector</h3>
              <p className="text-slate-400 leading-relaxed">
                Class, launched less than a year ago by Blackboard co-founder Michael Chasen, integrates exclusively...
              </p>
              <div className="mt-auto pt-8">
                 <Button className="bg-primary hover:bg-primary/90 text-white rounded-xl px-10 h-14 ml-auto block">Apply a Coursector</Button>
              </div>
           </div>
        </div>
      </section>
    </div>
  );
}
