import fs from 'fs';
import path from 'path';

export async function getAllSalons() {
  const filePath = path.join(process.cwd(), 'app', 'data', 'salon.json');
  const rawData = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(rawData);
}

export async function getSalonBySlug(slug) {
  const salons = await getAllSalons();
  return salons.find(salon => salon.slug === slug) || null;
}
