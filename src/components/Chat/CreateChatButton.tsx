"use client";

import { toaster } from "@/features/lib/toaster";
import LoadingButton from "../Shared/Buttons/LoadingButton";

import { useState } from "react";
import { serverFetcher } from "@/features/api/serverFetcher";
import { useRouter } from "next/navigation";
import { Chat } from "@prisma/client";
import ReusableSelect from "../Shared/Input/Select/ReusableSelect";
import { ChatContext } from "@/features/types/gpt";

const options = Object.values(ChatContext);

export default function CreateChatButton() {
  const [isLoading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  const [chatContext, setChatContext] = useState<string>("");
  async function createChat() {
    if (!chatContext) return toaster.warning("Select chat context");
    try {
      setLoading(true);
      const { data: chat } = await serverFetcher.post<Chat>("/api/chat", {
        context: chatContext,
      });

      router.push(`/chat/${chat.id}`);
    } catch (error) {
      console.log(error)
      toaster.error("Error creating chat");
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className="flex flex-col gap-[1.4rem]">
      <ReusableSelect
        options={options}
        currentOption={chatContext}
        placeholder="Select context"
        handleChange={setChatContext}
        isFacingUp
      />
      <LoadingButton loading={isLoading} onClick={createChat}>
        Create chat
      </LoadingButton>
    </div>
  );
}
