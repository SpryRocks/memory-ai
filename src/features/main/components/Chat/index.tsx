import {FC} from "react";
import {ChatBox, ChatBoxProps, ChatConversationHeader} from "@mui/x-chat";

const createEmptyStream = () => new ReadableStream({
  start(controller) {
    controller.close();
  },
});

interface IChatProps {
  onMessageReceived: (message: string) => Promise<void>
}

const ConversationHeader: FC = (props) =>
  <ChatConversationHeader {...props}>
    Memory AI
  </ChatConversationHeader>

export const Chat: FC<IChatProps> = ({onMessageReceived}) => {
  const adapter: ChatBoxProps["adapter"] = {
    sendMessage: async (message) => {
      if (message.message.parts[0].type === "text") {
        await onMessageReceived(message.message.parts[0].text)
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
