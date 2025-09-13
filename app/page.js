
import Link from "next/link";
import { getAllSalons } from "./lib/salons";
import Image from "next/image";

export default async function HomePage() {
  const salons = await getAllSalons();
  // throw new Error("Testing Error");

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <h1 className="text-4xl font-extrabold text-center mb-12 text-gray-900">
        Discover Our Salons
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {salons.map((salon) => (
          <Link
            key={salon.slug}
            href={`/${salon.slug}`}
            className="group relative rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow bg-white"
          >
            <div className="relative h-56 w-full">
              <Image
                src={salon.hero.heroImageUrl || "/images/hero-salon.jpg"}
                alt={salon.name}
                fill
                style={{ objectFit: "cover" }}
                className="group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            <div className="p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-2 group-hover:text-pink-600 transition-colors">
                {salon.name}
              </h2>
              {salon.description && (
                <p className="text-gray-600 mb-4">{salon.description}</p>
              )}
              <span className="inline-block px-4 py-2 bg-pink-600 text-white rounded-full font-medium text-sm hover:bg-pink-500 transition-colors">
                Visit Salon
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
