"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import ClickAwayListener from "react-click-away-listener";

import { AiOutlineArrowDown } from "react-icons/ai";

interface ISelectProps {
  options: string[];
  handleChange: (opstringion: any) => void;
  placeholder?: string;
  currentOption: string;
}

export default function ReusableSelect({
  currentOption,
  options,
  handleChange,
  placeholder,
}: ISelectProps) {
  const [isSelectOpened, setSelectOpened] = useState<boolean>(false);
  const selectRef = useRef<HTMLDivElement | null>(null);

  function selectOption(option: string) {
    handleChange(option);
    toggleSelect();
  }

  function toggleSelect() {
    setSelectOpened((prev) => !prev);
  }

  const handleGoUp = useCallback(() => {
    const currentOptionIndex = options.findIndex((el) => el === currentOption);

    if (currentOptionIndex - 1 <= 0) {
      handleChange(options.at(-1));
    } else {
      handleChange(options[currentOptionIndex - 1]);
    }
  }, [handleChange, options, currentOption]);

  const handleGoDown = useCallback(() => {
    const currentOptionIndex = options.findIndex((el) => el === currentOption);

    if (currentOptionIndex + 1 >= options.length) {
      handleChange(options[0]);
    } else {
      handleChange(options[currentOptionIndex + 1]);
    }
  }, [handleChange, options, currentOption]);

  const keydownHandler = useCallback(
    (event: KeyboardEvent) => {
      if (
        (selectRef.current && selectRef.current == document.activeElement) ||
        selectRef.current?.contains(document.activeElement)
      ) {
        event.preventDefault();
      }

      switch (event.key) {
        case "ArrowUp": {
          handleGoUp();
        }

        case "ArrowDown": {
          handleGoDown();
        }

        case "Enter": {
          toggleSelect();
        }
      }
    },
    [selectRef, handleGoDown, handleGoUp]
  );

  useEffect(() => {
    document.addEventListener("keydown", keydownHandler);

    return () => document.removeEventListener("keydown", keydownHandler);
  }, [keydownHandler]);

  return (
    <ClickAwayListener onClickAway={() => setSelectOpened(false)}>
      <div className="relative  w-full min-w-[12rem] text-left" ref={selectRef}>
        <button
          type="button"
          className="backgrounded flex w-full items-center justify-between gap-[0.8rem] rounded-medium border-[1px] border-solid border-black px-[1.6rem] py-[0.8rem] text-[1.5rem] text-opacity-30  ring-inset hover:ring-1 focus:ring-1  dark:border-transparent dark:hover:ring-gray-300"
          id="menu-button"
          aria-expanded={isSelectOpened}
          aria-haspopup="true"
          onClick={toggleSelect}
        >
          {currentOption || placeholder || "Select"}

          <AiOutlineArrowDown
            className={` text-white opacity-20 transition-all ${
              isSelectOpened && "rotate-180"
            }`}
          />
        </button>

        {isSelectOpened && (
          <ul
            className="bg-darkest-black absolute left-0 z-10 mt-2 w-full origin-top-right rounded-md border-[1px] border-solid border-black shadow-lg  dark:border-white"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="menu-button"
            tabIndex={-1}
          >
            {options.map((option) => (
              <li
                className="py-1 "
                key={option}
                role="menuitem"
                tabIndex={-1}
              >
                <button
                  onClick={() => selectOption(option)}
                  className="block w-full px-4 py-4 text-start text-[1.4rem] hover:bg-gray-400 hover:bg-opacity-15 dark:bg-opacity-5 "
                >
                  {option}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </ClickAwayListener>
  );
}
