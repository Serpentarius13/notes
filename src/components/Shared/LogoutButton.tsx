"use client";

import { signOut } from "next-auth/react";
import { MdOutlineLogout } from "react-icons/md";

export default function LogoutButton() {
  return (
    <button onClick={() => signOut()}>
      <MdOutlineLogout size={36} className="text-black dark:text-white" />
    </button>
  );
}
