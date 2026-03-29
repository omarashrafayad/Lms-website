"use client";

import { Button } from "@/components/ui/button";
import { Send, Loader2 } from "lucide-react";
import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";

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
      className="p-4 lg:p-6 bg-card border-t border-border relative group transition-colors duration-300"
    >
      <div className="flex items-center gap-2 bg-muted/50 rounded-full p-1.5 lg:p-2 border-2 border-border focus-within:border-primary/20 focus-within:bg-background transition-all shadow-inner">
        <input
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder={t("typeMessage")}
          className="flex-1 min-w-0 bg-transparent px-3 lg:px-6 py-2 outline-none text-foreground font-medium placeholder:text-muted-foreground placeholder:font-bold placeholder:uppercase placeholder:tracking-widest placeholder:text-[9px] lg:placeholder:text-[10px] rtl:text-right text-sm"
        />
        <Button
          type="submit"
          disabled={isLoading || !content.trim()}
          className="h-10 w-10 lg:h-12 lg:w-12 rounded-full bg-primary hover:bg-primary/90 text-white shadow-xl shadow-primary/20 shrink-0 transition hover:scale-110 active:scale-95 cursor-pointer flex items-center justify-center p-0"
          title={t("send")}
        >
          {isLoading ? (
            <Loader2 className="animate-spin" size={18} />
          ) : (
            <Send size={18}  />
          )}
        </Button>
      </div>
    </form>
  );
}
