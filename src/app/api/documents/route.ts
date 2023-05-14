import { createDocument } from "@/features/api/documents";
import {
  makeBadRequestError,
  makeNotEnoughDataError,
} from "@/features/utils/serverError";
import { Document } from "@prisma/client";
import { NextResponse } from "next/server";

import prisma from "@/features/lib/prisma";

export async function POST(request: Request) {
  try {
    const { text, title } = await request.json();

    if (!text) return makeNotEnoughDataError("No text was provided");

    const document = await createDocument(text, title);

    return NextResponse.json(document);
  } catch (error) {
    console.log(error);
    return makeBadRequestError("Error creating note");
  }
}

export async function PATCH(request: Request) {
  try {
    const { document }: { document: Document } = await request.json();

    if (!document) return makeNotEnoughDataError("No document was provided");
    const newNote = await prisma?.document.update({
      data: { ...document, updatedAt: new Date() },
      where: { id: document.id },
    });

    return NextResponse.json(newNote);
  } catch (error) {
    console.log(error);
    return makeBadRequestError("Error updating document");
  }
}
