import { getUserNotes } from "@/features/api/notes";

import { TUserId } from "@/features/types/db";
import { Message, Note, Document } from "@prisma/client";

import { ChatContext } from "@/features/types/gpt";
import { Session } from "next-auth";
import { makeLocaleDate } from "@/features/utils/makeLocaleDate";
import { getDocuments } from "@/features/api/documents";

async function getGenericContext<
  T extends { text: string; title: string | null; createdAt: Date }
>(fetcherFunction: () => Promise<T[]>, naming: string) {
  const items = await fetcherFunction();
  const makeTitle = (title: string | null | undefined) =>
    `Title of ${naming}: ${title ? title : "No title"}`;
  const makeText = (text: string) => `Text of ${naming}: ${text}`;

  const makeDate = (date: Date) => `Date of ${naming}: ${makeLocaleDate(date)}`;

  return `My ${naming}s are: ${items
    .map(
      (note) =>
        `${makeTitle(note.title)} \n ${makeText(note.text)} \n ${makeDate(
          note.createdAt
        )} \n `
    )
    .join("\n")}`;
}

async function getNotesContext() {
  return await getGenericContext<Note>(() => getUserNotes(), "note");
}

async function getDocumentsContext() {
  return await getGenericContext<Document>(() => getDocuments(), "document");
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
  )}. My documents are: ${getDocumentsContext}. Message for this request is: ${actualMessage}`;
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
      const contents = await getNotesContext();

      return makeHello(contents, session, previousMessages, actualMessage);
    }

    case "All": {
      const notes = await getNotesContext();
      const documents = await getDocumentsContext();

      return makeHello(
        [notes, documents].join("\n"),
        session,
        previousMessages,
        actualMessage
      );
    }

    case "Documents": {
      const documents = await getDocumentsContext();

      return makeHello(documents, session, previousMessages, actualMessage);
    }

    default: {
      return "";
      break;
    }
  }
}
