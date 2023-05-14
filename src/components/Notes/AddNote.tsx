"use client";

import { useEffect, useRef, useState } from "react";

import TextInput from "../Shared/Input/TextInput";
import { useField } from "@/features/hooks/useField";
import Button from "../Shared/Buttons/Button";

import { FormEvent } from "react";
import axios from "axios";
import LoadingButton from "../Shared/Buttons/LoadingButton";
import { toaster } from "@/features/lib/toaster";

import { useRouter } from "next/navigation";

const AddNoteForm = ({ handleClose }: { handleClose: () => void }) => {
  const { value: title, handleChange: handleTitleChange } = useField<string>();

  const { value: text, handleChange: handleTextChange } = useField<string>();

  const [isLoading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  const formRef = useRef<HTMLFormElement | null>(null);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!text) return toaster.warning("Write some note text");

    try {
      setLoading(true);

      await axios.post("/api/note", { title, text });

      handleClose();

      toaster.success("Note was successfuly added!");

      router.refresh();
    } catch (error) {
      toaster.error("Error creating note");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!formRef.current) return;
    (formRef.current?.children[0] as HTMLElement).focus();
  }, []);
  return (
    <form
      onSubmit={handleSubmit}
      className="flex  w-full flex-col  items-start gap-[1rem] "
      ref={formRef}
    >
      <TextInput handleChange={handleTitleChange} placeholder="Note title" />
      <TextInput
        handleChange={handleTextChange}
        placeholder="Note text"
        type="textarea"
      />

      <LoadingButton loading={isLoading} className="w-full">
        Submit
      </LoadingButton>

      <Button
        variant="outline"
        className="w-full"
        type="button"
        onClick={handleClose}
      >
        {" "}
        Close
      </Button>
    </form>
  );
};

export default function AddNote() {
  const [isAddingNote, setAddingNote] = useState<boolean>(false);

  return (
    <>
      {isAddingNote ? (
        <AddNoteForm handleClose={() => setAddingNote(false)} />
      ) : (
        <button onClick={() => setAddingNote(true)} className="add-btn">
          <span> + </span>
        </button>
      )}
    </>
  );
}
