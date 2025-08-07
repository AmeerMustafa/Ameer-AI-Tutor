import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { GraduationCap, Sparkles } from "lucide-react";

export const ChatHeader = () => {
  return (
    <div className="flex items-center justify-center p-6 glass rounded-2xl mb-6">
      <div className="flex items-center gap-3">
        <Avatar className="w-12 h-12 bg-gradient-accent glow">
          <AvatarFallback className="bg-transparent">
            <GraduationCap className="w-6 h-6 text-white" />
          </AvatarFallback>
        </Avatar>
        
        <div className="text-center">
          <h1 className="text-2xl font-bold gradient-text flex items-center gap-2">
            AI Tutor
            <Sparkles className="w-5 h-5 text-yellow-400 animate-pulse" />
          </h1>
          <p className="text-sm text-muted-foreground">
            Your personal learning companion
          </p>
        </div>
      </div>
    </div>
  );
};