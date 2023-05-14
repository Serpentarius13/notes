"use client";

import { BsGoogle } from "react-icons/bs";
import Button from "../Shared/Buttons/Button";

import { signIn } from "next-auth/react";

type TProvider = "google";

interface ILoginProvider {
  provider: TProvider;
}

const providerIconMap: Record<
  TProvider,
  { text: string; icon: React.ReactNode }
> = {
  google: { text: "Log in with Google", icon: <BsGoogle /> },
};

export default function LoginProvider({ provider }: ILoginProvider) {
  function handleSignIn() {
    signIn(provider);
  }
  return (
    <Button variant="outline" className="gap-[1rem]" onClick={handleSignIn}>
      {providerIconMap[provider].icon}

      {providerIconMap[provider].text}
    </Button>
  );
}
