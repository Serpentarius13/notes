import prisma from "../lib/prisma";
import { TUserId } from "../types/db";

export async function getUserNotes(userId: TUserId) {
  return await prisma.note.findMany({ where: { userId } });
}

export async function getAllNotes() {
  return await prisma.note.findMany();
}
