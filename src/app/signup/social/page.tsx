import { prisma } from "@/lib/prisma";
import SignupSocialClient from "./page.client";

interface Props {
  searchParams: Promise<{
    providerId?: string;
  }>;
}

export default async function SignupSocial({ searchParams }: Props) {
  const { providerId } = await searchParams;

  if (!providerId) {
    return <div>잘못된 접근입니다.</div>;
  }

  const socialUser = await prisma.socialSignupTemp.findUnique({
    where: {
      providerId,
    },
  });

  if (!socialUser) {
    return <div>소셜 회원 정보를 찾을 수 없습니다.</div>;
  }

  return <SignupSocialClient socialUser={socialUser} />;
}
