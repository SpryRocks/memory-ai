import {FC} from "react";
import {ChatBox, ChatBoxProps, ChatConversationHeader} from "@mui/x-chat";
import {nanoid} from "nanoid";

const createEmptyStream = () => new ReadableStream({
  start(controller) {
    controller.close();
  },
});

const createStaticMessageStream = (message: string) => new ReadableStream({
  start(controller) {
    const messageId = nanoid();

    controller.enqueue({ type: 'start', messageId });
    controller.enqueue({ type: 'text-delta', id: messageId, delta: message });
    controller.enqueue({ type: 'finish', messageId: messageId });

    controller.close();
  },
});

interface IChatProps {
  onMessageReceived: (message: string) => Promise<string>
}

const ConversationHeader: FC = (props) =>
  <ChatConversationHeader {...props}>
    Memory AI
  </ChatConversationHeader>

export const Chat: FC<IChatProps> = ({onMessageReceived}) => {
  const adapter: ChatBoxProps["adapter"] = {
    sendMessage: async (input) => {
      if (input.message.parts[0].type === "text") {
        const message = input.message.parts[0].text

        const responseMessage = await onMessageReceived(message)

        return createStaticMessageStream(responseMessage);
      }

      return createEmptyStream();
    }
  }

  return <ChatBox
    adapter={adapter}
    slots={{
      conversationHeader: ConversationHeader,
    }}
    sx={{
      '& .MuiChatMessage-avatar': {
        visibility: 'hidden',
      },
    }}
  />;
}
