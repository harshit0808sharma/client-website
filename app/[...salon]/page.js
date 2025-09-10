"use server";
import { getSalonBySlug } from "../lib/salons";

import SalonHeader from "../components/salon/Header";
import SalonHero from "../components/salon/Hero";
import SalonAbout from "../components/salon/About";
import SalonServices from "../components/salon/Services";
import SalonTeam from "../components/salon/Team";
import SalonTestimonials from "../components/salon/Testimonials";
import SalonGetInTouch from "../components/salon/GetInTouch";
import SalonFooter from "../components/salon/Footer";

export async function generateMetadata(routeProps) {
    const { params } = routeProps;
    const awaitedParams = await params;
    
    const slug = awaitedParams.salon?.[0] || "radiance-salon";
    const salonData = await getSalonBySlug(slug);

    if (!salonData) {
        return {
            title: "Salon Not Found",
            description: "The requested salon does not exist.",
        };
    }

    return {
        title: salonData.name, // Use the salon's name from the database
        description: `Explore the services and team at ${salonData.name}. ${salonData.about_short_description}`, // Use the salon's description
    };
}

export default async function SalonPage(routeProps) {
    const { params, searchParams } = routeProps;

    const awaitedParams = await params;
    const awaitedSearchParams = await searchParams;

    let slug = null;
    let subpage = null;

    if (awaitedSearchParams.salon) {
        slug = awaitedSearchParams.salon;
        subpage = awaitedParams.salon?.[0] || null; 
    } else {
        const segments = awaitedParams.salon || [];
        slug = segments[0] || "radiance-salon";
        subpage = segments[1] || null;
    }

    const salonData = await getSalonBySlug(slug);

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

    return (
        <div className="flex flex-col w-full min-h-screen pt-20">
            <SalonHeader data={salonData} slug={slug} subpage={subpage} />
            {renderContent()}
            <SalonFooter data={salonData} />
        </div>
    );
}
