import { buttonVariants } from "@/components/Shared/Buttons/Button";
import MainLayout from "@/components/Shared/MainLayout";
import { getDocumentById } from "@/features/api/documents";
import Link from "next/link";

import DocumentPage from "@/components/Documents/DocumentPage";

export default async function DocumentsPage({
  params,
}: {
  params: { documentId: string };
}) {
  const { documentId } = params;

  const document = await getDocumentById(documentId);

  return (
    <MainLayout title={`Page of document ${documentId}`}>
      <Link
        className={`${buttonVariants({ variant: "outline" })} w-fit`}
        href="/"
      >
        {" "}
        Go back{" "}
      </Link>
      <DocumentPage document={document} />
    </MainLayout>
  );
}
