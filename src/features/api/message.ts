import { Message } from "@prisma/client";

import prisma from "../lib/prisma";

import { Session } from "next-auth";

export function makeMessage(
  mine: boolean,
  chatId: string,
  text: string
): Omit<Message, "id"> {
  return { mine, chatId: chatId, text };
}

export async function getChatMessages(chatId: string, session: Session) {
  const chat = await prisma.chat.findFirst({
    where: { id: chatId, userId: session.user.id },
    include: { messages: true },
  });

  return chat?.messages;
}

export async function addChatMessage(
  isMine: boolean,
  chatId: string,
  text: string
) {
  const messageToSend = makeMessage(isMine, chatId, text);

  const message = await prisma.message.create({ data: messageToSend });

  return message;
}
