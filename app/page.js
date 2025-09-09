import { getSalonBySlug } from './lib/salons';
import SalonHero from './components/salon/Hero';
import SalonHeader from './components/salon/Header';
import SalonAbout from './components/salon/About';
import SalonServices from './components/salon/Services';
import SalonTeam from './components/salon/Team';
import SalonTestimonials from './components/salon/Testimonials';
import SalonGetInTouch from './components/salon/GetInTouch';
import SalonFooter from './components/salon/Footer';

export default async function Home({ searchParams }) {
  const params = await searchParams; 
  const subdomain = params?.salon || 'radiance-salon';

  const salonData = await getSalonBySlug(subdomain);

  if (!salonData) return <div>Salon not found</div>;

  return (
    <div className="flex flex-col w-full min-h-screen pt-20">
      <SalonHeader data={salonData} />
      <SalonHero data={salonData} />
      <SalonAbout data={salonData} />
      <SalonServices data={salonData} />
      <SalonTeam data={salonData} />
      <SalonTestimonials data={salonData} />
      <SalonGetInTouch data={salonData} />
      <SalonFooter data={salonData} />
    </div>
  );
}
