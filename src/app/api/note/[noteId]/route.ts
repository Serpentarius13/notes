import { makeBadRequestError } from "@/features/utils/serverError";

import prisma from "@/features/lib/prisma";
import { NextResponse } from "next/server";

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
