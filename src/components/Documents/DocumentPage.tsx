"use client";

import { Document } from "@prisma/client";
import { FormEvent, useState } from "react";
import TextInput from "../Shared/Input/TextInput";

import NoteDate from "../Shared/Document/DocumentDate";
import Button from "../Shared/Buttons/Button";

import Loading from "../Shared/LoadingPage";
import { toaster } from "@/features/lib/toaster";
import { useRouter } from "next/navigation";
import axios from "axios";
import DocumentInner from "./Document/DocumentInner";

export default function DocumentPage({
  document,
}: {
  document: Document | null;
}) {
  const router = useRouter();

  if (!document) router.push("/documents");

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [documentState, setDocumentState] = useState<Document | null>(document);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function handleUpdateNote(event: FormEvent) {
    event.preventDefault();

    try {
      setIsLoading(true);
      const { data } = await axios.patch("/api/note", {
        note: documentState,
      });
      setDocumentState(data);

      toaster.success("Document was successfully updated!");
      setIsEditing(false);
    } catch (error) {
      toaster.error("Error updating document");
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
          {isEditing && documentState ? (
            <form
              className="flex w-full max-w-[80rem] flex-col gap-[2rem]"
              onSubmit={handleUpdateNote}
            >
              <TextInput
                handleChange={(event: any) =>
                  setDocumentState((note: any) => ({
                    ...note,
                    title: event.target.value,
                  }))
                }
                placeholder="Title of document"
                initialValue={documentState?.title as string}
              />

              <TextInput
                handleChange={(event: any) =>
                  setDocumentState((note: any) => ({
                    ...note,
                    text: event.target.value,
                  }))
                }
                placeholder="Text of document"
                type="textarea"
                initialValue={documentState?.text as string}
              />

              <Button variant="outline">Save changes</Button>
            </form>
          ) : (
            <>
              {" "}
              {documentState && (
                <div className="flex max-w-[60rem] flex-col gap-[1rem]">
                  <DocumentInner
                    title={documentState.title}
                    text={documentState.text}
                    isFullSize
                    id={documentState.id}
                  />

                  <div className="flex  flex-col gap-[1rem] text-[1.6rem]">
                    <span>
                      Created at: <NoteDate date={documentState.createdAt} />
                    </span>

                    <span>
                      Updated at: <NoteDate date={documentState.updatedAt} />
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
