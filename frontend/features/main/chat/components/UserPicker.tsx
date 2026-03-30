"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { IUserChat } from "../types/chat.types";
import { useAuthStore } from "@/stores/useAuthStore";
import { useTranslations } from "next-intl";

interface UserPickerProps {
  users: IUserChat[];
  onSelect: (userId: string) => void;
}

export default function UserPicker({ users, onSelect }: UserPickerProps) {
  const t = useTranslations("roles");
  const user = useAuthStore((state) => state.user);
  const currentUserId = user?._id;

  return (
    <div className="flex flex-col gap-2 max-h-[400px] overflow-y-auto custom-scrollbar pr-2">
      {users.filter(u => u._id !== currentUserId).map((user) => (
        <button
          key={user._id}
          onClick={() => onSelect(user._id)}
          className="group flex items-center gap-4 p-4 rounded-[2rem] transition-all duration-300 hover:bg-primary/5 hover:translate-x-1 border border-transparent hover:border-primary/10 text-left rtl:text-right rtl:flex-row-reverse"
        >
          <Avatar className="h-12 w-12 shrink-0 border-2 border-primary/5 shadow-sm group-hover:scale-105 transition-transform duration-500">
            <AvatarImage src={user.profileImg} className="object-cover" />
            <AvatarFallback className="bg-primary/10 text-primary font-black">
              {user.name?.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 overflow-hidden space-y-0.5">
            <p className="font-black text-foreground text-sm tracking-tight">{user.name}</p>
            <p className="text-[9px] text-muted-foreground font-black uppercase tracking-widest leading-none">
              {t(user.role.toLowerCase() as any)}
            </p>
          </div>
        </button>
      ))}
    </div>
  );
}
