"use client";

import { Note as NoteType } from "@prisma/client";
import { FormEvent, useEffect, useState } from "react";
import TextInput from "../Shared/Input/TextInput";

import NoteInner from "./Note/NoteInner";
import NoteDate from "./Note/NoteDate";
import Button from "../Shared/Buttons/Button";
import { serverFetcher } from "@/features/api/serverFetcher";
import Loading from "../Shared/LoadingPage";

export default function NotePage({ note }: { note: NoteType }) {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [noteState, setNoteState] = useState<NoteType | null>(null);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setNoteState(note);
  }, [note]);

  async function handleUpdateNote(event: FormEvent) {
    event.preventDefault();

    try {
      setIsLoading(true);
      const { data } = await serverFetcher.patch("/api/note", {
        note: noteState,
      });
      setNoteState(data);
      setIsEditing(false);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {" "}
          {isEditing && noteState ? (
            <form
              className="flex w-full max-w-[80rem] flex-col gap-[2rem]"
              onSubmit={handleUpdateNote}
            >
              <TextInput
                handleChange={(event: any) =>
                  setNoteState((note: any) => ({
                    ...note,
                    title: event.target.value,
                  }))
                }
                placeholder="Title of note"
                initialValue={noteState?.title as string}
              />

              <TextInput
                handleChange={(event: any) =>
                  setNoteState((note: any) => ({
                    ...note,
                    text: event.target.value,
                  }))
                }
                placeholder="Title of note"
                type="textarea"
                initialValue={noteState?.text as string}
              />

              <Button variant="outline">Save changes</Button>
            </form>
          ) : (
            <>
              {" "}
              {noteState && (
                <div className="flex max-w-[60rem] flex-col gap-[1rem]">
                  <NoteInner
                    title={noteState.title}
                    text={noteState.text}
                    isFullSize
                  />

                  <div className="flex  flex-col gap-[1rem] text-[1.6rem]">
                    <span>
                      Created at: <NoteDate date={noteState.createdAt} />
                    </span>

                    <span>
                      Updated at: <NoteDate date={noteState.updatedAt} />
                    </span>
                  </div>

                  <Button
                    variant="default"
                    onClick={() => setIsEditing(!isEditing)}
                  >
                    {" "}
                    Edit
                  </Button>
                </div>
              )}
            </>
          )}{" "}
        </>
      )}
    </>
  );
}