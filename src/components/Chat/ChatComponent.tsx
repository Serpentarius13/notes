"use client";

import { toaster } from "@/features/lib/toaster";
import { Message } from "@prisma/client";
import { useRouter } from "next/navigation";

interface IChatComponent {
  messages: Message[] | undefined;
}
export default function ChatComponent({ messages }: IChatComponent) {
  const router = useRouter();

  if (!messages) {
    toaster.error("Error getting messages");
    router.push("/chat");
  }

  console.log(messages);
  return <> {JSON.stringify(messages)} </>;
}
