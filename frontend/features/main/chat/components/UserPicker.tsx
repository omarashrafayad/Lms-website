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
    <div className="flex flex-col gap-1 max-h-[300px] overflow-y-auto">
      {users.filter(u => u._id !== currentUserId).map((user) => (
        <button
          key={user._id}
          onClick={() => onSelect(user._id)}
          className="flex items-center gap-4 p-4 rounded-2xl transition hover:bg-muted text-left rtl:text-right rtl:flex-row-reverse"
        >
          <Avatar className="h-10 w-10 shrink-0">
            <AvatarImage src={user.profileImg} />
            <AvatarFallback className="bg-primary/10 text-primary">
              {user.name?.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 overflow-hidden">
            <p className="font-bold text-foreground text-sm">{user.name}</p>
            <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">
              {t(user.role.toLowerCase() as any)}
            </p>
          </div>
        </button>
      ))}
    </div>
  );
}
