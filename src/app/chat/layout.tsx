import ChatList from "@/components/Chat/ChatList";
import MainLayout from "@/components/Shared/MainLayout";
import { getChats } from "@/features/api/chat";

export default async function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const chats = await getChats();
  return (
    <MainLayout title="Chat">
      {" "}
      <div className="flex h-full w-full gap-[2rem] rounded-medium border-[1px] border-solid border-black p-[1rem] dark:border-white">
        <ChatList chats={chats ?? []} />

        {children}
      </div>
    </MainLayout>
  );
}
