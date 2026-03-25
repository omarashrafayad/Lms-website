import { Button } from "@/components/ui/button";
import { Send, Loader2 } from "lucide-react";
import { useState } from "react";

interface ChatInputProps {
  onSend: (content: string) => void;
  isLoading?: boolean;
}

export default function ChatInput({ onSend, isLoading }: ChatInputProps) {
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
      className="p-4 lg:p-6 bg-white border-t border-slate-50 relative group"
    >
      <div className="flex items-center gap-3 bg-slate-50/50 rounded-[2.5rem] p-3 border-2 border-slate-50 focus-within:border-primary/20 focus-within:bg-white transition-all shadow-inner">
        <input
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 bg-transparent px-6 py-2 outline-none text-slate-800 font-medium placeholder:text-slate-400 placeholder:font-bold placeholder:uppercase placeholder:tracking-widest placeholder:text-[10px]"
        />
        <Button
          type="submit"
          disabled={isLoading || !content.trim()}
          className="h-12 w-12 rounded-full bg-primary hover:bg-primary/90 text-white shadow-xl shadow-primary/20 flex items-center justify-center shrink-0 transition hover:scale-110 active:scale-95 cursor-pointer"
        >
          {isLoading ? <Loader2 className="animate-spin" size={20} /> : <Send size={20} />}
        </Button>
      </div>
    </form>
  );
}
