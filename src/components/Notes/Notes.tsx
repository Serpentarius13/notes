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
        <ul className="document-wrapper">
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
