import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: "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",
  dangerouslyAllowBrowser: true
});

export interface Message {
  role: "system" | "user" | "assistant";
  content: string;
}

export const getGroqChatCompletion = async (messages: Message[]) => {
  return groq.chat.completions.create({
    messages: [
      {
        role: "system",
        content: "You are an expert AI tutor. Your role is to help students learn by providing clear explanations, answering questions, and guiding them through problems step by step. Be encouraging, patient, and adapt your teaching style to help students understand concepts effectively. Always break down complex topics into digestible parts."
      },
      ...messages
    ],
    model: "llama-3.3-70b-versatile",
    temperature: 0.7,
    max_tokens: 1024,
  });
};