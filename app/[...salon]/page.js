"use server";

import { headers } from "next/headers";
import { getSalonBySlug } from "../lib/salons";

import SalonHeader from "../components/salon/Header";
import SalonHero from "../components/salon/Hero";
import SalonAbout from "../components/salon/About";
import SalonServices from "../components/salon/Services";
import SalonTeam from "../components/salon/Team";
import SalonTestimonials from "../components/salon/Testimonials";
import SalonGetInTouch from "../components/salon/GetInTouch";
import SalonFooter from "../components/salon/Footer";

export default async function SalonPage(routeProps) {
  // --- Await params and searchParams ---
  const params = await routeProps.params;
  const searchParams = await routeProps.searchParams;
  const headersList = await headers();

  const segments = params.salon || [];
  const host = headersList.get("host") || "";
  const isLocalhost = host.includes("localhost");

  // --- Determine salon slug and subpage ---
  let slug = null;
  let subpage = null;

  if (isLocalhost) {
    slug = segments[0] || searchParams?.salon || "radiance-salon";
    subpage = segments[1] || searchParams?.page || null;
  } else {
    const hostParts = host.split(".");
    slug = hostParts[0] || searchParams?.salon || "radiance-salon";
    subpage = segments[0] || searchParams?.page || null;
  }

  // --- Load salon data ---
  const salonData = await getSalonBySlug(slug);

  // --- Fallback for missing salon ---
  if (!salonData) {
    return (
      <div className="flex items-center justify-center min-h-screen text-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Salon Not Found</h1>
          <p className="text-gray-600">{`The salon "${slug}" doesn't exist.`}</p>
        </div>
      </div>
    );
  }

  // --- Render content based on subpage ---
  const renderContent = () => {
    switch (subpage) {
      case "about":
        return <SalonAbout data={salonData} />;
      case "services":
        return <SalonServices data={salonData} />;
      case "team":
        return <SalonTeam data={salonData} />;
      case "testimonials":
        return <SalonTestimonials data={salonData} />;
      case "contact":
        return <SalonGetInTouch data={salonData} />;
      default:
        // Homepage: show all main components
        return (
          <>
            <SalonHero data={salonData} />
            <SalonAbout data={salonData} />
            <SalonServices data={salonData} />
            <SalonTeam data={salonData} />
            <SalonTestimonials data={salonData} />
            <SalonGetInTouch data={salonData} />
          </>
        );
    }
  };

  // --- Render page ---
  return (
    <div className="flex flex-col w-full min-h-screen pt-20">
      <SalonHeader data={salonData} slug={slug} subpage={subpage} />
      {renderContent()}
      <SalonFooter data={salonData} />
    </div>
  );
}
