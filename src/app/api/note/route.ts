import { getUserNotes } from "@/features/api/notes";
import { authOptions } from "@/features/lib/auth";
import prisma from "@/features/lib/prisma";
import {
  makeBadRequestError,
  makeNotEnoughDataError,
  makeUnauthorizedError,
} from "@/features/utils/serverError";
import { Note } from "@prisma/client";
import { getServerSession } from "next-auth";
import { getToken } from "next-auth/jwt";
import { headers } from "next/dist/client/components/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) return makeUnauthorizedError();

    const { title, text } = await request.json();

    if (!text) return makeNotEnoughDataError("No text was provided");

    const note = await prisma?.note.create({
      data: { userId: session.user.id, title, text },
    });

    return NextResponse.json(note);
  } catch (error) {
    console.log(error);
    return makeBadRequestError("Error creating note");
  }
}

export async function PATCH(request: Request) {
  try {
    const { note }: { note: Note } = await request.json();

    if (!note) return makeNotEnoughDataError("No note was provided");
    const newNote = await prisma?.note.update({
      data: { ...note, updatedAt: new Date() },
      where: { id: note.id },
    });

    return NextResponse.json(newNote);
  } catch (error) {
    console.log(error);
    return makeBadRequestError("Error updating note");
  }
}
