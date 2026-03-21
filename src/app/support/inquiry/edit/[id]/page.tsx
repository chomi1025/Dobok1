import { prisma } from "@/lib/prisma";
import InquiryEditClientPage from "./page.client";

interface ParamsType {
  params: {
    id: string;
  };
}

export default async function InquiryEditPage({ params }: ParamsType) {
  const inquiry = await prisma.inquiry.findUnique({
    where: {
      id: Number(params.id),
    },
  });

  console.log(inquiry);
  return <InquiryEditClientPage inquiry={inquiry} />;
}
