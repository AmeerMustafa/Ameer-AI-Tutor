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
      "flex gap-4 py-6 transition-all duration-300",
      isUser ? "justify-end" : "justify-start"
    )}>
      {!isUser && (
        <Avatar className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 flex-shrink-0">
          <AvatarFallback className="bg-transparent">
            <Bot className="w-4 h-4 text-white" />
          </AvatarFallback>
        </Avatar>
      )}
      
      <div className={cn(
        "max-w-[85%] rounded-2xl px-4 py-3",
        isUser 
          ? "bg-gradient-to-r from-purple-600/80 to-pink-600/80 backdrop-blur-md text-white border border-white/20" 
          : "bg-white/10 backdrop-blur-md border border-white/20 text-white"
      )}>
        <div className="prose prose-invert max-w-none">
          <p className="text-sm leading-relaxed whitespace-pre-wrap m-0">
            {message}
          </p>
        </div>
        <div className="mt-3 text-xs text-white/60">
          {timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>

      {isUser && (
        <Avatar className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 flex-shrink-0">
          <AvatarFallback className="bg-transparent">
            <User className="w-4 h-4 text-white" />
          </AvatarFallback>
        </Avatar>
      )}
    </div>
  );
};