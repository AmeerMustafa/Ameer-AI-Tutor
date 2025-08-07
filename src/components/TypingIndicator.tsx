import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Bot } from "lucide-react";

export const TypingIndicator = () => {
  return (
    <div className="flex gap-3 p-4 rounded-2xl mb-4 max-w-[80%] mr-auto glass">
      <Avatar className="w-8 h-8 bg-gradient-accent glow">
        <AvatarFallback className="bg-transparent">
          <Bot className="w-4 h-4 text-white" />
        </AvatarFallback>
      </Avatar>
      
      <div className="flex items-center gap-1">
        <div className="flex gap-1">
          <div className="w-2 h-2 bg-gradient-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
          <div className="w-2 h-2 bg-gradient-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
          <div className="w-2 h-2 bg-gradient-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>
        <span className="text-xs text-muted-foreground ml-2">AI Tutor is thinking...</span>
      </div>
    </div>
  );
};