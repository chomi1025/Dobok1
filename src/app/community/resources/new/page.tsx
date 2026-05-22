import { getServerSession } from "next-auth";
import ResourcesNewClientPage from "./page.client";
import { authOptions } from "@/lib/auth/options";
import { notFound } from "next/navigation";

export default async function ResourcesNewPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    notFound();
  }

  return <ResourcesNewClientPage session={session} />;
}
