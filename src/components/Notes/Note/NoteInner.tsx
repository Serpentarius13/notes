import { Note } from "@prisma/client";
import DeleteNote from "./DeleteNote";

interface INoteInner extends Pick<Note, "id" | "text" | "title"> {
  isFullSize?: boolean;
}

export default function NoteInner({
  title,
  id,
  text,
  isFullSize = false,
}: INoteInner) {
  return (
    <div className="flex flex-col gap-[1.4rem] ">
      <div className="flex max-w-full items-center justify-between">
        <h4 className="max-w-[80%] break-words text-[3rem] font-bold">
          {title ? title : "No title"}
        </h4>

        <DeleteNote noteId={id} isRedirectingToNotes={isFullSize}  />
      </div>

      <p
        className={`${
          isFullSize ? "" : " note-text h-[4.5rem]"
        }  max-w-full  break-words text-[1.6rem]`}
      >
        {text}
      </p>
    </div>
  );
}
