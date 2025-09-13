
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const options = {};

console.log("MongoDB URI present:", !!uri);
console.log("MongoDB URI (first 20 chars):", uri ? uri.substring(0, 20) + "..." : "NOT SET");

let client;
let clientPromise;

if (!process.env.MONGODB_URI) {
  console.error("MONGODB_URI not found in environment variables");
  throw new Error("Please add your Mongo URI to .env.local");
}

if (process.env.NODE_ENV === "development") {
  console.log("🔧 Development mode - using global client promise");
  if (!global._mongoClientPromise) {
    console.log("🔧 Creating new MongoDB client for development");
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  console.log("🔧 Production mode - creating new client");
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

clientPromise.then(() => {
  console.log("MongoDB client promise resolved successfully");
}).catch((error) => {
  console.error("MongoDB client promise rejected:", error);
});

export default clientPromise;