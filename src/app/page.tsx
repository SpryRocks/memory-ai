"use client";

import {FC} from 'react';
import {ChatBox, ChatBoxProps, ChatConversationHeader} from "@mui/x-chat";

const createEmptyStream = () => new ReadableStream({
  start(controller) {
    controller.close();
  },
});

const adapter: ChatBoxProps["adapter"] = {
  sendMessage: async () => {
    return createEmptyStream();
  }
}

const ConversationHeader: FC = (props) =>
  <ChatConversationHeader {...props}>
    Memory AI
  </ChatConversationHeader>

const Home: FC = () =>
  <ChatBox
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

export default Home;
