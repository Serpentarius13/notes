"use client";

import LoadingSpinner from "@/components/Shared/LoadingSpinner";
import { serverFetcher } from "@/features/api/serverFetcher";
import { toaster } from "@/features/lib/toaster";
import { sleep } from "@/features/utils/sleep";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { AiFillDelete } from "react-icons/ai";

type TCompletedDeletion = "refresh" | "to-main";

interface IDeleteNote {
  noteId: number;
  completeDeletion: TCompletedDeletion;
}

export default function DeleteNote({ noteId, completeDeletion }: IDeleteNote) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function handleDelete() {
    try {
      setIsLoading(true);
      await axios.delete(`/api/note/${noteId}`);
      toaster.success(`Successfully deleted note ${noteId}`);

      await sleep(1000).then(() => {
        if (completeDeletion === "refresh") {
          router.refresh();
        }

        switch (completeDeletion) {
          case "refresh":
            location.reload();
          case "to-main":
            router.push("/");
        }
      });
    } catch (error) {
      toaster.error("Error deleting note");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <button onClick={handleDelete} title="Delete note">
      {isLoading ? (
        <LoadingSpinner size={24} />
      ) : (
        <AiFillDelete size={24} className="text-red-500 hover:text-red-700" />
      )}
    </button>
  );
}
