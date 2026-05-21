import {FC} from "react";
import {Chat} from "./components";
import {messagesService} from "@/services";

export const Main: FC = () => {
  const handleMessageReceived = async (message: string) => {
    const response = await messagesService.addMessage({message})
    return response.message;
  }

  return <Chat onMessageReceived={handleMessageReceived} />
}
