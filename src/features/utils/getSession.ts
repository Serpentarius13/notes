import { getServerSession } from "next-auth";
import { authOptions } from "../lib/auth";

export async function getOwnSession() {
  const session = await getServerSession(authOptions);

  if (!session) throw new Error("Unauthorized");

  return session
}
