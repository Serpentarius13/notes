import { getUserNotes } from "@/features/api/notes";

import { TUserId } from "@/features/types/db";
import { Message } from "@prisma/client";

import { ChatContext } from "@/features/types/gpt";
import { Session } from "next-auth";

async function getNotesContext(userId: TUserId) {
  const notesOfUser = await getUserNotes(userId);

  const makeTitle = (title: string | null | undefined) =>
    `Title of note: ${title ? title : "No title"}`;
  const makeText = (text: string) => `Text of note: ${text}`;

  return `My notes are: ${notesOfUser
    .map((el) => `${makeTitle(el.title)} \n ${makeText(el.text)} \n `)
    .join("\n")}`;
}

export function makeHello(
  text: string,

  session: Session
) {
  const { name } = session.user;
  return `Hello. With this message I provide context of dialogue for you, so you know who am I and what I have written about for me to talk with you. My name is ${name}. My notes are: ${text}.`;
}

export function makePreviousMessages(previousMessages: Message[]) {
  return `Previous messages of our conversation: ${previousMessages.join(
    "\n"
  )}.`;
}

export default async function decideContext(
  type: ChatContext,
  session: Session
) {
  switch (type) {
    case "Notes": {
      const contents = await getNotesContext(session.user.id);

      return makeHello(contents, session);
    }

    case "All": {
      const notes = await getNotesContext(session.user.id);

      return makeHello([notes].join("\n"), session);
    }

    default: {
      return "";
      break;
    }
  }
}
