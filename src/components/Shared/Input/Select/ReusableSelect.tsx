"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import ClickAwayListener from "react-click-away-listener";

import { AiOutlineArrowDown } from "react-icons/ai";
import SelectList from "./SelectList";

interface ISelectProps {
  options: string[];
  handleChange: (opstringion: any) => void;
  placeholder?: string;
  currentOption: string;
  isFacingUp?: boolean;
}

export default function ReusableSelect({
  currentOption,
  options,
  handleChange,
  placeholder,
  isFacingUp = false,
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
        {isFacingUp && (
          <SelectList
            isSelectOpened={isSelectOpened}
            options={options}
            selectOption={selectOption}
            isAbsolute={false}
          />
        )}
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
              isFacingUp && "rotate-180"
            }  ${isSelectOpened && isFacingUp ? "rotate-0" : "rotate-180"}`}
          />
        </button>

        {!isFacingUp && (
          <SelectList
            isSelectOpened={isSelectOpened}
            options={options}
            selectOption={selectOption}
          />
        )}
      </div>
    </ClickAwayListener>
  );
}
