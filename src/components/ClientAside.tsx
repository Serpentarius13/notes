"use client";
import DarkModeToggler from "./Shared/DarkModeToggler";
import { Toaster } from "react-hot-toast";

export default function ClientAside() {
  return (
    <>
      <DarkModeToggler />
      <Toaster />
    </>
  );
}
