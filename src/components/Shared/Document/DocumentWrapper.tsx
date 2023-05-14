import { buttonVariants } from "../../Shared/Buttons/Button";
import Link from "next/link";

import DocumentDate from "./DocumentDate";

interface IDocument {
  createdAt: Date;
  to: string;
  children: React.ReactNode;
}

export default function DocumentWrapper({ createdAt, to, children }: IDocument) {
  return (
    <article className="dark:bg-dark-gray group flex h-[25rem] flex-col justify-between gap-[1.4rem] rounded-medium  border-[1px] border-solid border-black p-[1rem] dark:border-white md:max-w-[30rem] ">
      {children}

      <div className="flex w-full items-center justify-between gap-[1rem]">
        <DocumentDate date={createdAt} />
        <Link
          className={`${buttonVariants({
            variant: "outline",
          })} opacity-0 transition-all group-hover:opacity-100`}
          href={to}
        >
          {" "}
          Edit{" "}
        </Link>
      </div>
    </article>
  );
}
