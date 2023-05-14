import { Note } from "@prisma/client";
import Button, { buttonVariants } from "../../Shared/Buttons/Button";
import Link from "next/link";
import NoteInner from "./NoteInner";
import { makeLocaleDate } from "@/features/utils/makeLocaleDate";
import NoteDate from "./NoteDate";

interface INote extends Pick<Note, "title" | "id" | "text" | "createdAt"> {}

export default function Note({ title, text, id, createdAt }: INote) {
  return (
    <article className="dark:bg-dark-gray group flex flex-col justify-between gap-[1.4rem] border-[1px] border-solid  border-black p-[1rem] dark:border-white md:max-w-[30rem] ">
      <NoteInner title={title} text={text} />

      <div className="flex w-full items-center justify-between gap-[1rem]">
        <NoteDate date={createdAt} />
        <Link
          className={`${buttonVariants({
            variant: "outline",
          })} opacity-0 transition-all group-hover:opacity-100`}
          href={`/note/${id}`}
        >
          {" "}
          Edit{" "}
        </Link>
      </div>
    </article>
  );
}
