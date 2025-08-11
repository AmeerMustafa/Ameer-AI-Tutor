import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { GraduationCap, Sparkles } from "lucide-react";

export const ChatHeader = () => {
  return (
    <header className="flex items-center justify-between p-4 bg-white/90 backdrop-blur-sm border-b border-muted">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
          <GraduationCap className="w-5 h-5 text-white" />
        </div>
        <h1 className="text-xl font-heading font-bold text-primary">AI Tutor</h1>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground font-body">World-Class Learning Experience</span>
      </div>
    </header>
  );
};