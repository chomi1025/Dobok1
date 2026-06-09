import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import KakaoProvider from "next-auth/providers/kakao";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 7 * 24 * 60 * 60,
    updateAge: 24 * 60 * 60,
  },
  providers: [
    // 크리덴셜
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "아이디", type: "text" },
        password: { label: "비밀번호", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) return null;

        try {
          const user = await prisma.user.findUnique({
            where: { username: credentials.username },
          });

          if (!user) return null;

          if (user.status === "WITHDRAWN" || user.isDeleted) {
            throw new Error("탈퇴한 계정입니다.");
          }

          const isValid = await bcrypt.compare(
            credentials.password,
            user.password,
          );

          if (!isValid) return null;

          await prisma.user.update({
            where: { id: user.id },
            data: { lastLoginAt: new Date() },
          });

          return {
            id: String(user.id),
            username: user.username,
            name: user.name,
            nickname: user.nickname,
            role: user.role,
            status: user.status,
          };
        } catch (err) {
          console.error("authorize error:", err);
          return null;
        }
      },
    }),

    // 카카오
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID!,
      clientSecret: process.env.KAKAO_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === "kakao") {
        const existingUser = await prisma.user.findUnique({
          where: {
            email: user.email!,
          },
        });

        if (!existingUser) {
          const kakao = profile as any;

          await prisma.socialSignupTemp.upsert({
            where: {
              providerId: String(kakao.id),
            },
            update: {},
            create: {
              provider: "KAKAO",
              providerId: String(kakao.id),
              email: kakao.kakao_account?.email,
              name: kakao.kakao_account?.name,
              phone: kakao.kakao_account?.phone_number,
              birthday: `${kakao.kakao_account?.birthyear}-${kakao.kakao_account?.birthday}`,
            },
          });

          return `/signup/social?providerId=${kakao.id}`;
        }
      }

      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.username = (user as any).username;

        token.isNewSocialUser = (user as any).isNewSocialUser;

        if ((user as any).socialProfile) {
          const profile = (user as any).socialProfile;

          token.socialUser = {
            email: profile.kakao_account?.email,
            name: profile.kakao_account?.name,
            phone: profile.kakao_account?.phone_number,
            birthyear: profile.kakao_account?.birthyear,
            birthday: profile.kakao_account?.birthday,
          };
        }
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.username = token.username as string;
        session.user.role = token.role as any;
        (session.user as any).status = token.status;
        (session.user as any).nickname = token.nickname;
        (session as any).socialUser = (token as any).socialUser;
        (session as any).isNewSocialUser = (token as any).isNewSocialUser;
      }

      (session as any).socialUser = (token as any).socialUser;

      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};
