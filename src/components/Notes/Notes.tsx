import MainLayout from "../Shared/MainLayout";
import AddNote from "./AddNote";

import Note from "./Note/Note";

import LoadingSpinner from "../Shared/LoadingSpinner";
import { toaster } from "@/features/lib/toaster";

import { apiGetUserNotes } from "@/features/api/notes";

export const revalidate = 0;

export default async function Notes() {
  const notes = await apiGetUserNotes();

  if (!notes) {
    toaster.error("Error getting notes");
  }

  return (
    <MainLayout title="Notes">
      {notes ? (
        <ul className="grid w-full max-w-[90vw] grid-cols-3 items-start   gap-[2rem] sm:!grid-cols-[1fr] md:grid-cols-2">
          {notes?.map((note) => (
            <Note key={note.id} {...note} />
          ))}
          <AddNote />
        </ul>
      ) : (
        <LoadingSpinner size={64} />
      )}
    </MainLayout>
  );
}
