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
    <div className="grid grid-cols-2 gap-3 mb-6">
      {quickPrompts.map((action, index) => (
        <Button
          key={index}
          variant="outline"
          onClick={() => onQuickAction(action.prompt)}
          disabled={isLoading}
          className="h-auto p-4 flex flex-col items-center gap-2 glass hover:bg-gradient-primary hover:text-white transition-all duration-300 group"
        >
          <action.icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
          <span className="text-xs font-medium">{action.label}</span>
        </Button>
      ))}
    </div>
  );
};