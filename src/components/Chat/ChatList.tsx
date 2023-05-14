import { Chat } from "@prisma/client";
import Link from "next/link";
import CreateChatButton from "./CreateChatButton";

import { AiOutlineArrowRight } from "react-icons/ai";

interface IChatList {
  chats: Chat[];
}
export default function ChatList({ chats }: IChatList) {
  return (
    <>
      <aside className=" flex max-h-full w-[25rem] flex-col justify-between gap-[2rem] overflow-y-auto border-r-[1px] border-solid border-black p-[1rem] dark:border-white md:w-[7rem]">
        {chats.length ? (
          <ul className="flex w-full flex-col items-start gap-[2.4rem] text-[1.8rem] ">
            {chats.map(({ id, context }, ix) => (
              <li key={id} className="flex w-full flex-col gap-[0.2rem]">
                <Link
                  href={`/chat/${id}`}
                  className="flex w-full items-center justify-between "
                >
                  <span className="hidden aspect-square w-[5rem]  items-center justify-center rounded-big border-[1px] border-solid border-white p-[1rem] text-[2rem] font-bold md:flex">
                    {" "}
                    {id}{" "}
                  </span>
                  <span className="md:hidden">
                    To chat №{ix + 1} <br />{" "}
                    <span className="text-[1rem]">Context: {context}</span>
                  </span>{" "}
                  <AiOutlineArrowRight size={36} className="md:hidden" />
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <>
            <h2 className="text-[2.8rem] font-bold">No chats yet!</h2>
          </>
        )}

        <CreateChatButton />
      </aside>
    </>
  );
}
