import { Button } from "@/components/ui/button";
import { BookOpen, Calculator, Lightbulb, Code } from "lucide-react";

interface QuickActionsProps {
  onQuickAction: (prompt: string) => void;
  isLoading: boolean;
}

export const QuickActions = ({ onQuickAction, isLoading }: QuickActionsProps) => {
  const quickPrompts = [
    {
      icon: BookOpen,
      label: "Explain a concept",
      prompt: "Can you explain a complex concept in simple terms?"
    },
    {
      icon: Calculator,
      label: "Solve a problem",
      prompt: "Help me solve a math problem step by step"
    },
    {
      icon: Lightbulb,
      label: "Study tips",
      prompt: "Give me effective study strategies for better learning"
    },
    {
      icon: Code,
      label: "Code help",
      prompt: "Help me understand programming concepts"
    }
  ];

  return (
    <div className="grid grid-cols-2 gap-4 max-w-lg mx-auto">
      {quickPrompts.map((action, index) => (
        <Button
          key={index}
          variant="outline"
          onClick={() => onQuickAction(action.prompt)}
          disabled={isLoading}
          className="h-auto p-6 flex flex-col items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 hover:bg-gradient-to-r hover:from-purple-600/80 hover:to-pink-600/80 hover:text-white hover:scale-105 transition-all duration-300 group text-white rounded-2xl"
        >
          <action.icon className="w-6 h-6 group-hover:scale-110 transition-transform" />
          <span className="text-sm font-medium">{action.label}</span>
        </Button>
      ))}
    </div>
  );
};