import { NextResponse, type NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-smdev-locale", request.nextUrl.pathname.startsWith("/en") ? "en" : "sr-Latn");
  return NextResponse.next({ request: { headers: requestHeaders } });
}

export const config = { matcher: ["/", "/en/:path*", "/katalog/:path*", "/upitnik"] };
