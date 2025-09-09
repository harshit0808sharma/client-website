// middleware.js
import { NextResponse } from "next/server";

export function middleware(req) {
  const url = req.nextUrl.clone();
  const host = req.headers.get("host") || "";
  const subdomain = host.split(".")[0];

  if (
    subdomain &&
    !["www", "localhost", "127", "0"].includes(subdomain) &&
    !url.searchParams.has("salon")
  ) {
    url.searchParams.set("salon", subdomain);
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
