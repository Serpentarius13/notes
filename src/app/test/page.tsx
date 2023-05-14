"use client";

import FileInput from "@/components/Shared/Input/FileInput";
import ReusableSelect from "@/components/Shared/Input/Select/ReusableSelect";
import { useRef, useState } from "react";

export default function Test() {
  const [file, setFile] = useState<File>();

  function handleFile(file: File) {
    setFile(file);
  }

  return (
    <>
      <FileInput handleChange={handleFile} accept=".doc, .txt" />
    </>
  );
}
