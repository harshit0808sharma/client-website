// import fs from "fs";
// import path from "path";

// const filePath = path.join(process.cwd(), "app", "data", "salon.json");

// export async function getAllSalons() {
//   try {
//     const rawData = fs.readFileSync(filePath, "utf8");
//     return JSON.parse(rawData);
//   } catch (err) {
//     console.error("Error reading salon.json:", err);
//     return [];
//   }
// }

// export async function getSalonData(slug) {
//   const salons = await getAllSalons();
//   return salons.find((salon) => salon.slug === slug) || null;
// }
