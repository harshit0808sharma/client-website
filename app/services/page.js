import SalonHeader from '../components/salon/Header';
import SalonServices from '../components/salon/Services';
import SalonFooter from '../components/salon/Footer';
import { getSalonBySlug } from '../lib/salons';

export const dynamic = "force-dynamic";

export default async function Services({ searchParams }) {
  // Await searchParams before accessing its properties
  const params = await searchParams;
  const subdomain = params?.salon || "radiance-salon";
  
  const salonData = await getSalonBySlug(subdomain);

  if (!salonData) return <div>Salon not found</div>;

  return (
    <div className="w-full min-h-screen pt-20">
      <SalonHeader data={salonData} />
      <SalonServices data={salonData} />
      <SalonFooter data={salonData} />
    </div>
  );
}