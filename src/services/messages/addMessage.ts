"use server";

import {geminiEngine, messagesRepository} from "@/data";
import {IConversationMessage} from "@/types";
import {nanoid} from "nanoid";

interface IAddMessageOptions {
  question: string;
}

const systemInstruction = `Ты — Memory AI, харизматичный цифровой компаньон и интеллектуальный собеседник.
Общайся в живом, неформальном и дружеском тоне, развернуто поддерживай диалог, шути, сопоставляй факты из контекста
и избегай шаблонных фраз вроде 'Чем я могу помочь?'.`;

export async function addMessage({question}: IAddMessageOptions): Promise<IConversationMessage> {
  const {answer} = await geminiEngine.generateMessage({
    question,
    systemInstruction,
  });

  const message: IConversationMessage = {
    id: nanoid(),
    question,
    answer,
    createdAt: new Date(),
  }

  await messagesRepository.addMessage(message);

  return message;
}
