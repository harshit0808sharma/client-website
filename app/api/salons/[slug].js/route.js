// // app/api/salons/[slug]/route.js
// import { getSalonBySlug } from "../../../../lib/salons";

// export async function GET(request, { params }) {
//   const { slug } = params;
//   const salon = await getSalonBySlug(slug);
//   if (!salon) return new Response(JSON.stringify({ message: "Not found" }), { status: 404, headers: { "Content-Type": "application/json" } });
//   return new Response(JSON.stringify(salon), { headers: { "Content-Type": "application/json" } });
// }
