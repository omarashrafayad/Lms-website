"use client";

import Image from "next/image";
import { PlayCircle, Check, Facebook, Twitter, Instagram, Youtube, Linkedin } from "lucide-react";
import { getImageUrl } from "@/lib/image.utils";

interface CourseDetailsSidebarProps {
  course: any;
  t: any;
  locale: string;
}

export function CourseDetailsSidebar({ course, t, locale }: CourseDetailsSidebarProps) {
  return (
    <div className="w-full lg:w-[420px] shrink-0">
      <div className="bg-card rounded-[2.5rem] p-8 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.12)] border border-border top-28">
        <div className="relative aspect-[16/10] rounded-3xl overflow-hidden mb-8 shadow-2xl border-4 border-muted group">
          <div className="absolute inset-0 bg-slate-900" />
          <Image
            src={getImageUrl(course.imageCover, 'courses')}
            unoptimized
            alt="Preview"
            fill
            className="object-contain"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/50 transition-all duration-500 backdrop-blur-[2px] group-hover:backdrop-blur-none">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/30 rounded-full blur-2xl animate-pulse" />
              <button className="relative h-20 w-20 flex items-center justify-center bg-white rounded-full text-primary scale-100 hover:scale-110 transition-transform shadow-2xl">
                <PlayCircle size={40} className="fill-primary" />
              </button>
            </div>
          </div>
        </div>
        <div className="space-y-8 text-left rtl:text-right">
          <div className="pt-8 border-t border-border space-y-6">
            <h4 className="font-black text-foreground text-lg flex items-center gap-2 rtl:flex-row-reverse">
              {t("inclusions")}
            </h4>
            <div className="grid grid-cols-1 gap-4">
              {[t("lifetimeAccess"), t("allDevices"), t("certification"), t("moneyBack")].map((feat, i) => (
                <div key={i} className="flex items-center gap-4 text-sm text-muted-foreground font-bold bg-muted p-4 rounded-2xl border border-border rtl:flex-row-reverse">
                  <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Check size={14} className="text-primary" />
                  </div>
                  {feat}
                </div>
              ))}
            </div>
          </div>

          <div className="pt-8 border-t border-border space-y-5">
            <h4 className="font-black text-foreground text-sm uppercase tracking-widest">{t("share")}</h4>
            <div className="flex items-center gap-3 rtl:flex-row-reverse">
              {[
                { Icon: Facebook, url: `https://www.facebook.com/sharer/sharer.php?u=${typeof window !== 'undefined' ? encodeURIComponent(window.location.href) : ''}` },
                { Icon: Twitter, url: `https://twitter.com/intent/tweet?url=${typeof window !== 'undefined' ? encodeURIComponent(window.location.href) : ''}` },
                { Icon: Instagram, url: "https://instagram.com" },
                { Icon: Youtube, url: "https://youtube.com" },
                { Icon: Linkedin, url: `https://www.linkedin.com/sharing/share-offsite/?url=${typeof window !== 'undefined' ? encodeURIComponent(window.location.href) : ''}` },
              ].map(({ Icon, url }, i) => (
                <a
                  key={i}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-12 w-12 flex items-center justify-center rounded-2xl bg-muted text-muted-foreground hover:text-white hover:bg-primary transition-all hover:shadow-xl hover:shadow-primary/20 cursor-pointer"
                >
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
