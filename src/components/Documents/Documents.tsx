"use client";

import { Document } from "@prisma/client";
import DocumentItem from "./Document/DocumentItem";
import { useRouter } from "next/navigation";
import { toaster } from "@/features/lib/toaster";
import AddDocument from "./Document/AddDocument";

interface IDocuments {
  documents: Document[] | null | undefined;
}

export default function Documents({ documents }: IDocuments) {
  const router = useRouter();

  if (!documents) {
    toaster.error("Error getting documents!");
    router.push("/");
  }
  return (
    <>
      {documents && (
        <ul className="document-wrapper">
          {documents.map((document) => (
            <li key={document.id}>
              {" "}
              <DocumentItem {...document} />
            </li>
          ))}

          <AddDocument />
        </ul>
      )}
    </>
  );
}
