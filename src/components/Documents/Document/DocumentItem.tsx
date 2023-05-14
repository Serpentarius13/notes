import DocumentWrapper from "@/components/Shared/Document/DocumentWrapper";
import { Document } from "@prisma/client";
import DeleteDocument from "./DeleteDocument";
import DocumentInner from "./DocumentInner";

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
      <DocumentInner title={title} text={text} id={id} />
    </DocumentWrapper>
  );
}
