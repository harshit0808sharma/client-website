//app/api/salons/[slug]/route.js

import clientPromise from "../../../lib/mongodb";

export async function GET(req, { params }) {
  try {
    const client = await clientPromise;
    const db = client.db("restoDB");
    const { slug } = params;
    
    // Find salon by slug
    const salon = await db.collection("salons").findOne({ slug: slug });
    
    if (!salon) {
      return new Response(JSON.stringify({ error: "Salon not found" }), { 
        status: 404,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }
    
    return new Response(JSON.stringify(salon), { 
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (err) {
    console.error("MongoDB fetch error:", err);
    return new Response(JSON.stringify({ error: "Failed to fetch data" }), { 
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}