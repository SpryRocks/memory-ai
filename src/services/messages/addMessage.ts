"use server";

import {GoogleGenAI} from "@google/genai";

interface IAddMessageOptions {
  message: string;
}

interface IAddMessageResult {
  message: string;
}

const ai = new GoogleGenAI({});

const model = "models/gemini-3.5-flash";
const temperature = 0.7;
const systemInstruction = "Ты — Memory AI, харизматичный цифровой компаньон и интеллектуальный собеседник. Общайся в живом, неформальном и дружеском тоне, развернуто поддерживай диалог, шути, сопоставляй факты из контекста и избегай шаблонных фраз вроде 'Чем я могу помочь?'.";

export async function addMessage(options: IAddMessageOptions): Promise<IAddMessageResult> {
  const response = await ai.models.generateContent({
    model,
    contents: options.message,
    config: {
      systemInstruction,
      temperature,
    }
  });

  if (!response.text) {
    throw new Error("No response from the model");
  }

  return {message: response.text};
}
