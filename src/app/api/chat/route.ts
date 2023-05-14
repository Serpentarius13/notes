import { getOwnSession } from "@/features/utils/getSession";
import {
  makeBadRequestError,
  makeNotEnoughDataError,
} from "@/features/utils/serverError";

import prisma from "@/features/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const session = await getOwnSession();

    const { context } = await request.json();

    if (typeof context !== "string")
      return makeNotEnoughDataError("No chat context was provided");

    const chat = await prisma?.chat.create({
      data: { userId: session.user.id, context },
    });

    return NextResponse.json(chat);
  } catch (error) {
    console.log(error);
    return makeBadRequestError("Error creating chat");
  }
}
