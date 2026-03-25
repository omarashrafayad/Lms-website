import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { IUserChat } from "../types/chat.types";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/stores/useAuthStore";

interface UserPickerProps {
  users: IUserChat[];
  onSelect: (userId: string) => void;
}

export default function UserPicker({ users, onSelect }: UserPickerProps) {
  const user = useAuthStore((state) => state.user);
  const currentUserId = user?._id;

  return (
    <div className="flex flex-col gap-1 max-h-[300px] overflow-y-auto">
      {users.filter(u => u._id !== currentUserId).map((user) => (
        <button
          key={user._id}
          onClick={() => onSelect(user._id)}
          className="flex items-center gap-4 p-4 rounded-2xl transition hover:bg-slate-50 text-left"
        >
          <Avatar className="h-10 w-10 shrink-0">
            <AvatarImage src={user.profileImg} />
            <AvatarFallback className="bg-primary/10 text-primary">
              {user.name?.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 overflow-hidden">
            <p className="font-bold text-slate-800 text-sm">{user.name}</p>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{user.role}</p>
          </div>
        </button>
      ))}
    </div>
  );
}
