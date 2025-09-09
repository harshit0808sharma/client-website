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

    // Skip internal Next.js paths and static files
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

    // Check if the host is a subdomain and not a reserved one
    if (host.includes(".vercel.app") || host.includes("localhost")) {
        // If it's a vercel or localhost URL, do not perform a subdomain rewrite.
        // Let the [...salon] dynamic route handle the URL path directly.
        return NextResponse.next();
    }

    if (!RESERVED_SUBDOMAINS.includes(subdomain)) {
        // This logic only runs for custom domains with subdomains.
        url.searchParams.set("salon", subdomain);
        url.pathname = `/`;
        return NextResponse.rewrite(url);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};