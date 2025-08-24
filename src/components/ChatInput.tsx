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
    <form onSubmit={handleSubmit} className="flex gap-3 items-end">
      <div className="flex-1 relative">
        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={
            isRecording 
              ? "Listening..." 
              : isTranscribing 
                ? "Converting speech to text..." 
                : "Message AI Tutor..."
          }
          className="w-full border-white/30 focus:ring-purple-500 focus:border-purple-500 font-body bg-white/20 text-white placeholder:text-white/60 py-4 px-4 text-base rounded-2xl"
          disabled={isBusy}
        />
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex gap-2">
          <Button
            type="button"
            onClick={handleMicClick}
            disabled={isLoading}
            className={`${
              isRecording 
                ? "bg-red-500 hover:bg-red-600 animate-pulse" 
                : "bg-white/20 hover:bg-white/30 text-white border border-white/30"
            } transition-all rounded-xl w-8 h-8 p-0`}
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
      </div>
      
      <Button 
        type="submit" 
        disabled={!message.trim() || isBusy}
        className="bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90 transition-opacity rounded-2xl px-6 py-4 h-auto"
      >
        {isLoading ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : (
          <Send className="w-5 h-5" />
        )}
      </Button>
    </form>
  );
};