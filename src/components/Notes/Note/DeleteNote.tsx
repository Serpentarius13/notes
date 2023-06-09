"use client";

import DeleteButton from "@/components/Shared/Buttons/DeleteButton";

import { toaster } from "@/features/lib/toaster";
import { sleep } from "@/features/utils/sleep";
import axios from "axios";
import { useRouter } from "next/navigation";

interface IDeleteNote {
  noteId: number;
  isRedirectingToNotes?: boolean;
}

export default function DeleteNote({
  noteId,
  isRedirectingToNotes = false,
}: IDeleteNote) {
  const router = useRouter();

  async function handleDelete() {
    await axios.delete(`/api/note/${noteId}`);
  }

  async function onSuccess() {
    await sleep(2).then(() => {
      if (isRedirectingToNotes) router.push("/");
      else router.refresh();
    });
    toaster.success(`Successfully deleted note ${noteId}`);
  }

  function onError() {
    toaster.error("Error deleting note");
  }

  return (
    <DeleteButton
      deleteHandler={handleDelete}
      onError={onError}
      onSuccess={onSuccess}
    />
  );
}
