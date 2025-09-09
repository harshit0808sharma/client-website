// middleware.js
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
  const subdomain = hostParts[0];

  let salonSlug = null;

  // Environment detection
  const isLocalhost = host.includes("localhost");
  const isVercel = host.includes("vercel.app");
  const isCustomDomain = host.includes("lokaci.com");

  if (isLocalhost) {
    // For localhost:3000/radiance-salon - extract from URL path
    if (pathname.startsWith("/") && pathname !== "/") {
      const pathSegments = pathname.split("/").filter(Boolean);
      if (pathSegments[0] && !RESERVED_SUBDOMAINS.includes(pathSegments[0])) {
        salonSlug = pathSegments[0];
      }
    }
  } else if (isVercel || isCustomDomain) {
    // For radiance-salon.vercel.app or radiance-salon.lokaci.com - extract from subdomain
    if (hostParts.length >= 3 && !RESERVED_SUBDOMAINS.includes(subdomain)) {
      salonSlug = subdomain;
    }
  }

  // Add salon to query params if detected and not already present
  if (salonSlug && !url.searchParams.has("salon")) {
    url.searchParams.set("salon", salonSlug);
    return NextResponse.rewrite(url);
  }

  // Default salon if none detected and on root path
  if (!salonSlug && !url.searchParams.has("salon") && pathname === "/") {
    // You can set a default salon slug or redirect to a salon selection page
    url.searchParams.set("salon", "default-salon");
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};