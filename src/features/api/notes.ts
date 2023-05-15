import prisma from "../lib/prisma";

import { getOwnSession } from "../utils/getSession";

export async function getUserNotes() {
  const session = await getOwnSession();
  return await prisma.note.findMany({ where: { userId: session.user.id } });
}

export async function getOneNote(noteId: string) {
  const session = await getOwnSession();
  return await prisma.note.findFirst({
    where: { id: noteId, userId: session.user.id },
  });
}
