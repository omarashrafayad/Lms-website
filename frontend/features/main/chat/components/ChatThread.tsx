"use client";

import { MessageSquare } from "lucide-react";
import { IMessage } from "../types/chat.types";
import { format } from "date-fns";
import { arSA } from "date-fns/locale";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuthStore } from "@/stores/useAuthStore";
import { cn } from "@/lib/utils";
import { useEffect, useRef } from "react";
import { useLocale, useTranslations } from "next-intl";

interface ChatThreadProps {
  messages: IMessage[];
  isLoading?: boolean;
}

export default function ChatThread({ messages, isLoading }: ChatThreadProps) {
  const t = useTranslations("chat");
  const locale = useLocale();
  const user = useAuthStore((state) => state.user);
  const currentUserId = user?._id;
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getTimeLocale = () => (locale === "ar" ? arSA : undefined);

  return (
    <div className="flex flex-col gap-8 p-3 overflow-y-auto max-h-[calc(100vh-350px)] lg:max-h-[calc(100vh-300px)] custom-scrollbar bg-muted/5">
      {messages.length === 0 && !isLoading && (
        <div className="flex flex-col items-center justify-center py-32 text-center space-y-6">
          <div className="h-24 w-24 rounded-[3rem] bg-card border border-border shadow-2xl flex items-center justify-center">
            <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
              <MessageSquare size={24} />
            </div>
          </div>
          <div className="space-y-2">
            <p className="font-black text-xl uppercase tracking-tighter">{t("sayHello")}</p>
            <p className="text-muted-foreground text-sm font-medium">{t("startConversation")}</p>
          </div>
        </div>
      )}

      {messages.map((msg, i) => {
        const isMe = msg.sender._id === currentUserId;
        const showAvatar = i === 0 || messages[i - 1].sender._id !== msg.sender._id;

        return (
          <div key={msg._id} className={cn("flex gap-4 group", isMe ? "flex-row-reverse" : "flex-row")}>
            <div className={cn("h-10 w-10 shrink-0 self-end mb-2", !showAvatar && "invisible")}>
              <Avatar className="h-full w-full border-2 border-card shadow-lg">
                <AvatarImage src={msg.sender.profileImg} className="object-cover" />
                <AvatarFallback className="bg-primary/5 text-[10px] font-black text-primary uppercase">
                  {msg.sender.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
            </div>

            <div className={cn("max-w-[75%] space-y-2 fadeIn flex flex-col", isMe ? "items-end" : "items-start")}>
              <div className={cn(
                "px-4 py-2 rounded-[2rem] text-sm font-bold leading-relaxed shadow-sm transition-all duration-300 hover:shadow-md",
                isMe
                  ? "bg-primary text-white rounded-br-none shadow-primary/20 hover:bg-primary/95"
                  : "bg-card text-foreground rounded-bl-none border border-border hover:border-primary/10"
              )}>
                {msg.content}
              </div>
              <div className={cn(
                "flex items-center gap-2 px-3 transition-opacity duration-300",
                "opacity-40 group-hover:opacity-100"
              )}>
                <span className="text-[9px] font-black text-muted-foreground uppercase tracking-[0.2em] leading-none">
                  {format(new Date(msg.createdAt), "HH:mm", { locale: getTimeLocale() })}
                </span>
                {isMe && <span className="text-[9px] font-black text-primary uppercase tracking-widest leading-none">• {t("sent")}</span>}
              </div>
            </div>
          </div>
        );
      })}
      <div ref={messagesEndRef} />
    </div>
  );
}
