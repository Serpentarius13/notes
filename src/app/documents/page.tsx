import Documents from "@/components/Documents/Documents";
import MainLayout from "@/components/Shared/MainLayout";
import { getDocuments } from "@/features/api/documents";

export const revalidate = 0;

export default async function DocumentsPage() {
  const documents = await getDocuments();

  return (
    <MainLayout title="Files">
      <Documents documents={documents} />
    </MainLayout>
  );
}
