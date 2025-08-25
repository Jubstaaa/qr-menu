import { extractSubdomain } from "@qr-menu/shared-utils";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const hostname = request.headers.get("host") || "";
  const subdomain = extractSubdomain(hostname);

  const response = NextResponse.next();

  if (subdomain) {
    response.headers.set("x-subdomain", subdomain);
  }

  return response;
}

export const config = {
  runtime: "nodejs",

  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
