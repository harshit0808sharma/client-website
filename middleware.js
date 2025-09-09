import { NextResponse } from "next/server";

const RESERVED_SUBDOMAINS = [
  "www", "app", "admin", "api", "dashboard", "blog", "help", 
  "support", "mail", "email", "ftp", "cdn", "assets", "static", 
  "dev", "staging"
];

export function middleware(req) {
  const url = req.nextUrl.clone();
  const host = req.headers.get("host") || "";
  const pathname = url.pathname;

  // Skip static files, _next, favicon, etc.
  if (
    pathname.startsWith("/api/") ||
    pathname.startsWith("/_next/") ||
    pathname.startsWith("/favicon.ico") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  const hostParts = host.split(".");
  let salonSlug = null;

  // --- Localhost ---
  if (host.includes("localhost")) {
    const pathSegments = pathname.split("/").filter(Boolean);
    if (pathSegments[0] && !RESERVED_SUBDOMAINS.includes(pathSegments[0])) {
      salonSlug = pathSegments[0];
    }
  } else {
    // --- Vercel or Custom Domain ---
    const subdomain = hostParts[0];
    if (!RESERVED_SUBDOMAINS.includes(subdomain)) {
      salonSlug = subdomain;
    }
  }

  if (salonSlug && !url.searchParams.has("salon")) {
    url.searchParams.set("salon", salonSlug);
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
