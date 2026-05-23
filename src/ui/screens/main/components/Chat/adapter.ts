import {ChatBoxProps} from "@mui/x-chat";

import {IConversationMessage} from "@/types";

import {getMessageId} from "./utils";

interface ICreateAdapterOptions {
  onMessageReceived: (message: string) => Promise<IConversationMessage>;
}

const createEmptyStream = () => new ReadableStream({
  start(controller) {
    controller.close();
  },
});

const createStaticMessageStream = (message: IConversationMessage) => new ReadableStream({
  start(controller) {
    const messageId = getMessageId(message, 'assistant');
    const answer = message.answer;

    controller.enqueue({ type: 'start', messageId });
    controller.enqueue({ type: 'text-delta', id: messageId, delta: answer });
    controller.enqueue({ type: 'finish', messageId: messageId });

    controller.close();
  },
});

export const createAdapter = ({onMessageReceived}: ICreateAdapterOptions): ChatBoxProps["adapter"] => ({
  sendMessage: async (input) => {
    if (input.message.parts[0].type === "text") {
      const message = input.message.parts[0].text

      const responseMessage = await onMessageReceived(message)

      return createStaticMessageStream(responseMessage);
    }

    return createEmptyStream();
  }
})
