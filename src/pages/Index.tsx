import { useState, useRef, useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import { ChatHeader } from "@/components/ChatHeader";
import { ChatMessage } from "@/components/ChatMessage";
import { ChatInput } from "@/components/ChatInput";
import { TypingIndicator } from "@/components/TypingIndicator";
import { QuickActions } from "@/components/QuickActions";
import { getGroqChatCompletion, type Message } from "@/lib/groq";
import { Heart } from "lucide-react";
import aiTutorIllustration from "@/assets/ai-tutor-futuristic-avatar.png";

interface ChatMessage {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

const Index = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Auto-scroll to bottom when new messages are added
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [messages, isLoading]);

  const handleSendMessage = async (content: string) => {
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const groqMessages: Message[] = messages.map(msg => ({
        role: msg.isUser ? "user" : "assistant",
        content: msg.content
      }));

      groqMessages.push({
        role: "user",
        content
      });

      const completion = await getGroqChatCompletion(groqMessages);
      const aiResponse = completion.choices[0]?.message?.content || "I apologize, but I couldn't generate a response. Please try again.";

      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: aiResponse,
        isUser: false,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error generating response:", error);
      toast({
        title: "Error",
        description: "Failed to get response from AI tutor. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-background">
      <div className="max-w-7xl mx-auto h-screen flex flex-col">
        <ChatHeader />
        
        {/* Main Content Area - 70/30 Split */}
        <div className="flex-1 flex gap-6 p-6 min-h-0">
          {/* Left 70% - Chat Interface */}
          <div className="flex-1 flex flex-col min-h-0 bg-white/80 backdrop-blur-sm rounded-2xl shadow-card p-6">
            <ScrollArea ref={scrollAreaRef} className="flex-1 pr-4">
              <div className="space-y-4">
                {messages.length === 0 && (
                  <div className="text-center py-12">
                    <div className="mb-8">
                      <h2 className="text-xl font-heading font-semibold text-primary mb-2">
                        Welcome to your AI Tutor! 🎓
                      </h2>
                      <p className="text-muted-foreground font-body">
                        I'm here to help you learn anything. Ask me questions, request explanations, or get study help!
                      </p>
                    </div>
                    <QuickActions onQuickAction={handleSendMessage} isLoading={isLoading} />
                  </div>
                )}
                
                {messages.map((message) => (
                  <ChatMessage
                    key={message.id}
                    message={message.content}
                    isUser={message.isUser}
                    timestamp={message.timestamp}
                  />
                ))}
                
                {isLoading && <TypingIndicator />}
              </div>
            </ScrollArea>
            
            <div className="mt-6">
              <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
            </div>
          </div>
          
          {/* Right 30% - AI Illustration */}
          <div className="w-80 hidden lg:flex flex-col items-center justify-start pt-8">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-card p-6 text-center">
              <img 
                src={aiTutorIllustration} 
                alt="AI Tutor Assistant" 
                className="w-48 h-48 mx-auto mb-4"
              />
              <h3 className="font-heading font-semibold text-secondary mb-2">
                Your AI Learning Companion
              </h3>
              <p className="text-sm text-muted-foreground font-body">
                Ready to help you master any subject with personalized explanations and guidance.
              </p>
            </div>
          </div>
        </div>
        
        <footer className="text-center py-4 bg-white/50 backdrop-blur-sm">
          <p className="text-sm text-muted-foreground font-body flex items-center justify-center gap-1">
            made with <Heart className="w-4 h-4 text-red-500 animate-pulse" /> by Ameer Mustafa
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
