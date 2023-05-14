"use client";

import { useEffect, useRef, useState } from "react";

import { AiOutlinePlus } from "react-icons/ai";
import TextInput from "../Shared/Input/TextInput";
import { useField } from "@/features/hooks/useField";
import Button from "../Shared/Buttons/Button";

import { FormEvent } from "react";
import axios from "axios";
import LoadingButton from "../Shared/Buttons/LoadingButton";

const AddNoteForm = ({
  handleClose,
  refetch,
}: {
  handleClose: () => void;
  refetch: () => void;
}) => {
  const { value: title, handleChange: handleTitleChange } = useField<string>();

  const { value: text, handleChange: handleTextChange } = useField<string>();

  const [isLoading, setLoading] = useState<boolean>(false);

  const formRef = useRef<HTMLFormElement | null>(null);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!text) return alert("Write some text");

    try {
      setLoading(true);

      await axios.post("/api/note", { title, text });

      refetch();
      handleClose();
    } catch (error) {
      alert("There was an error creating note");
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
      className="flex  w-max flex-col items-start  gap-[1rem] "
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

export default function AddNote({ refetch }: { refetch: () => void }) {
  const [isAddingNote, setAddingNote] = useState<boolean>(false);

  return (
    <>
      {isAddingNote ? (
        <AddNoteForm
          handleClose={() => setAddingNote(false)}
          refetch={refetch}
        />
      ) : (
        <button
          onClick={() => setAddingNote(true)}
          className="flex h-[15rem] w-fit px-[8rem]  items-center justify-center rounded-medium border-[1px] border-solid border-black bg-white transition-all hover:border-white hover:bg-black hover:text-white dark:border-white dark:text-black dark:hover:text-white"
        >
          <AiOutlinePlus size={48} />
        </button>
      )}
    </>
  );
}
