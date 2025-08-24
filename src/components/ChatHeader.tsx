import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { GraduationCap } from "lucide-react";

export const ChatHeader = () => {
  return (
    <header className="flex items-center justify-center p-4 border-b border-white/20 bg-black/20 backdrop-blur-md">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 rounded-lg flex items-center justify-center">
          <GraduationCap className="w-5 h-5 text-white" />
        </div>
        <h1 className="text-lg font-semibold text-white">Made by Ameer Mustafa</h1>
      </div>
    </header>
  );
};