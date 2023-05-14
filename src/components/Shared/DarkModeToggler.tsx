"use client";

import { BsFillSunFill, BsFillMoonFill } from "react-icons/bs";

import { useTheme } from "next-themes";

import { useEffect, useState } from "react";

export default function DarkModeToggler() {
  const { theme, setTheme } = useTheme();

  const [state, setState] = useState(0);

  useEffect(() => {
    setState(1);
  }, []);

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="flex aspect-square w-[3.6rem] items-center justify-center text-black dark:text-white"
      title={
        theme == "dark" && state ? "Toggle light mode" : "Toggle dark mode"
      }
    >
      {theme == "dark" && state ? (
        <BsFillMoonFill size={36} />
      ) : (
        <BsFillSunFill size={36} />
      )}
    </button>
  );
}
