import { authOptions } from "@/features/lib/auth";
import NextAuth from "next-auth/next";

export default NextAuth(authOptions);
