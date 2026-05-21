import {FC} from "react";
import {Chat} from "./components";
import {messagesService} from "@/services";

export const Main: FC = () => {
  const handleMessageReceived = async (message: string) => {
    await messagesService.addMessage(message);
  }

  return <Chat onMessageReceived={handleMessageReceived} />
}
