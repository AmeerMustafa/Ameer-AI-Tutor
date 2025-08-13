import { useState, useRef, useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { ChatMessage } from "@/components/ChatMessage";
import { ChatInput } from "@/components/ChatInput";
import { TypingIndicator } from "@/components/TypingIndicator";
import { getGroqChatCompletion, type Message } from "@/lib/groq";
import { FileText, Upload, Brain, Sparkles, Heart, FileCheck, MessageSquare } from "lucide-react";

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
    <div className="min-h-screen relative overflow-hidden" style={{ background: 'var(--gradient-background)' }}>
      {/* Animated Background Elements */}
      <div className="neural-pattern"></div>
      <div className="floating-orb w-32 h-32 top-10 left-10"></div>
      <div className="floating-orb w-24 h-24 top-1/3 right-20"></div>
      <div className="floating-orb w-20 h-20 bottom-1/4 left-1/4"></div>
      <div className="floating-orb w-16 h-16 top-3/4 right-1/3"></div>

      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <header className="text-center pt-8 pb-6">
          <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-3">
            Document Summarizer & Q&A
          </h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto px-4">
            Upload your documents and get instant summaries with intelligent Q&A powered by advanced AI
          </p>
        </header>

        {/* Main Content */}
        <div className="flex-1 flex flex-col lg:flex-row gap-8 px-6 max-w-7xl mx-auto w-full">
          {/* Left Side - Upload & Chat Interface */}
          <div className="flex-1 flex flex-col min-h-0">
            {messages.length === 0 ? (
              /* Upload Interface */
              <div className="glass rounded-3xl p-8 mb-6">
                <div className="text-center mb-8">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-2xl glass flex items-center justify-center">
                    <FileText className="w-10 h-10 text-primary" />
                  </div>
                  <h2 className="text-2xl font-semibold gradient-text mb-2">
                    Upload Your Document
                  </h2>
                  <p className="text-white/70">
                    Drag and drop your file here, or click to browse
                  </p>
                </div>

                {/* Upload Zone */}
                <div className="upload-zone rounded-2xl p-12 text-center mb-6 cursor-pointer hover:scale-[1.02] transition-transform">
                  <Upload className="w-12 h-12 mx-auto mb-4 text-primary animate-pulse" />
                  <p className="text-lg font-medium text-white/80 mb-2">
                    Drop your files here
                  </p>
                  <p className="text-sm text-white/60">
                    Supports PDF, DOC, DOCX, TXT files up to 10MB
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button className="btn-premium flex-1 h-14" disabled={isLoading}>
                    <FileCheck className="w-5 h-5 mr-2" />
                    Summarize Document
                  </Button>
                  <Button 
                    variant="outline" 
                    className="flex-1 h-14 glass border-white/20 text-white hover:bg-white/10"
                    onClick={() => handleSendMessage("Hello! I'd like to ask questions about documents.")}
                    disabled={isLoading}
                  >
                    <MessageSquare className="w-5 h-5 mr-2" />
                    Start Q&A Chat
                  </Button>
                </div>
              </div>
            ) : (
              /* Chat Interface */
              <div className="glass rounded-3xl p-6 flex-1 flex flex-col min-h-0">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
                  <div className="w-10 h-10 rounded-xl glass flex items-center justify-center">
                    <Brain className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">AI Assistant</h3>
                    <p className="text-sm text-white/60">Ready to answer your questions</p>
                  </div>
                </div>

                <ScrollArea ref={scrollAreaRef} className="flex-1 pr-4">
                  <div className="space-y-4">
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
            )}
          </div>

          {/* Right Side - AI Illustration */}
          <div className="w-80 hidden lg:flex flex-col items-center justify-start">
            <div className="glass rounded-3xl p-8 text-center sticky top-8">
              <div className="w-48 h-48 mx-auto mb-6 rounded-3xl glass flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20"></div>
                <Brain className="w-24 h-24 text-primary relative z-10" />
                <Sparkles className="w-8 h-8 text-accent absolute top-4 right-4 animate-pulse" />
                <div className="absolute -bottom-2 -right-2 w-16 h-16 rounded-full bg-gradient-to-br from-primary/30 to-transparent blur-xl"></div>
              </div>
              
              <h3 className="text-xl font-semibold gradient-text mb-3">
                AI-Powered Intelligence
              </h3>
              <p className="text-white/70 text-sm leading-relaxed">
                Advanced document analysis with natural language understanding for comprehensive summaries and intelligent Q&A
              </p>
              
              <div className="mt-6 flex items-center justify-center gap-2 text-xs text-white/50">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                <span>AI Model Active</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center py-6 mt-8">
          <div className="w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mb-4"></div>
          <p className="text-sm text-white/60 flex items-center justify-center gap-2">
            <span>Designed by</span>
            <Brain className="w-4 h-4 text-primary" />
            <span className="gradient-text-accent font-medium">Ameer Mustafa</span>
            <Heart className="w-4 h-4 text-pink-400 animate-pulse ml-1" />
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
