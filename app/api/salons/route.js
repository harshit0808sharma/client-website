//app/api/salons/route.js

import clientPromise from "../../lib/mongodb";

export async function GET(req) {
  console.log("API route called: /api/salons");
  console.log("Environment check - MONGODB_URI exists:", !!process.env.MONGODB_URI);
  
  try {
    console.log("Attempting to connect to MongoDB...");
    const client = await clientPromise;
    console.log("Connected to MongoDB successfully");
    
    const db = client.db("restoDB");
    console.log("Accessing database: restoDB");
    
    const collections = await db.listCollections().toArray();
    console.log("Available collections:", collections.map(c => c.name));
    
    const hasRestaurantCollection = collections.some(c => c.name === "salons");
    console.log("Restaurant collection exists:", hasRestaurantCollection);
    
    if (!hasRestaurantCollection) {
      console.log("Restaurant collection not found!");
      return new Response(JSON.stringify({ 
        error: "Restaurant collection not found",
        availableCollections: collections.map(c => c.name)
      }), { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    const count = await db.collection("salons").countDocuments();
    console.log("Total documents in restaurant collection:", count);
    
    if (count === 0) {
      console.log("⚠️ No documents found in restaurant collection");
      return new Response(JSON.stringify({ 
        message: "No salons found",
        data: []
      }), { 
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    console.log("Fetching all documents from restaurant collection...");
    const salons = await db.collection("restaurant").find({}).toArray();
    console.log("Fetched salons count:", salons.length);
    console.log("First salon sample:", salons[0] ? JSON.stringify(salons[0], null, 2) : "No salons found");
    
    const serializedSalons = salons.map(salon => ({
      ...salon,
      _id: salon._id.toString()
    }));
    
    console.log("Returning serialized salons");
    return new Response(JSON.stringify(serializedSalons), { 
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
    
  } catch (err) {
    console.error("MongoDB fetch error:", err);
    console.error("Error stack:", err.stack);
    console.error("Error name:", err.name);
    console.error("Error message:", err.message);
    
    return new Response(JSON.stringify({ 
      error: "Failed to fetch data",
      errorMessage: err.message,
      errorName: err.name
    }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}