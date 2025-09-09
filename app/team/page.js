// // app/team/page.js
// import SalonHeader from '../components/salon/Header';
// import SalonTeam from '../components/salon/Team';
// import SalonFooter from '../components/salon/Footer';
// import { getSalonBySlug } from '../lib/salons';

// export const dynamic = "force-dynamic"; // required for searchParams in App Router

// export default async function Team({ searchParams }) {
//   // Await searchParams before accessing its properties
//   const params = await searchParams;
//   const subdomain = params?.salon || "radiance-salon";
  
//   const salonData = await getSalonBySlug(subdomain);

//   if (!salonData) return <div>Salon not found</div>;

//   return (
//     <div className="w-full min-h-screen pt-20">
//       <SalonHeader data={salonData} />
//       <SalonTeam data={salonData} />
//       <SalonFooter data={salonData} />
//     </div>
//   );
// }