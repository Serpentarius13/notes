import LoginProvider from "@/components/Login/LoginProvider";
import DarkModeToggler from "@/components/Shared/DarkModeToggler";
import { authOptions } from "@/features/lib/auth";
import { getServerSession } from "next-auth";

export default async function Test() {
  const session = await getServerSession(authOptions);

  console.log(session);

  return (
    <>
      <LoginProvider provider="google" />

      <DarkModeToggler />
    </>
  );
}
