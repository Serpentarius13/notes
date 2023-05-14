import { getServerSession } from "next-auth";
import prisma from "../lib/prisma";
import { TUserId } from "../types/db";
import { authOptions } from "../lib/auth";
import { TNumString } from "../types/util";
import { getOwnSession } from "../utils/getSession";

export async function getUserNotes() {
  const session = await getOwnSession();
  return await prisma.note.findMany({ where: { userId: session.user.id } });
}

export async function getAllNotes() {
  return await prisma.note.findMany();
}

export async function getOneNote(noteId: TNumString) {
  return await prisma.note.findUnique({ where: { id: +noteId } });
}

export async function apiGetUserNotes() {
  const notes = await getUserNotes();

  return notes;
}

export async function apiGetNoteById(noteId: TNumString) {
  const session = await getServerSession(authOptions);

  if (!session) throw new Error("Unauthorized");
  const note = await getOneNote(noteId);

  return note;
}
