"use client";

import { toaster } from "@/features/lib/toaster";
import { Message } from "@prisma/client";
import { useRouter } from "next/navigation";
import SendChatMessage from "./SendChatMessage";
import { TNumString } from "@/features/types/util";

import { useState, useRef, useEffect, useCallback } from "react";
import DeleteChat from "./DeleteChat";
import ChatMessage from "./ChatMessage";
import { sleep } from "@/features/utils/sleep";
import { Session } from "next-auth";

interface IChatComponent {
  fetchedMessages: Message[] | undefined;
  chatId: TNumString;
  session: Session;
}
export default function ChatComponent({
  fetchedMessages,
  chatId,
  session,
}: IChatComponent) {
  const router = useRouter();

  if (!fetchedMessages) {
    toaster.error("Error getting messages");
    router.push("/chat");
  }

  const [messages, setMessages] = useState<Message[]>(fetchedMessages ?? []);

  const messagesRef = useRef<HTMLUListElement | null>(null);

  const scrollBottom = useCallback(() => {
    if (!messagesRef.current) return;
    messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
  }, [messagesRef]);

  function handleAddMessage(message: Message) {
    setMessages((messages) => [...messages, message]);

    sleep(1).then(() => scrollBottom());
  }

  useEffect(() => {
    scrollBottom();
  }, []);

  return (
    <div className="flex h-full w-full flex-col items-end gap-[2rem] ">
      {" "}
      <ul
        className="mb-[1rem] flex h-full max-h-[70vh] w-full flex-col gap-[1rem] overflow-y-auto rounded-big border-b-[1px] border-solid border-black bg-white p-[2rem] dark:border-white dark:bg-gray-800"
        ref={messagesRef}
      >
        {messages.map((message) => (
          <ChatMessage
            message={message}
            messages={messages}
            key={message.id}
            avatar={session.user.image as string}
          />
        ))}
      </ul>
      <SendChatMessage chatId={chatId} handleAddMessage={handleAddMessage} />
      <DeleteChat chatId={chatId} />
    </div>
  );
}
