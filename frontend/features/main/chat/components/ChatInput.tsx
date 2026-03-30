"use client";

import { Button } from "@/components/ui/button";
import { Send, Loader2 } from "lucide-react";
import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { cn } from "@/lib/utils";

interface ChatInputProps {
  onSend: (content: string) => void;
  isLoading?: boolean;
}

export default function ChatInput({ onSend, isLoading }: ChatInputProps) {
  const t = useTranslations("chat");
  const locale = useLocale();
  const [content, setContent] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim()) {
      onSend(content.trim());
      setContent("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 lg:p-8 bg-card border-t border-border relative group transition-all duration-300"
    >
      <div className="flex items-center gap-3 bg-muted/30 rounded-[2.5rem] p-2 border-2 border-transparent focus-within:border-primary/20 focus-within:bg-background transition-all shadow-inner hover:bg-muted/40">
        <input
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder={t("typeMessage")}
          className="flex-1 min-w-0 bg-transparent px-6 py-3 outline-none text-foreground font-bold placeholder:text-muted-foreground/50 placeholder:font-black placeholder:uppercase placeholder:tracking-[0.2em] placeholder:text-[10px] rtl:text-right text-sm"
        />
        <Button
          type="submit"
          disabled={isLoading || !content.trim()}
          className="h-12 w-12 lg:h-14 lg:w-14 rounded-full bg-primary hover:bg-primary/90 text-white shadow-2xl shadow-primary/30 shrink-0 transition-all hover:scale-110 active:scale-90 cursor-pointer flex items-center justify-center p-0 disabled:opacity-30 disabled:scale-100"
          title={t("send")}
        >
          {isLoading ? (
            <Loader2 className="animate-spin" size={22} />
          ) : (
            <Send size={22} className={cn("transition-transform duration-300", content.trim() ? "translate-x-0.5 -translate-y-0.5 rotate-[-10deg]" : "")} />
          )}
        </Button>
      </div>
    </form>
  );
}
