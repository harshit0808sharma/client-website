import { NextResponse } from "next/server";
import salons from "../../data/salon.json"; // adjust path if needed

// GET /api/salon?slug=radiance-salon
export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug");

  if (!slug) {
    return NextResponse.json({ error: "Salon slug is required" }, { status: 400 });
  }

  const salon = salons.find((s) => s.slug === slug);

  if (!salon) {
    return NextResponse.json({ error: "Salon not found" }, { status: 404 });
  }

  return NextResponse.json(salon);
}
