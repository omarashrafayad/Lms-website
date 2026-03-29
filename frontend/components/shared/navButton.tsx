import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

export default function NavButton({ active, onClick, icon, label, className }: { active: boolean, onClick: () => void, icon: React.ReactNode, label: string, className?: string }) {
  return (
    <Button
      variant={active ? "secondary" : "ghost"}
      className={cn(
        "w-full justify-start gap-4 h-12 text-base font-medium transition-all cursor-pointer",
        active ? "bg-primary/10 text-primary hover:bg-primary/20" : "hover:bg-muted",
        className
      )}
      onClick={onClick}
    >
      {icon}
      {label}
    </Button>
  );
}
