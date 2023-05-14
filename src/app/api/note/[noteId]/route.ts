import { makeBadRequestError } from "@/features/utils/serverError";

import prisma from "@/features/lib/prisma";
import { NextResponse } from "next/server";
import { redirect } from "next/navigation";

export async function GET(
  request: Request,
  { params: { noteId } }: { params: { noteId: string | number } }
) {
  try {
    const note = await prisma?.note.findFirst({ where: { id: +noteId } });

    return NextResponse.json(note);
  } catch (error) {
    return makeBadRequestError("Error getting note");
  }
}

export async function DELETE(
  request: Request,
  { params: { noteId } }: { params: { noteId: string | number } }
) {
  try {
    await prisma?.note.delete({ where: { id: +noteId } });

    console.log("ok");
    return new Response("ok");
  } catch (error) {
    console.log(error);
    return makeBadRequestError("Error deleting note");
  }
}
