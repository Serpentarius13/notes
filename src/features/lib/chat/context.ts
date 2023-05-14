import { getUserNotes } from "@/features/api/notes";

import { TUserId } from "@/features/types/db";
import { Message } from "@prisma/client";

import { ChatContext } from "@/features/types/gpt";
import { Session } from "next-auth";
import { makeLocaleDate } from "@/features/utils/makeLocaleDate";

async function getNotesContext(userId: TUserId) {
  const notesOfUser = await getUserNotes(userId);

  const makeTitle = (title: string | null | undefined) =>
    `Title of note: ${title ? title : "No title"}`;
  const makeText = (text: string) => `Text of note: ${text}`;

  const makeDate = (date: Date) => `Date of note: ${makeLocaleDate(date)}`;

  return `My notes are: ${notesOfUser
    .map(
      (note) =>
        `${makeTitle(note.title)} \n ${makeText(note.text)} \n ${makeDate(
          note.createdAt
        )} \n `
    )
    .join("\n")}`;
}

export function makeHello(
  text: string,

  session: Session,
  previousMessages: Message[],
  actualMessage: string
) {
  const { name } = session.user;
  return `Hello. With this message I provide context of dialogue for you, so you know who am I and what I have written about for me to talk with you. My name is ${name}. My notes are: ${text}. My previous messages are: ${makePreviousMessages(
    previousMessages
  )}. Message for this request is: ${actualMessage}`;
}

export function makePreviousMessages(previousMessages: Message[]) {
  return `Previous messages of our conversation: ${previousMessages
    .map((message) => message.text)
    .join("\n")}.`;
}

export default async function decideContext(
  type: ChatContext,
  session: Session,
  previousMessages: Message[],
  actualMessage: string
) {
  switch (type) {
    case "Notes": {
      const contents = await getNotesContext(session.user.id);

      return makeHello(contents, session, previousMessages, actualMessage);
    }

    case "All": {
      const notes = await getNotesContext(session.user.id);

      return makeHello(
        [notes].join("\n"),
        session,
        previousMessages,
        actualMessage
      );
    }

    default: {
      return "";
      break;
    }
  }
}
