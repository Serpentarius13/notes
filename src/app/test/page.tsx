"use client";

import ReusableSelect from "@/components/Shared/Input/ReusableSelect";
import { useRef, useState } from "react";

export default function Test() {
  const [baseState, setState] = useState<string>("");

  const options = ["123", "123", "321", "Notes context"];

  return (
    <>
      <ReusableSelect
        handleChange={(option: string) => setState(option)}
        currentOption={baseState}
        options={options}
        placeholder="Abobus"
      />
    </>
  );
}
