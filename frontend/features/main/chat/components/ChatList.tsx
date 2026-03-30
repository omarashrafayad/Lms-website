"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDistanceToNow } from "date-fns";
import { enUS, arSA } from "date-fns/locale";
import { IConversation } from "../types/chat.types";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/stores/useAuthStore";
import { useLocale, useTranslations } from "next-intl";

interface ChatListProps {
  conversations: IConversation[];
  selectedId?: string;
  onSelect: (id: string) => void;
}

export default function ChatList({ conversations, selectedId, onSelect }: ChatListProps) {
  const t = useTranslations("chat");
  const locale = useLocale();
  const user = useAuthStore((state) => state.user);
  const currentUserId = user?._id;

  const getLocaleObj = () => (locale === "ar" ? arSA : enUS);

  return (
    <div className="flex flex-col gap-2">
      {conversations.map((conv) => {
        const otherParticipant = conv.participants.find(p => p._id !== currentUserId);
        const isActive = selectedId === conv._id;

        return (
          <button
            key={conv._id}
            onClick={() => onSelect(conv._id)}
            className={cn(
              "group flex items-center gap-4 p-5 rounded-[2rem] transition-all duration-300 text-left border-2 border-transparent rtl:text-right rtl:flex-row-reverse",
              isActive
                ? "bg-primary text-white shadow-xl shadow-primary/20 scale-[1.02] border-primary/10"
                : "hover:bg-muted/50 hover:border-border text-foreground"
            )}
          >
            <div className="relative">
              <Avatar className={cn(
                "h-14 w-14 transition-transform duration-500 group-hover:scale-110",
                isActive ? "border-2 border-white/30" : "border-2 border-primary/5"
              )}>
                <AvatarImage src={otherParticipant?.profileImg} className="object-cover" />
                <AvatarFallback className={cn(
                  "font-black text-lg",
                  isActive ? "bg-white/20 text-white" : "bg-primary/5 text-primary"
                )}>
                  {otherParticipant?.name?.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              {!isActive && (
                <div className="absolute bottom-0 right-0 h-4 w-4 bg-emerald-500 border-4 border-card rounded-full" title="Online" />
              )}
            </div>

            <div className="flex-1 overflow-hidden space-y-1">
              <div className="flex justify-between items-center rtl:flex-row-reverse">
                <p className="font-black text-sm tracking-tight truncate">{otherParticipant?.name}</p>
              </div>
              <p className={cn(
                "text-xs truncate font-medium",
                isActive ? "text-white/80" : "text-muted-foreground"
              )}>
                {conv.lastMessage?.content || t("noMessages")}
              </p>
            </div>
          </button>
        );
      })}
    </div>
  );
}
