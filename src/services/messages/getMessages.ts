"use server";

import {messagesRepository} from "@/data";
import {IConversationMessage} from "@/types";

type IGetMessagesResult = IConversationMessage[];

export async function getMessages(): Promise<IGetMessagesResult> {
  return messagesRepository.getMessages();
}
