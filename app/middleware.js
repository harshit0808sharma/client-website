// import { NextResponse } from "next/server";

// export function middleware(req) {
//   const url = req.nextUrl.clone();
//   const host = req.headers.get("host") || "";
//   const [subdomain] = host.split(".");

//   // Only rewrite if subdomain exists, is not www, and is not the main domain
//   if (
//     subdomain &&
//     subdomain !== "www" &&
//     subdomain !== "lokaci" && // replace with your main domain name
//     !url.searchParams.has("salon")
//   ) {
//     url.searchParams.set("salon", subdomain);
//     return NextResponse.rewrite(url);
//   }

//   return NextResponse.next();
// }

// // Run middleware for all routes
// export const config = {
//   matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
// };
