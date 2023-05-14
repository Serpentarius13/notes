import { HTMLAttributes } from "react";
import Button from "./Button";

import LoadingSpinner from "../LoadingSpinner";

interface ILoadingButton extends HTMLAttributes<HTMLButtonElement> {
  loading: boolean;
  children: React.ReactNode;
  className: string;
}

export default function LoadingButton({
  loading,
  children,
  className,
  ...props
}: ILoadingButton) {
  return (
    <Button
      variant="outline"
      className={` ${className}  gap-[1rem] disabled:bg-gray-500 disabled:text-white `}
      disabled={loading}
      {...props}
    >
      {loading && <LoadingSpinner size={24} />}

      {children}
    </Button>
  );
}
