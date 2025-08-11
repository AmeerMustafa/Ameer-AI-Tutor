import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Loader2, Mic, MicOff } from "lucide-react";
import { useSpeechToText } from "@/hooks/useSpeechToText";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

export const ChatInput = ({ onSendMessage, isLoading }: ChatInputProps) => {
  const [message, setMessage] = useState("");
  const { isRecording, isTranscribing, startRecording, stopRecording } = useSpeechToText();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !isLoading && !isRecording && !isTranscribing) {
      onSendMessage(message.trim());
      setMessage("");
    }
  };

  const handleMicClick = async () => {
    if (isRecording) {
      try {
        const transcription = await stopRecording();
        if (transcription.trim()) {
          onSendMessage(transcription.trim());
          setMessage("");
        }
      } catch (error) {
        console.error("Error during transcription:", error);
      }
    } else {
      try {
        await startRecording();
      } catch (error) {
        console.error("Error starting recording:", error);
      }
    }
  };

  const isBusy = isLoading || isRecording || isTranscribing;

  return (
    <form onSubmit={handleSubmit} className="flex gap-3 p-4 bg-white border border-secondary/20 rounded-xl shadow-soft">
      <div className="flex-1 flex gap-2">
        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={
            isRecording 
              ? "Listening..." 
              : isTranscribing 
                ? "Converting speech to text..." 
                : "Ask me anything... I'm here to help you learn!"
          }
          className="flex-1 border-secondary/30 focus:ring-primary focus:border-primary font-body"
          disabled={isBusy}
        />
        <Button
          type="button"
          onClick={handleMicClick}
          disabled={isLoading}
          className={`${
            isRecording 
              ? "bg-red-500 hover:bg-red-600 animate-pulse" 
              : "bg-gradient-primary hover:opacity-90"
          } transition-all shadow-glow rounded-xl`}
          size="icon"
        >
          {isTranscribing ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : isRecording ? (
            <MicOff className="w-4 h-4" />
          ) : (
            <Mic className="w-4 h-4" />
          )}
        </Button>
      </div>
      <Button 
        type="submit" 
        disabled={!message.trim() || isBusy}
        className="bg-gradient-primary hover:opacity-90 transition-opacity shadow-glow rounded-xl"
        size="icon"
      >
        {isLoading ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <Send className="w-4 h-4" />
        )}
      </Button>
    </form>
  );
};