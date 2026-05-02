import NextAuth from "next-auth";
import { Role } from "@prisma/client";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      username: string;
      role: Role;
      name: string;
      email?: string | null;
      image?: string | null;
      nickname?: string;
    };
  }

  interface User {
    id: string;
    username: string;
    role: Role;
    name: string;
    nickname?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    username: string;
    role: Role;
    nickname?: string;
  }
}
