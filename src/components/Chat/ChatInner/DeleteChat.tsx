import LoadingButton from "@/components/Shared/Buttons/LoadingButton";
import { serverFetcher } from "@/features/api/serverFetcher";
import { toaster } from "@/features/lib/toaster";
import { TNumString } from "@/features/types/util";
import { useRouter } from "next/navigation";

import { useState } from "react";

import { AiFillDelete } from "react-icons/ai";

export default function DeleteChat({ chatId }: { chatId: TNumString }) {
  const [isLoading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  async function deleteChat() {
    try {
      setLoading(true);
      await serverFetcher.delete(`/api/chat/${chatId}`);

      router.push("/chat");
    } catch (error) {
      toaster.error("Error deleting chat!");
    } finally {
      setLoading(false);
    }
  }

  return (
    <LoadingButton
      loading={isLoading}
      onClick={deleteChat}
      className="gap-[1rem] !text-[1.2rem] font-bold text-red-500 hover:text-red-700"
    >
      {" "}
      <AiFillDelete size={24} /> <span> Delete chat</span>
    </LoadingButton>
  );
}
