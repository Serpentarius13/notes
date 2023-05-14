import LoginPage from "@/components/Login/LoginPage";
import AddNote from "@/components/Notes/AddNote";
import Notes from "@/components/Notes/Notes";
import MainLayout from "@/components/Shared/MainLayout";
import { baseUrl } from "@/features/constants/baseUrl";
import { authOptions } from "@/features/lib/auth";
import { IGPTResponse } from "@/features/types/gpt";
import { getServerSession } from "next-auth";
import { Suspense } from "react";

export const revalidate = 0;

export default async function Home() {
  const session = await getServerSession(authOptions);

  return <>{session ? <Notes /> : <LoginPage />}</>;
}
