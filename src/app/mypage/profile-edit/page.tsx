import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import ProfileEdit from "./page.client";
import { authOptions } from "@/lib/auth/options";

export default async function ProfileEditPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return null;

  const userId = session.user.id;

  const user = await prisma.user.findUnique({
    where: { id: Number(userId) },
  });

  if (!user) return null;

  const address = (user.address ?? {}) as {
    address?: string;
    zipCode?: string;
    address2?: string;
  };

  const profileUser = {
    id: user.id,
    username: user.username,
    name: user.name,
    email: user.email,
    phone: user.phone,
    birthDate: user.birthDate.toISOString().slice(0, 10),
    address: {
      address: address.address ?? "",
      zipCode: address.zipCode ?? "",
      address2: address.address2 ?? "",
    },
  };

  return <ProfileEdit user={profileUser} isEdit />;
}
