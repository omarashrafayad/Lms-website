import { IMessage } from "../types/chat.types";
import { format } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuthStore } from "@/stores/useAuthStore";
import { cn } from "@/lib/utils";
import { useEffect, useRef } from "react";

interface ChatThreadProps {
  messages: IMessage[];
  isLoading?: boolean;
}

export default function ChatThread({ messages, isLoading }: ChatThreadProps) {
  const user = useAuthStore((state) => state.user);
  const currentUserId = user?._id;
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="flex flex-col gap-6 p-6 overflow-y-auto max-h-[calc(100vh-350px)] lg:max-h-[calc(100vh-300px)] custom-scrollbar">
      {messages.length === 0 && !isLoading && (
        <div className="flex flex-col items-center justify-center py-20 text-slate-300 space-y-4">
          <p className="font-bold">Say hello!</p>
          <div className="w-px h-10 bg-slate-100" />
        </div>
      )}

      {messages.map((msg, i) => {
        const isMe = msg.sender._id === currentUserId;
        const showAvatar =  i === 0 || messages[i-1].sender._id !== msg.sender._id;

        return (
          <div key={msg._id} className={cn("flex items-end gap-3", isMe ? "flex-row-reverse" : "flex-row")}>
             <div className={cn("h-8 w-8", !showAvatar && "invisible")}>
                <Avatar className="h-full w-full">
                  <AvatarImage src={msg.sender.profileImg} />
                  <AvatarFallback className="bg-primary/5 text-[10px] text-primary">
                    {msg.sender.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
             </div>
             
             <div className={cn("max-w-[70%] space-y-1 fadeIn", isMe ? "items-end" : "items-start")}>
                <div className={cn(
                  "px-5 py-3 rounded-[1.5rem] text-sm font-medium leading-relaxed drop-shadow-sm transition-all",
                  isMe 
                    ? "bg-primary text-white rounded-br-none hover:bg-primary/95 shadow-lg shadow-primary/20" 
                    : "bg-white text-slate-700 rounded-bl-none border border-slate-100 shadow-sm"
                  )}>
                  {msg.content}
                </div>
                <div className="flex items-center gap-2 px-2">
                   <span className="text-[9px] font-bold text-slate-300 uppercase tracking-widest leading-none">
                     {format(new Date(msg.createdAt), "HH:mm")}
                   </span>
                </div>
             </div>
          </div>
        );
      })}
      <div ref={messagesEndRef} />
    </div>
  );
}
