"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default function CheckoutPage() {
  const cartItems = [
    {
      title: "adipising elit, sed do eiusmod tempor",
      desc: "Lorem ipsum dolor...",
      price: 24.69,
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=100&auto=format&fit=crop",
    },
    {
      title: "sed do eiusmod tempor adipiscing elit",
      desc: "Lorem ipsum dolor...",
      price: 24.69,
      image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=100&auto=format&fit=crop",
    },
  ];

  return (
    <div className="bg-white min-h-screen pb-24">
      <div className="container mx-auto px-6 lg:px-24 py-16">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Checkout Form */}
          <div className="flex-1">
            <div className="bg-white rounded-[2.5rem] p-10 shadow-2xl border border-slate-50 space-y-10">
              <h1 className="text-3xl font-bold text-slate-800">Checkout</h1>
              
              <div className="space-y-4">
                <p className="text-sm font-bold text-slate-400">Cart Type</p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {[
                    "https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg",
                    "https://upload.wikimedia.org/wikipedia/commons/f/fa/American_Express_logo_%282018%29.svg",
                    "https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg",
                    "https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg"
                  ].map((logo, i) => (
                    <button key={i} className="h-16 flex items-center justify-center p-4 bg-white border border-slate-100 rounded-xl shadow-sm hover:shadow-md transition">
                       <img src={logo} alt="payment" className="h-full object-contain" />
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <Label className="text-sm font-bold text-slate-700">Name on Card</Label>
                  <Input placeholder="Enter name on Card" className="rounded-xl h-12 border-slate-100 placeholder:text-slate-300" />
                </div>
                
                <div className="space-y-2">
                  <Label className="text-sm font-bold text-slate-700">Card Number</Label>
                  <Input placeholder="Enter Card Number" className="rounded-xl h-12 border-slate-100 placeholder:text-slate-300" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div className="space-y-2">
                    <Label className="text-sm font-bold text-slate-700">Expiration Date ( MM/YY )</Label>
                    <Input placeholder="Enter Expiration Date" className="rounded-xl h-12 border-slate-100 placeholder:text-slate-300" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-bold text-slate-700">CVC</Label>
                    <Input placeholder="Enter CVC" className="rounded-xl h-12 border-slate-100 placeholder:text-slate-300" />
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Checkbox id="save-info" className="h-5 w-5 rounded-md border-slate-200" />
                  <label htmlFor="save-info" className="text-sm text-slate-400 font-medium cursor-pointer">
                    Save my information for faster checkout
                  </label>
                </div>
              </div>

              <Button className="w-full bg-cyan-400 hover:bg-cyan-500 text-white rounded-xl h-14 font-bold text-lg">
                Confirm Payment
              </Button>
            </div>
          </div>

          {/* Summary Sidebar */}
          <div className="lg:w-[400px]">
            <div className="bg-blue-50/30 rounded-[2.5rem] p-10 space-y-8">
              <h2 className="text-2xl font-bold text-slate-800">Summary</h2>
              
              <div className="space-y-6">
                {cartItems.map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="h-16 w-20 shrink-0 rounded-xl overflow-hidden shadow-md">
                      <Image src={item.image} alt="course" width={80} height={64} className="object-cover h-full" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-bold text-slate-800 leading-tight mb-1">{item.title}</h4>
                      <p className="text-[10px] text-slate-400 font-medium">{item.desc}</p>
                      <p className="text-sm font-bold text-slate-700 mt-1">${item.price}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-8 border-t border-slate-200 space-y-4">
                <div className="flex justify-between text-sm font-bold">
                  <span className="text-slate-400">Subtotal</span>
                  <span className="text-slate-700">$51.38</span>
                </div>
                <div className="flex justify-between text-sm font-bold">
                  <span className="text-slate-400">Coupon Discount</span>
                  <span className="text-slate-700">0 %</span>
                </div>
                <div className="flex justify-between text-sm font-bold">
                  <span className="text-slate-400">TAX</span>
                  <span className="text-slate-700">5</span>
                </div>
                <div className="flex justify-between text-xl font-bold pt-4 border-t border-slate-100">
                   <span className="text-slate-400">Total</span>
                   <span className="text-slate-800">$56.38</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Offers Section */}
      <section className="container mx-auto px-6 lg:px-24 py-16">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-2xl font-bold text-slate-800">Top Education offers and deals are listed here</h2>
          <Link href="/" className="text-primary font-bold text-sm hover:underline">See all</Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[50, 10, 50].map((off, i) => (
            <div key={i} className="bg-slate-900 rounded-[2.5rem] p-8 relative overflow-hidden group shadow-xl">
               <div className="absolute top-6 left-6 bg-cyan-400 text-white font-black px-4 py-1 rounded-lg text-lg z-10">{off}%</div>
               <div className="pt-16 space-y-4 relative z-10">
                  <h3 className="text-xl font-bold text-white uppercase tracking-tight">Lorem ipsum dolor</h3>
                  <p className="text-slate-400 text-[10px] leading-relaxed font-bold">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor...
                  </p>
                  <p className="text-slate-400 text-[10px] leading-relaxed font-bold">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor...
                  </p>
               </div>
               <div className="relative h-48 mt-6 rounded-2xl overflow-hidden opacity-50 transition group-hover:opacity-80">
                  <Image src={`https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=400&auto=format&fit=crop`} alt="offer" fill className="object-cover" />
               </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
