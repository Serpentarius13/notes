import { Note } from "@prisma/client";
import Button, { buttonVariants } from "../../Shared/Buttons/Button";
import Link from "next/link";
import NoteInner from "./NoteInner";
import { makeLocaleDate } from "@/features/utils/makeLocaleDate";
import NoteDate from "../../Shared/Document/DocumentDate";
import DocumentWrapper from "@/components/Shared/Document/DocumentWrapper";

interface INote extends Pick<Note, "title" | "id" | "text" | "createdAt"> {}

export default function Note({ title, text, id, createdAt }: INote) {
  return (
    <DocumentWrapper createdAt={createdAt} to={`/note/${id}`}>
      <NoteInner title={title} text={text} id={id} />
    </DocumentWrapper>
  );
}
