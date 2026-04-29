import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;

  // 1. 로그인 상태인데 BANNED인 경우 (최우선 체크)
  if (token && (token as any).status === "BANNED") {
    // 밴 페이지 자체나 정적 리소스(이미지 등)는 제외해야 무한 루프 안 생김
    if (
      pathname === "/banned" ||
      pathname.startsWith("/_next") ||
      pathname.startsWith("/static") ||
      pathname.includes(".") // favicon.ico 등
    ) {
      return NextResponse.next();
    }

    // 어디에 있든 밴 페이지로 강제 이동
    return NextResponse.redirect(new URL("/banned", req.url));
  }

  // 2. 비로그인 유저 차단 (기존 로직)
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
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
