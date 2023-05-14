"use client";

import { baseUrl } from "@/features/constants/baseUrl";
import MainLayout from "../Shared/MainLayout";
import AddNote from "./AddNote";
import { Note as NoteType } from "@prisma/client";
import Note from "./Note/Note";
import axios from "axios";
import { useEffect, useState } from "react";
import LoadingSpinner from "../Shared/LoadingSpinner";
import { toaster } from "@/features/lib/toaster";

export default function Notes() {
  const [notes, setNotes] = useState<NoteType[] | null>(null);

  useEffect(() => {
    getNotes();
  }, []);

  async function getNotes() {
    try {
      const { data }: { data: NoteType[] } = await axios.get(
        `${baseUrl}/api/note`
      );

      setNotes(data);
    } catch (error) {
      toaster.error("Error getting notes. Try reloading page");
    }
  }

  if (!notes) {
    //...
  }
  return (
    <MainLayout title="Notes">
      {notes ? (
        <ul className="grid w-full max-w-[90vw] grid-cols-3 items-start   gap-[2rem] sm:!grid-cols-[1fr] md:grid-cols-2">
          {notes?.map((note) => (
            <Note key={note.id} {...note} />
          ))}
          <AddNote refetch={getNotes} />
        </ul>
      ) : (
        <LoadingSpinner size={64} />
      )}
    </MainLayout>
  );
}
