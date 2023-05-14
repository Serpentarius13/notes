"use client";

import {
  getFromLocalStorage,
  setToLocalStorage,
} from "@/features/utils/localStorage";
import { useEffect, useState } from "react";

import { BsFillSunFill, BsFillMoonFill } from "react-icons/bs";

const localStorageKey = "dark-mode";

function toggleDarkMode(toDarkMode: boolean) {
  if (toDarkMode) {
    document.documentElement.classList.add("dark");
    setToLocalStorage(localStorageKey, true);
  } else {
    document.documentElement.classList.remove("dark");

    localStorage.setItem(localStorageKey, JSON.stringify(false));
  }

  window.dispatchEvent(new Event(localStorageKey));
}

export default function DarkModeToggler({
  isShowingButton = false,
}: {
  isShowingButton?: boolean;
}) {
  const [isDarkMode, setDarkMode] = useState<boolean>(
    getFromLocalStorage(localStorageKey)
  );

  function handleDarkmodeEvent() {
    setDarkMode(getFromLocalStorage(localStorageKey));
  }
  useEffect(() => {
    if (typeof isDarkMode === "boolean") {
      toggleDarkMode(isDarkMode);
    } else {
      const isPrefersDarkMode =
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches;

      setDarkMode(isPrefersDarkMode);
    }

    window.addEventListener(localStorageKey, handleDarkmodeEvent);

    return () =>
      window.removeEventListener(localStorageKey, handleDarkmodeEvent);
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
