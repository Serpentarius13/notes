import LoginPage from "@/components/Login/LoginPage";
import AddNote from "@/components/Notes/AddNote";
import Notes from "@/components/Notes/Notes";
import MainLayout from "@/components/Shared/MainLayout";
import { baseUrl } from "@/features/constants/baseUrl";
import { authOptions } from "@/features/lib/auth";
import { IGPTResponse } from "@/features/types/gpt";
import { getServerSession } from "next-auth";
import { Suspense } from "react";

import { Note as NoteType } from "@prisma/client";
import axios from "axios";

async function getGptResponse(message: string): Promise<IGPTResponse | null> {
  const response = await fetch(`${baseUrl}/api/gpt`, {
    body: JSON.stringify({ message }),
    method: "POST",
  });

  if (response.ok) {
    return await response.json();
  } else return null;
}

export const revalidate = 0;

export default async function Home() {
  const session = await getServerSession(authOptions);

  return <>{session ?  <Notes /> : <LoginPage />}</>;
}
