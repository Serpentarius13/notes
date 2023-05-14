import ChatComponent from "@/components/Chat/ChatInner/ChatComponent";
import { getChatMessages } from "@/features/api/message";
import { getOwnSession } from "@/features/utils/getSession";
import { Message } from "@prisma/client";

export const revalidate = 0;

export default async function ChatRoom({
  params,
}: {
  params: { chatId: string };
}) {
  const { chatId } = params;

  const session = await getOwnSession();
  const chatMessages = await getChatMessages(chatId, session);

  if (!chatMessages) throw new Error("Chat not found");

  return (
    <ChatComponent
      fetchedMessages={chatMessages}
      chatId={chatId}
      session={session}
    />
  );
}
