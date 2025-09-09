// import SalonHeader from '../components/salon/Header';
// import SalonAbout from '../components/salon/About';
// import SalonFooter from '../components/salon/Footer';
// import { getSalonBySlug } from '../lib/salons';
// import { headers } from 'next/headers';

// export default async function About() {
//   // Await headers() before using it
//   const headersList = await headers();
//   const host = headersList.get('host') || '';

//   // Determine subdomain
//   const subdomain = host.includes('localhost') ? 'radiance-salon' : host.split('.')[0];

//   // Fetch the salon data
//   const salonData = await getSalonBySlug(subdomain);

//   if (!salonData) return <div>Salon not found</div>;

//   return (
//     <div className="w-full min-h-screen pt-20">
//       <SalonHeader data={salonData} />
//       <SalonAbout data={salonData} />
//       <SalonFooter data={salonData} />
//     </div>
//   );
// }