import { getUserNotes } from "@/features/api/notes";

import { TUserId } from "@/features/types/db";

export enum ChatContext {
  notes = "notes",
  files = "files",
  all = "all",
}

async function getNotesContext(userId: TUserId) {
  const notesOfUser = await getUserNotes(userId);

  const makeTitle = (title: string | null | undefined) =>
    `Title of note: ${title ? title : "No title"}`;
  const makeText = (text: string) => `Text of note: ${text}`;

  return `My notes are: ${notesOfUser
    .map((el) => `${makeTitle(el.title)} \n ${makeText(el.text)} \n `)
    .join("\n")}`;
}

export default async function decideContext(
  type: `${ChatContext}`,
  userId: TUserId
) {
  switch (type) {
    case "notes": {
      const contents = await getNotesContext(userId);
      return contents;
    }

    default: {
      break;
    }
  }
}
