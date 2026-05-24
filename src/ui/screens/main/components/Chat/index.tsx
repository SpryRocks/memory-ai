"use client";

import {FC} from "react";
import {ChatBox, ChatConversationHeader} from "@mui/x-chat";

import {messagesService} from "@/services";
import {IConversationMessage, IStyleSheet} from "@/types";

import {createAdapter} from "./adapter";
import {mapInitialMessagesToMui} from "./utils";

interface IChatProps {
  initialMessages: IConversationMessage[];
}

const ConversationHeader: FC = (props) =>
  <ChatConversationHeader {...props}>
    Memory AI
  </ChatConversationHeader>

export const Chat: FC<IChatProps> = ({initialMessages}) => {
  const handleMessageReceived = (message: string) => {
    return messagesService.addMessage({question: message});
  }

  const adapter = createAdapter({
    onMessageReceived: handleMessageReceived,
  });

  return <ChatBox
    sx={styles.container}
    adapter={adapter}
    slots={{
      conversationHeader: ConversationHeader,
    }}
    initialMessages={mapInitialMessagesToMui(initialMessages)}
  />;
}

const styles = {
  container: {
    '& .MuiChatMessage-avatar': {
      visibility: 'hidden',
    },
  },
} satisfies IStyleSheet;
