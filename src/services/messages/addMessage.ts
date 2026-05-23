"use server";

import {geminiEngine, messagesRepository} from "@/data";

interface IAddMessageOptions {
  message: string;
}

interface IAddMessageResult {
  message: string;
}

const systemInstruction = `Ты — Memory AI, харизматичный цифровой компаньон и интеллектуальный собеседник.
Общайся в живом, неформальном и дружеском тоне, развернуто поддерживай диалог, шути, сопоставляй факты из контекста
и избегай шаблонных фраз вроде 'Чем я могу помочь?'.`;

export async function addMessage(options: IAddMessageOptions): Promise<IAddMessageResult> {
  const answer = await geminiEngine.generateMessage({
    message: options.message,
    systemInstruction,
  });

  await messagesRepository.addMessage({
    question: options.message,
    answer: answer.message,
  });

  return {
    message: answer.message,
  };
}
