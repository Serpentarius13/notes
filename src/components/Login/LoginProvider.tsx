"use client";

import { BsGoogle, BsGithub } from "react-icons/bs";
import Button from "../Shared/Buttons/Button";

import { signIn } from "next-auth/react";

import { useState } from "react";
import LoadingButton from "../Shared/Buttons/LoadingButton";

import { TProvider } from "@/features/lib/auth";

interface ILoginProvider {
  provider: TProvider;
}

const providerIconMap: Record<
  TProvider,
  { text: string; icon: React.ReactNode }
> = {
  google: { text: "Log in with Google", icon: <BsGoogle /> },
  github: { text: "Log in with Github", icon: <BsGithub /> },
};

export default function LoginProvider({ provider }: ILoginProvider) {
  const [isLoading, setLoading] = useState<boolean>(false);
  async function handleSignIn() {
    setLoading(true);
    signIn(provider);
    setLoading(false);
  }
  return (
    <LoadingButton
      loading={isLoading}
      className="gap-[1rem] max-w-[40rem]"
      onClick={handleSignIn}
    >
      {providerIconMap[provider].icon}

      {providerIconMap[provider].text}
    </LoadingButton>
  );
}
