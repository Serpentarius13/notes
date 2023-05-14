import { getOwnSession } from "../utils/getSession";
import prisma from "../lib/prisma";

export async function getDocuments() {
  const session = await getOwnSession();

  const documents = await prisma?.document.findMany({
    where: { userId: session.user.id },
  });

  return documents;
}

export async function createDocument(text: string, title?: string) {
  const session = await getOwnSession();

  const document = await prisma.document.create({
    data: { title, text, userId: session.user.id },
  });

  return document;
}
