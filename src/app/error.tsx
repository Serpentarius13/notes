"use client";

import Button from "@/components/Shared/Buttons/Button";
import MainLayout from "@/components/Shared/MainLayout";
import { useRouter } from "next/navigation";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  const router = useRouter();
  function goBack() {
    reset();
    router.back();
  }
  return (
    <MainLayout title="Error page">
      <p className="text-[1.8rem] font-bold text-red-500">
        <span className="text-black dark:text-white">Error message: </span>
        {error.message}
        <br />

        <span className="text-black dark:text-white">Stack: </span>

        {error.stack}
      </p>

      <Button variant="outline" onClick={goBack}>
        {" "}
        Go back
      </Button>
    </MainLayout>
  );
}
