import {ChatBoxProps} from "@mui/x-chat";

import {IConversationMessage} from "@/types";

type ChatMessage = NonNullable<ChatBoxProps["initialMessages"]>[number]

export const getMessageId = (message: IConversationMessage, type: "user" | "assistant") => {
  return `${message.id}-${type}`;
}

export function mapInitialMessagesToMui(initialMessages: IConversationMessage[]) {
  const messages: ChatMessage[] = [];

  for (const message of initialMessages) {
    messages.push({
      id: getMessageId(message, 'user'),
      role: "user",
      parts: [{ type: "text", text: message.question }],
    });

    messages.push({
      id: getMessageId(message, 'assistant'),
      role: "assistant",
      parts: [{ type: "text", text: message.answer }],
    });
  }

  return messages;
}
