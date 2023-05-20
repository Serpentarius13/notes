import { buttonVariants } from "@/components/Shared/Buttons/Button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-[1rem] bg-gray-800">
      <h2 className="text-[4.5rem] font-bold text-white lg:text-[4rem]">
        Hey, this is Not Found 404 page, wanna get back?
      </h2>

      <Link href="/" className={buttonVariants({ variant: "default" })}>
        {" "}
        Go home{" "}
      </Link>
    </div>
  );
}
