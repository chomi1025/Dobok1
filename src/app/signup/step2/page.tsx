import SignupStep2Client from "./page.client";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default function SignupStep2() {
  const cookieStore = cookies();
  const isCerted = cookieStore.get("cert_verified");

  if (!isCerted) {
    redirect("/signup/step1");
  }

  return <SignupStep2Client />;
}
