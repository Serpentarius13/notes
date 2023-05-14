"use client";

import LoadingButton from "@/components/Shared/Buttons/LoadingButton";
import TextInput from "@/components/Shared/Input/TextInput";
import { serverFetcher } from "@/features/api/serverFetcher";
import { useField } from "@/features/hooks/useField";
import { toaster } from "@/features/lib/toaster";
import { TNumString } from "@/features/types/util";
import { Message } from "@prisma/client";
import { useState, useEffect, useCallback } from "react";

interface ISendChatMessage {
  chatId: TNumString;
  handleAddMessage: (message: Message) => void;
}

export default function SendChatMessage({
  chatId,
  handleAddMessage,
}: ISendChatMessage) {
  const [isLoading, setLoading] = useState<boolean>(false);
  const { value: message, handleChange, resetState } = useField<string>();

  const sendMessage = useCallback(async () => {
    if (!message) return toaster.warning("Enter message");
    try {
      setLoading(true);
      const {
        data: { myMessage, response },
      } = await serverFetcher.post<{ response: Message; myMessage: Message }>(
        "/api/gpt",
        { message, chatId }
      );

      handleAddMessage(myMessage);
      handleAddMessage(response);
      resetState();
    } catch (error) {
      toaster.error("Error sending message! ");
    } finally {
      setLoading(false);
    }
  }, [handleAddMessage, resetState, chatId, message]);

  const handleEnter = useCallback(
    (event: KeyboardEvent) => {
      console.log(event.key);
      if (event.key === "Enter") sendMessage();
    },
    [sendMessage]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleEnter);

    return () => document.removeEventListener("keydown", handleEnter);
  }, [handleEnter]);

  return (
    <div className="flex w-full items-center gap-[2rem]">
      <div className="flex-1">
        <TextInput
          handleChange={handleChange}
          placeholder="Enter your message"
          value={message}
        />
      </div>

      <LoadingButton onClick={sendMessage} loading={isLoading}>
        {" "}
        Send{" "}
      </LoadingButton>
    </div>
  );
}
