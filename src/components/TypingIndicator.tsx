import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Bot } from "lucide-react";

export const TypingIndicator = () => {
  return (
    <div className="flex gap-4 py-6">
      <Avatar className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 flex-shrink-0">
        <AvatarFallback className="bg-transparent">
          <Bot className="w-4 h-4 text-white" />
        </AvatarFallback>
      </Avatar>
      
      <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-4 py-3">
        <div className="flex items-center gap-1">
          <div className="flex gap-1">
            <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
            <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
            <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
          </div>
          <span className="text-sm text-white/70 ml-3">AI Tutor is thinking...</span>
        </div>
      </div>
    </div>
  );
};