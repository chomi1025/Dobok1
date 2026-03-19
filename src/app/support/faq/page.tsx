import { prisma } from "@/lib/prisma";
import FaqClientPage from "./page.client";

export default async function FaqPage() {
  const faqs = await prisma.Faq.findMany();

  return <FaqClientPage faqs={faqs} />;
}
