"use client";

import LoadingSpinner from "@/components/Shared/LoadingSpinner";

import { toaster } from "@/features/lib/toaster";

import { useState } from "react";

import { AiFillDelete } from "react-icons/ai";

interface IDeleteNote {
  deleteHandler: () => any;

  onSuccess?: () => any;
  onError?: () => any;
}

export default function DeleteButton({
  deleteHandler,
  onSuccess = () => toaster.success("Deleted!"),
  onError = () => toaster.error("Error deleting!"),
}: IDeleteNote) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function handleDelete() {
    try {
      setIsLoading(true);
      await deleteHandler();

      await onSuccess();
    } catch (error) {
      onError();
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
