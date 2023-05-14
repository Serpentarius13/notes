import LoginPage from "@/components/Login/LoginPage";

import Notes from "@/components/Notes/Notes";

import { authOptions } from "@/features/lib/auth";

import { getServerSession } from "next-auth";

export const revalidate = 0;

export default async function Home() {
  const session = await getServerSession(authOptions);

  return <>{session ? <Notes /> : <LoginPage />}</>;
}
