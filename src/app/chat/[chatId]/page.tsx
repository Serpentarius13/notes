import ChatComponent from "@/components/Chat/ChatInner/ChatComponent";
import { getChatMessages } from "@/features/api/message";
import { getOwnSession } from "@/features/utils/getSession";
import { Message } from "@prisma/client";
import { notFound } from "next/navigation";

export const revalidate = 0;

export default async function ChatRoom({
  params,
}: {
  params: { chatId: string };
}) {
  const { chatId } = params;

  const session = await getOwnSession();
  const chatMessages = await getChatMessages(chatId, session);

  if (!chatMessages) return notFound()

  return (
    <ChatComponent
      fetchedMessages={chatMessages}
      chatId={chatId}
      session={session}
    />
  );
}
