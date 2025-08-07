import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: "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",
  dangerouslyAllowBrowser: true
});

export const transcribeAudio = async (audioBlob: Blob): Promise<string> => {
  try {
    // Convert blob to file for Groq API
    const file = new File([audioBlob], "audio.wav", { type: "audio/wav" });
    
    const transcription = await groq.audio.transcriptions.create({
      file: file,
      model: "whisper-large-v3-turbo",
      response_format: "text",
      language: "en",
      temperature: 0.0,
    });

    return typeof transcription === 'string' ? transcription : transcription.text || "";
  } catch (error) {
    console.error("Error transcribing audio:", error);
    throw new Error("Failed to transcribe audio");
  }
};