import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  const { pathname } = req.nextUrl;

  if (!token) {
    const isAuthPage =
      pathname.startsWith("/admin") ||
      pathname.startsWith("/mypage") ||
      pathname.includes("/new") ||
      pathname.includes("/edit");

    if (isAuthPage) {
      const url = new URL("/login", req.url);

      url.searchParams.set("callbackUrl", encodeURI(req.url));
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*", //어드민 전체
    "/mypage/:path*", //마이페이지 전체

    "/support/notice/new",
    "/support/notice/edit/:id",

    "/support/faq/new",
    "/support/faq/edit/:id",

    "/support/inquiry/new",
    "/support/inquiry/edit/:id",

    "/community/jobs/new",
    "/community/jobs/:id/edit",

    "/community/free/new",
    "/community/free/edit/:id",

    "/community/events/new",
    "/community/events/edit/:id",

    "/community/resources/new",
    "/community/resources/edit/:id",
  ],
};
