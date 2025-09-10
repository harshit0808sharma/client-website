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

    if (host.includes(".vercel.app") || host.includes("localhost")) {
        return NextResponse.next();
    }

    if (!RESERVED_SUBDOMAINS.includes(subdomain)) {
        url.searchParams.set("salon", subdomain);
        url.pathname = `/`;
        return NextResponse.rewrite(url);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};