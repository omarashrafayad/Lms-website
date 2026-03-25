import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDistanceToNow } from "date-fns";
import { IConversation } from "../types/chat.types";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/stores/useAuthStore";

interface ChatListProps {
  conversations: IConversation[];
  selectedId?: string;
  onSelect: (id: string) => void;
}

export default function ChatList({ conversations, selectedId, onSelect }: ChatListProps) {
  const user = useAuthStore((state) => state.user);
  const currentUserId = user?._id;

  return (
    <div className="flex flex-col gap-1">
      {conversations.map((conv) => {
        const otherParticipant = conv.participants.find(p => p._id !== currentUserId);
        const isActive = selectedId === conv._id;

        return (
          <button
            key={conv._id}
            onClick={() => onSelect(conv._id)}
            className={cn(
              "flex items-center gap-4 p-4 rounded-[1.5rem] transition-all text-left",
              isActive 
                ? "bg-primary text-white shadow-xl shadow-primary/20 scale-[1.02]" 
                : "hover:bg-slate-50 text-slate-600"
            )}
          >
            <Avatar className="h-12 w-12 border-2 border-white/20">
              <AvatarImage src={otherParticipant?.profileImg} />
              <AvatarFallback className={cn(isActive ? "bg-white/20 text-white" : "bg-primary/10 text-primary")}>
                {otherParticipant?.name?.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 overflow-hidden">
              <div className="flex justify-between items-baseline mb-1">
                <p className="font-bold truncate">{otherParticipant?.name}</p>
                <span className={cn("text-[9px] font-bold uppercase", isActive ? "text-white/60" : "text-slate-400")}>
                  {formatDistanceToNow(new Date(conv.updatedAt), { addSuffix: true })}
                </span>
              </div>
              <p className={cn("text-xs truncate", isActive ? "text-white/80" : "text-slate-400")}>
                {conv.lastMessage?.content || "No messages yet"}
              </p>
            </div>
          </button>
        );
      })}
    </div>
  );
}
