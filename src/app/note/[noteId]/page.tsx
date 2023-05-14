import NotePage from "@/components/Notes/NotePage";
import { buttonVariants } from "@/components/Shared/Buttons/Button";
import MainLayout from "@/components/Shared/MainLayout";

import { serverFetcher } from "@/features/api/serverFetcher";
import { Note } from "@prisma/client";

import Link from "next/link";

async function getNote(noteId: string) {
  const { data } = await serverFetcher.get(`/api/note/${noteId}`);

  return data as Note;
}

export default async function Note({
  params: { noteId },
}: {
  params: { noteId: string };
}) {
  const note = await getNote(noteId);

  return (
    <MainLayout title={`Page of note ${noteId}`}>
      <Link
        className={`${buttonVariants({ variant: "outline" })} w-fit`}
        href="/"
      >
        {" "}
        Go back{" "}
      </Link>
      <NotePage note={note} />
    </MainLayout>
  );
}
