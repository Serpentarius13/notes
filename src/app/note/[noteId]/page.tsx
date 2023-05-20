import NotePage from "@/components/Notes/NotePage";
import { buttonVariants } from "@/components/Shared/Buttons/Button";
import MainLayout from "@/components/Shared/MainLayout";
import { getOneNote } from "@/features/api/notes";

import { Note } from "@prisma/client";

import Link from "next/link";
import { notFound } from "next/navigation";

export default async function Note({
  params: { noteId },
}: {
  params: { noteId: string };
}) {
  const note = await getOneNote(noteId);

  if(!note) return notFound()

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
