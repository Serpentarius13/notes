import { getOwnSession } from "../utils/getSession";

export async function getChats() {
  const session = await getOwnSession();

  const chats = await prisma?.chat.findMany({
    where: { userId: session.user.id },
  });

  return chats;
}

export async function getChat(chatId: string) {
  const chat = await prisma?.chat.findUnique({
    where: { id: chatId },
    include: { messages: true },
  });

  return chat;
}

export async function deleteChat(chatId: string) {
  await prisma?.chat.delete({ where: { id: chatId } });

  return true;
}
