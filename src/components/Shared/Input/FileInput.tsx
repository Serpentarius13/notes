import { toaster } from "@/features/lib/toaster";
import { ChangeEvent, useState } from "react";
import LoadingSpinner from "../LoadingSpinner";

interface IFileInput {
  handleChange: (file: File) => void;
  accept?: string;
  placeholder?: string;
  isLoading?: boolean;
}

export default function FileInput({
  handleChange,
  accept = "text/plain",
  placeholder,
  isLoading = false,
}: IFileInput) {
  const [file, setFile] = useState<File>();

  function handleFileInput(event: ChangeEvent) {
    const target = event.target as HTMLInputElement;

    const file = target?.files?.[0];

    if (!file) return;

    if (
      !accept
        .split(",")
        .find((el) => el.trim().slice(1) === file.name.split(".").at(-1))
    )
      return toaster.warning("Wrong file type");
    handleChange(file);

    setFile(file);
  }
  return (
    <label
      className={`${
        isLoading && "cursor-default"
      } relative flex h-[15rem] w-full max-w-[30rem] cursor-pointer items-center justify-center overflow-hidden rounded-medium border-[1px] border-solid border-black bg-white p-[2rem] text-[2rem] font-bold transition-all hover:border-white hover:bg-gray-800 hover:text-white dark:border-white dark:bg-gray-800 dark:hover:bg-black`}
    >
      {isLoading ? (
        <LoadingSpinner size={24} />
      ) : file ? (
        <span className="max-w-full break-words"> {file.name} </span>
      ) : (
        placeholder ?? "Drop your files here"
      )}

      <input
        type="file"
        className="absolute inset-0 h-full w-full opacity-0 "
        onChange={handleFileInput}
        accept={accept}
        disabled={isLoading}
      />
    </label>
  );
}
