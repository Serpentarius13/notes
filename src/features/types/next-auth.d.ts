import { User } from "next-auth";

interface AuxilaryFields {}
declare module "next-auth/jwt" {
  interface JWT extends AuxilaryFields {
    id: UserId;
  }
}

declare module "next-auth" {
  interface Session {
    user: User & {
      id: string;
    };
  }

  interface User extends AuxilaryFields {}
}
