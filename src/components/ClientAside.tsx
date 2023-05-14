"use client";
import { ThemeProvider } from "next-themes";

import { Toaster } from "react-hot-toast";

export default function ClientProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ThemeProvider attribute="class">{children}</ThemeProvider>

      <Toaster />
    </>
  );
}
