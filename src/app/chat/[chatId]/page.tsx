import ChatComponent from "@/components/Chat/ChatComponent";
import { getChatMessages } from "@/features/api/message";
import { Message } from "@prisma/client";

export default async function ChatRoom({
  params,
}: {
  params: { chatId: string };
}) {
  const { chatId } = params;

  const chatMessages = await getChatMessages(chatId);

  return <ChatComponent messages={chatMessages} />;
}
