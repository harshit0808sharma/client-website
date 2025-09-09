import { headers } from "next/headers";
import SalonHeader from "../../../components/salon/Header";
import SalonAbout from "../../../components/salon/About";
import SalonFooter from "../../../components/salon/Footer";
import { getSalonBySlug } from "../../../lib/salons";

export default async function AboutPage({ params, searchParams }) {
  // Try to get slug from params first
  let subdomain = params?.salon?.[0]; // First segment in [...salon]

  // Fallback: If no subdomain in params, try query param
  if (!subdomain && searchParams?.salon) {
    subdomain = searchParams.salon;
  }

  // Fallback for localhost or custom domain
  if (!subdomain) {
    const headersList = headers();
    const host = headersList.get("host") || "";
    subdomain = host.includes("localhost") ? "radiance-salon" : host.split(".")[0];
  }

  // Fetch salon data
  const salonData = await getSalonBySlug(subdomain);

  if (!salonData) {
    return <div className="p-10 text-center">Salon not found</div>;
  }

  return (
    <div className="w-full min-h-screen pt-20">
      <SalonHeader data={salonData} />
      <SalonAbout data={salonData} />
      <SalonFooter data={salonData} />
    </div>
  );
}
