import { getServerSession } from "next-auth";
import { TNumString } from "../types/util";
import { authOptions } from "../lib/auth";
import { getOwnSession } from "../utils/getSession";

export async function getChats() {
  const session = await getOwnSession();

  const chats = await prisma?.chat.findMany({
    where: { userId: session.user.id },
  });

  return chats;
}

export async function getChat(chatId: TNumString) {
  const chat = await prisma?.chat.findUnique({
    where: { id: +chatId },
    include: { messages: true },
  });

  return chat;
}
