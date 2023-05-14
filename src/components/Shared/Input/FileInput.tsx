import { toaster } from "@/features/lib/toaster";
import { ChangeEvent, useState } from "react";

interface IFileInput {
  handleChange: (file: File) => void;
  accept?: string;
  placeholder?: string;
}

export default function FileInput({
  handleChange,
  accept = "text/plain",
  placeholder,
}: IFileInput) {
  const [file, setFile] = useState<File>();

  function handleFileInput(event: ChangeEvent) {
    const target = event.target as HTMLInputElement;

    const file = target?.files?.[0];

    if (!file) return;

    if (!accept.split(",").find((el) => el.trim() === file.type))
      return toaster.warning("Wrong file type");
    handleChange(file);

    setFile(file);
  }
  return (
    <label className="relative flex h-[15rem] w-full max-w-[30rem] cursor-pointer items-center justify-center rounded-medium border-[1px] border-solid border-black bg-white p-[2rem] text-[2rem] font-bold transition-all hover:border-white hover:bg-gray-800 hover:text-white dark:border-white dark:bg-gray-800 dark:hover:bg-black">
      {file ? file.name : placeholder ?? "Drop your files here"}

      <input
        type="file"
        className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
        onChange={handleFileInput}
        accept={accept}
      />
    </label>
  );
}
