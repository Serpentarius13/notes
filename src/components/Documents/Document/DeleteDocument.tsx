"use client";

import DeleteButton from "@/components/Shared/Buttons/DeleteButton";

import { toaster } from "@/features/lib/toaster";
import { sleep } from "@/features/utils/sleep";
import axios from "axios";
import { useRouter } from "next/navigation";

interface IDeleteDocument {
  documentId: string;
}

export default function DeleteDocument({ documentId }: IDeleteDocument) {
  const router = useRouter();

  async function handleDelete() {
    await axios.delete(`/api/documents/${documentId}`);
  }

  async function onSuccess() {
    await sleep(2).then(() => {
      router.push("/documents");
    });
    toaster.success(`Successfully deleted document ${documentId}`);
  }

  function onError() {
    toaster.error("Error deleting document");
  }

  return (
    <DeleteButton
      deleteHandler={handleDelete}
      onError={onError}
      onSuccess={onSuccess}
    />
  );
}
