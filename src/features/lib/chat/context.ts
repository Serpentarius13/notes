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

interface IMakeHello {
  session: Session;
  previousMessages: Message[];
  actualMessage: string;
}

export function makeHello({
  session,
  previousMessages,
  actualMessage,
}: IMakeHello) {
  const { name } = session.user;

  const hello = `With this message I provide context of dialogue for you, so you know who am I and what I have written about for me to talk with you. Note that this only for context and not the actual message. My name is ${name}. %text%. ${makePreviousMessages(
    previousMessages
  )} Message for this request is: ${actualMessage}. Context ends here.`;

  return (text: string) => hello.replace("%text%", text);
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
  const createMessage = makeHello({ session, previousMessages, actualMessage });
  switch (type) {
    case "Notes": {
      const contents = await getNotesContext();

      return createMessage(contents);
    }

    case "All": {
      const notes = await getNotesContext();
      const documents = await getDocumentsContext();

      return createMessage([notes, documents].join("\n "));
    }

    case "Documents": {
      const documents = await getDocumentsContext();

      return createMessage(documents);
    }

    default: {
      return "";
      break;
    }
  }
}
