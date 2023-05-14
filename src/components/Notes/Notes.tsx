"use client";

import { baseUrl } from "@/features/constants/baseUrl";
import MainLayout from "../Shared/MainLayout";
import AddNote from "./AddNote";
import { Note as NoteType } from "@prisma/client";
import Note from "./Note/Note";
import axios from "axios";
import { useEffect, useState } from "react";
import LoadingSpinner from "../Shared/LoadingSpinner";

export default function Notes() {
  const [notes, setNotes] = useState<NoteType[] | null>(null);

  useEffect(() => {
    getNotes();
  }, []);

  async function getNotes() {
    const { data }: { data: NoteType[] } = await axios.get(
      `${baseUrl}/api/note`
    );

    setNotes(data);
  }

  if (!notes) {
    //...
  }
  return (
    <MainLayout title="Notes">
      {notes ? (
        <ul className="grid w-full grid-cols-3 gap-[2rem]   sm:!grid-cols-[1fr] md:grid-cols-2 max-w-[90vw]">
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
