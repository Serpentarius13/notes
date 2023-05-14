import prisma from "../lib/prisma";

export async function getUserNotes(userId: string) {
  return await prisma.note.findMany({ where: { userId } });
}

export async function getAllNotes() {
  return await prisma.note.findMany();
}
