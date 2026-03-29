import React from 'react';

export default function Loading() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-white dark:bg-[#0a0b0c] transition-colors duration-300">
      <div className="relative flex items-center justify-center">
        {/* Outer glowing ring */}
        <div className="absolute h-24 w-24 animate-ping rounded-full bg-primary/20" />
        {/* Loading spinner */}
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-slate-200 border-t-primary dark:border-slate-800 dark:border-t-primary shadow-lg shadow-primary/20" />
      </div>
      
      <div className="mt-12 space-y-6 text-center animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="flex flex-col items-center gap-2">
            <h2 className="text-3xl font-black text-slate-800 dark:text-white tracking-widest uppercase">
                TOT<span className="text-primary">C</span>
            </h2>
            <div className="h-1 w-12 bg-primary rounded-full" />
        </div>
        
        <div className="flex items-center gap-2.5 justify-center">
          <div className="h-2.5 w-2.5 rounded-full bg-primary animate-bounce [animation-delay:-0.3s] shadow-sm shadow-primary/50" />
          <div className="h-2.5 w-2.5 rounded-full bg-primary animate-bounce [animation-delay:-0.15s] shadow-sm shadow-primary/50" />
          <div className="h-2.5 w-2.5 rounded-full bg-primary animate-bounce shadow-sm shadow-primary/50" />
        </div>
        
        <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.4em] max-w-[200px] leading-relaxed">
            Experience Premium Learning Journey
        </p>
      </div>

      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/5 rounded-full blur-[120px] animate-pulse [animation-delay:2s]" />
      </div>
    </div>
  );
}
