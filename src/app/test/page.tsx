import LoginProvider from "@/components/Login/LoginProvider";
import DarkModeToggler from "@/components/Shared/DarkModeToggler";
import Sidebar from "@/components/Sidebar/Sidebar";
import { authOptions } from "@/features/lib/auth";
import { getServerSession } from "next-auth";

export default async function Test() {
  const session = await getServerSession(authOptions);

  console.log(session);

  return (
    <>
      <Sidebar avatar={session?.user.image as string} />
      <LoginProvider provider="google" />
      123123
      <DarkModeToggler />
    </>
  );
}
