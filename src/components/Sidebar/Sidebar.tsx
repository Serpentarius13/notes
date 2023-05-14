import Image from "next/image";
import DarkModeToggler from "../Shared/DarkModeToggler";

import { BsFillChatLeftDotsFill } from "react-icons/bs";

import { CgNotes } from "react-icons/cg";
import Link from "next/link";
import LogoutButton from "../Shared/LogoutButton";
import { getServerSession } from "next-auth";
import { authOptions } from "@/features/lib/auth";

import { AiFillFileText } from "react-icons/ai";

type TSidebarLink = {
  to: string;
  icon: React.ReactNode;
  title: string;
};

const sidebarLinks: TSidebarLink[] = [
  {
    to: "/chat",
    icon: <BsFillChatLeftDotsFill size={32} />,
    title: "To your chat",
  },
  {
    to: "/",
    icon: <CgNotes size={32} />,
    title: "To your notes",
  },

  { to: "/documents", icon: <AiFillFileText size={32} />, title: "To your documents" },
];

export default async function Sidebar() {
  const session = await getServerSession(authOptions);
  return (
    <>
      {session && (
        <aside className="sidebar flex h-screen w-[10rem] flex-col items-center justify-between border-r-[1px] border-solid border-black bg-white p-[1.8rem] dark:border-white dark:bg-gray-900">
          <div className="flex flex-col items-center gap-[5rem]">
            <div className="flex flex-col items-center gap-[1.4rem]">
              <Link href="/">
                <Image
                  width={48}
                  height={48}
                  alt="Your avatar"
                  src={session.user.image as string}
                  className="rounded-big"
                />
              </Link>

              <DarkModeToggler isShowingButton />
            </div>

            <ul className="flex flex-col gap-[1rem]">
              {sidebarLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    className="flex items-center justify-center rounded-big border-[1px] border-solid border-black bg-white p-[1rem] transition-all hover:bg-black hover:text-white dark:text-black dark:hover:border-white hover:dark:text-white "
                    href={link.to}
                    title={link.title}
                  >
                    {link.icon}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <LogoutButton />
        </aside>
      )}
    </>
  );
}
