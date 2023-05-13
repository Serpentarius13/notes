import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { AuthOptions } from "next-auth";

import GoogleProvider from "next-auth/providers/google";

import prisma from "./prisma";

function getCredentials(prefix: string) {
  const clientId =
    process.env.NODE_ENV == "development"
      ? process.env[`DEV_${prefix.toUpperCase()}_CLIENT_ID`]
      : process.env[`${prefix.toUpperCase()}_CLIENT_ID`];

  if (!clientId || clientId.length === 0)
    throw new Error(`No ${prefix} client id`);

  const clientSecret =
    process.env.NODE_ENV == "development"
      ? process.env[`DEV_${prefix.toUpperCase()}_SECRET`]
      : process.env[`${prefix.toUpperCase()}_SECRET`];

  if (!clientSecret || clientSecret.length === 0)
    throw new Error(`No ${prefix} client secret`);

  return { clientId, clientSecret };
}

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: getCredentials("google").clientId,
      clientSecret: getCredentials("google").clientSecret,
    }),
  ],

  pages: {
    signIn: "/login",
    error: "/login",
  },
  session: {
    strategy: "jwt",
  },

  secret: process.env.JWT_SECRET,

  callbacks: {
    //@ts-ignore
    async jwt({ token, user }) {
      const dbUser = await prisma?.user.findUnique({
        where: { id: token.sub || token.id },
      });

      if (!dbUser) {
        if (user) {
          token.id = user!.id;
        }
        return token;
      }

      return {
        id: dbUser.id,
        name: dbUser.name,
        email: dbUser.email,
        picture: dbUser.image,
      };
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.picture;
      }

      return Promise.resolve(session);
    },
    redirect() {
      return "/";
    },
  },
};
