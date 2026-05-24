import {FC} from "react";

import {messagesService} from "@/services";

import {Chat} from "./components";

export const Main: FC = async () => {
  const initialMessages = await messagesService.getMessages();

  return <Chat initialMessages={initialMessages} />
}
