interface ISelectList {
  isSelectOpened: boolean;
  options: string[];
  selectOption: (option: string) => void;

  isAbsolute?: boolean;
}

export default function SelectList({
  isSelectOpened,
  options,
  selectOption,
  isAbsolute = true,
}: ISelectList) {
  return (
    <>
      {isSelectOpened && (
        <ul
          className={`bg-darkest-black left-0 top-0 z-10 mt-2 w-full origin-top-left rounded-md border-[1px] border-solid border-black shadow-lg  dark:border-white ${
            isAbsolute && "absolute"
          }`}
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
        >
          {options.map((option) => (
            <li className="py-1 " key={option} role="menuitem">
              <button
                onClick={() => selectOption(option)}
                className="hover:bg-opacity-15 block w-full px-4 py-4 text-start text-[1.4rem] hover:bg-gray-400 dark:bg-opacity-5 "
              >
                {option}
              </button>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
