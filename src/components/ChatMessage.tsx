import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { Bot, User } from "lucide-react";

interface ChatMessageProps {
  message: string;
  isUser: boolean;
  timestamp: Date;
}

export const ChatMessage = ({ message, isUser, timestamp }: ChatMessageProps) => {
  return (
    <div className={cn(
      "flex gap-3 p-4 rounded-2xl mb-4 max-w-[80%] transition-all duration-300 hover:scale-[1.02]",
      isUser 
        ? "ml-auto bg-gradient-primary text-primary-foreground glow" 
        : "mr-auto glass"
    )}>
      {!isUser && (
        <Avatar className="w-8 h-8 bg-gradient-accent glow">
          <AvatarFallback className="bg-transparent">
            <Bot className="w-4 h-4 text-white" />
          </AvatarFallback>
        </Avatar>
      )}
      
      <div className="flex-1">
        <p className="text-sm leading-relaxed whitespace-pre-wrap">
          {message}
        </p>
        <span className="text-xs opacity-70 mt-2 block">
          {timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>

      {isUser && (
        <Avatar className="w-8 h-8 bg-gradient-secondary">
          <AvatarFallback className="bg-transparent">
            <User className="w-4 h-4 text-white" />
          </AvatarFallback>
        </Avatar>
      )}
    </div>
  );
};