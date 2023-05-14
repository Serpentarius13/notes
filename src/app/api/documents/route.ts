import { createDocument } from "@/features/api/documents";
import {
  makeBadRequestError,
  makeNotEnoughDataError,
} from "@/features/utils/serverError";
import { NextResponse } from "next/server";

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
