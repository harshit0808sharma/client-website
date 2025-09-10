//app/lib/salons.js

import clientPromise from './mongodb';

export async function getAllSalons() {
  try {
    const client = await clientPromise;
    const db = client.db("restoDB");
    const salons = await db.collection("salons").find({}).toArray();
    
    // Convert MongoDB ObjectId to string for JSON serialization
    return salons.map(salon => ({
      ...salon,
      _id: salon._id.toString()
    }));
  } catch (error) {
    console.error("Error fetching salons:", error);
    return [];
  }
}

export async function getSalonBySlug(slug) {
  try {
    const client = await clientPromise;
    const db = client.db("restoDB");
    const salon = await db.collection("salons").findOne({ slug: slug });
    
    if (!salon) {
      return null;
    }
    
    // Convert MongoDB ObjectId to string for JSON serialization
    return {
      ...salon,
      _id: salon._id.toString()
    };
  } catch (error) {
    console.error("Error fetching salon by slug:", error);
    return null;
  }
}