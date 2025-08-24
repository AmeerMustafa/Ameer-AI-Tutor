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
// import aiTutorIllustration from "@/assets/ai-tutor-futuristic-avatar.png";

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

  // Debug logging
  console.log("Index component rendering...");
  console.log("Messages count:", messages.length);
  console.log("Is loading:", isLoading);

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
    <div className="min-h-screen relative">
      {/* Luxe Rainbow Background Elements */}
      <div className="body-gradient"></div>
      <div className="body-vignette"></div>
      <div className="body-noise"></div>
      
      {/* Glass Header Badge */}
      <div className="made-by">
        <div className="made-by__dot"></div>
        <span className="made-by__name">Ameer Mustafa</span>
      </div>

      <div className="h-screen flex flex-col">
        <ChatHeader />
        
        {/* Main Chat Area - GPT-5 Style */}
        <div className="flex-1 flex flex-col min-h-0">
          {/* Welcome Screen */}
          {messages.length === 0 && (
            <div className="flex-1 flex flex-col items-center justify-center px-4 py-8">
              <div className="text-center max-w-2xl mx-auto">
                {/* AI Avatar */}
                <div className="mb-8">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 flex items-center justify-center">
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <h1 className="text-4xl font-bold text-white mb-4">
                    AI Tutor
                  </h1>
                  <p className="text-xl text-white/80 mb-8 leading-relaxed">
                    Your intelligent learning companion. Ask me anything and I'll help you understand, learn, and grow.
                  </p>
                </div>
                
                {/* Quick Actions */}
                <QuickActions onQuickAction={handleSendMessage} isLoading={isLoading} />
                
                {/* Footer */}
                <div className="mt-12 text-center">
                  <p className="text-sm text-white/60">
                    Made with <Heart className="w-4 h-4 text-red-400 inline mx-1" /> by Ameer Mustafa
                  </p>
                </div>
              </div>
            </div>
          )}
          
          {/* Chat Messages */}
          {messages.length > 0 && (
            <div className="flex-1 overflow-hidden">
              <ScrollArea ref={scrollAreaRef} className="h-full px-4 py-6">
                <div className="max-w-4xl mx-auto space-y-6">
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
            </div>
          )}
          
          {/* Chat Input - Fixed at Bottom */}
          <div className="border-t border-white/20 bg-black/20 backdrop-blur-md">
            <div className="max-w-4xl mx-auto p-4">
              <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
