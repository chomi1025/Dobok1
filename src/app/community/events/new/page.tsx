import { getServerSession } from "next-auth";
import EventsClientPage from "./page.client";
import { authOptions } from "@/lib/auth/options";
import { notFound } from "next/navigation";

export default async function EventsPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    notFound();
  }

  return <EventsClientPage session={session} />;
}
