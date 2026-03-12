"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-slate-900 pt-24 pb-12 text-white/70">
      <div className="container mx-auto px-6 lg:px-24">
        {/* Top Header */}
        <div className="flex flex-col items-center justify-center text-center space-y-8 mb-20">
          <div className="flex items-center gap-6 divide-x divide-gray-700">
             <div className="flex items-center gap-3">
               <div className="border-2 border-primary h-12 w-12 flex items-center justify-center rotate-45">
                 <span className="text-xl font-bold text-white -rotate-45">TOTC</span>
               </div>
             </div>
             <div className="pl-6 font-bold text-gray-400 tracking-wider">
               Virtual Class <br /> for Zoom
             </div>
          </div>
          
          <h3 className="text-2xl font-bold text-white tracking-widest uppercase">Subscribe to get our Newsletter</h3>
          
          <div className="flex w-full max-w-lg items-center gap-4 bg-transparent border border-gray-700 rounded-full p-1 pl-6">
            <input 
              type="email" 
              placeholder="Your Email" 
              className="bg-transparent border-none outline-none flex-1 text-white placeholder:text-gray-500 text-sm"
            />
            <Button className="rounded-full bg-cyan-400 text-white font-bold px-8 h-12 hover:bg-cyan-500 border-none">
              Subscribe
            </Button>
          </div>
        </div>

        {/* Bottom Links */}
        <div className="flex flex-col items-center gap-6 border-t border-gray-800 pt-12">
           <div className="flex gap-8 text-sm font-medium">
             <Link href="/" className="hover:text-white transition-colors">Careers</Link>
             <span className="text-gray-700">|</span>
             <Link href="/" className="hover:text-white transition-colors">Privacy Policy</Link>
             <span className="text-gray-700">|</span>
             <Link href="/" className="hover:text-white transition-colors">Terms & Conditions</Link>
           </div>
           
           <p className="text-sm font-medium">© 2026 Class Technologies Inc.</p>
        </div>
      </div>
    </footer>
  );
}
