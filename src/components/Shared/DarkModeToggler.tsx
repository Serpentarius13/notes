"use client";

import { useLocalStorage } from "@/features/hooks/useLocalStorage";
import { useMemo } from "react";

import { BsFillSunFill, BsFillMoonFill } from "react-icons/bs";

export default function DarkModeToggler() {
  const [isLocalDarkMode, setDarkMode] = useLocalStorage("dark-mode");

  const isDarkMode = useMemo(() => {
    if (isLocalDarkMode != null) return isLocalDarkMode;
    else
      return (
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
      );
  }, [isLocalDarkMode]);

  function handleDarkMode() {
    if (isDarkMode) {
      setDarkMode(false);
      document.documentElement.classList.remove("dark");
    } else {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }

  return (
    <button
      onClick={handleDarkMode}
      className="flex aspect-square w-[3.6rem] items-center justify-center text-black dark:text-white"
    >
      {isDarkMode ? <BsFillMoonFill size={36} /> : <BsFillSunFill size={36} />}
    </button>
  );
}
