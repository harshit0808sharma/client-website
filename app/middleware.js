
// import { NextResponse } from "next/server";

// export function middleware(req) {
//   const url = req.nextUrl.clone();
//   const host = req.headers.get("host") || "";
//   const [subdomain] = host.split(".");

//   if (subdomain && subdomain !== "www" && subdomain !== "yourmaindomain") {
//     url.searchParams.set("salon", subdomain);
//   }

//   return NextResponse.rewrite(url);
// }
