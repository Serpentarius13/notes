import { useState } from "react";

export function useField<T>(initialValue?: T) {
  const [value, setValue] = useState<T | string>(initialValue ?? "");

  function handleChange(event: Event) {
    const target = event.target as HTMLInputElement;
    setValue(target.value);
  }

  function resetState() {
    setValue(initialValue ?? "")
  }

  return {value, handleChange, resetState}
}
