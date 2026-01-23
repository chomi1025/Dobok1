// app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth/options";

export const runtime = "nodejs"; // 🔥 이거 없으면 Prisma 터짐

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
