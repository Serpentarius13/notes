import DocumentWrapper from "@/components/Shared/Document/DocumentWrapper";
import { Document } from "@prisma/client";
import DeleteDocument from "./DeleteDocument";

interface IDocumentItem
  extends Pick<Document, "id" | "text" | "title" | "createdAt"> {
  isFullSize?: boolean;
}

export default function DocumentItem({
  id,
  text,
  createdAt,
  isFullSize = false,
  title,
}: IDocumentItem) {
  return (
    <DocumentWrapper createdAt={createdAt} to={`/documents/${id}`}>
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
    </DocumentWrapper>
  );
}
