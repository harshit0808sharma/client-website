import { headers } from 'next/headers';
import SalonHeader from '../components/salon/Header';
import SalonAbout from '../components/salon/About';
import SalonFooter from '../components/salon/Footer';
import { getSalonBySlug } from '../lib/salons';

export default async function About({ searchParams }) {
  // Await searchParams before accessing its properties
  const params = await searchParams;
  let subdomain = params?.salon;

  if (!subdomain) {
    const headersList = await headers();
    const host = headersList.get('host') || '';
    subdomain = host.includes('localhost') ? 'radiance-salon' : host.split('.')[0];
  }

  const salonData = await getSalonBySlug(subdomain);

  if (!salonData) return <div>Salon not found</div>;

  return (
    <>
      <div className="w-full min-h-screen pt-20">
        <SalonHeader data={salonData} />
        <SalonAbout data={salonData} />
        <SalonFooter data={salonData} />
      </div>
    </>
  );
}