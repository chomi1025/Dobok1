import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;

  if (token && (token as any).status === "BANNED") {
    if (
      pathname === "/banned" ||
      pathname.startsWith("/_next") ||
      pathname.startsWith("/static") ||
      pathname.includes(".")
    ) {
      return NextResponse.next();
    }

    return NextResponse.redirect(new URL("/banned", req.url));
  }

  // 비로그인 유저 차단
  if (!token) {
    const isAuthPage =
      pathname.startsWith("/admin") ||
      pathname.startsWith("/support/inquiry") ||
      pathname.startsWith("/community/jobs/new?type=hiring") ||
      pathname.startsWith("/community/jobs/new?type=seeking") ||
      pathname.startsWith("/community/free/new") ||
      pathname.startsWith("/community/events/new");

    if (isAuthPage) {
      const url = new URL("/login", req.url);
      url.searchParams.set("callbackUrl", encodeURI(req.url));
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
