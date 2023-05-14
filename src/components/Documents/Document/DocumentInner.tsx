import { Document } from "@prisma/client";
import DeleteDocument from "./DeleteDocument";

interface IDocumentInner extends Pick<Document, "id" | "text" | "title"> {
  isFullSize?: boolean;
}

export default function DocumentInner({isFullSize = false, id, text, title}: IDocumentInner) {
  return (
    <div className="flex flex-col gap-[1.4rem] ">
      <div className="flex max-w-full items-center justify-between">
        <h4 className="max-w-[80%] break-words text-[3rem] font-bold">
          {title ? title : "No title"}
        </h4>

        <DeleteDocument documentId={id} />
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
