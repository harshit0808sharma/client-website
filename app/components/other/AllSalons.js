// // app/salons/page.js
// import Link from 'next/link';
// import { getAllSalons } from '../../lib/salons';

// export default async function AllSalons() {
//   const salons = await getAllSalons();

//   if (!salons || salons.length === 0) {
//     return <div>No salons available</div>;
//   }

//   return (
//     <div className="min-h-screen p-8 bg-gray-50">
//       <h1 className="text-3xl font-bold mb-8 text-center">Our Salons</h1>
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//         {salons.map((salon) => (
//           <Link
//             key={salon.slug}
//             href={`/?salon=${salon.slug}`}
//             className="block border rounded-lg overflow-hidden shadow hover:shadow-lg transition"
//           >
//             <img
//               src={salon.branding.logoUrl || '/images/placeholder.png'}
//               alt={salon.name}
//               className="w-full h-48 object-cover"
//             />
//             <div className="p-4 text-center">
//               <h2 className="text-xl font-semibold">{salon.name}</h2>
//             </div>
//           </Link>
//         ))}
//       </div>
//     </div>
//   );
// }
