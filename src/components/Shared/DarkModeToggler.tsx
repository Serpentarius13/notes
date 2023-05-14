"use client";

import { useLocalStorage } from "@/features/hooks/useLocalStorage";
import { useEffect } from "react";

import { BsFillSunFill, BsFillMoonFill } from "react-icons/bs";

function toggleDarkMode(toDarkMode: boolean) {
  if (toDarkMode) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
}

export default function DarkModeToggler({
  isShowingButton = false,
}: {
  isShowingButton?: boolean;
}) {
  const [isDarkMode, setDarkMode] = useLocalStorage("dark-mode");

  useEffect(() => {
    if (typeof isDarkMode === "boolean") {
      toggleDarkMode(isDarkMode);
    } else {
      const isPrefersDarkMode =
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches;

      setDarkMode(isPrefersDarkMode);
    }
  }, [isDarkMode, setDarkMode, isShowingButton]);

  function handleDarkMode() {
    if (isDarkMode) {
      setDarkMode(false);
    } else {
      setDarkMode(true);
    }
  }

  return (
    <>
      {isShowingButton && (
        <button
          onClick={handleDarkMode}
          className="flex aspect-square w-[3.6rem] items-center justify-center text-black dark:text-white"
          title={isDarkMode ? "Toggle light mode" : "Toggle dark mode"}
        >
          {isDarkMode ? (
            <BsFillMoonFill size={36} />
          ) : (
            <BsFillSunFill size={36} />
          )}
        </button>
      )}
    </>
  );
}
