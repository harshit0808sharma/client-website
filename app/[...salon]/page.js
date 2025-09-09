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
    const { params, searchParams } = routeProps;
    const headersList = headers();

    // Await params and searchParams before using them
    const awaitedParams = await params;
    const awaitedSearchParams = await searchParams;

    // --- Determine salon slug and subpage ---
    let slug = null;
    let subpage = null;

    // 1. Check for the slug in search parameters (from subdomain rewrite)
    if (awaitedSearchParams.salon) {
        slug = awaitedSearchParams.salon;
        subpage = awaitedParams.salon?.[0] || null; // Subpage is the first part of the path
    } else {
        // 2. Fallback to URL path (for localhost and vercel app)
        const segments = awaitedParams.salon || [];
        slug = segments[0] || "radiance-salon";
        subpage = segments[1] || null;
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