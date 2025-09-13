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

import {
    Montserrat, Roboto, Lato, Oswald, Raleway,
    Nunito, Mulish, Open_Sans, Poppins, Karla
} from "next/font/google";

const montserrat = Montserrat({ subsets: ["latin"], weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"], variable: "--font-montserrat" });
const roboto = Roboto({ subsets: ["latin"], weight: ["100", "300", "400", "500", "700", "900"], variable: "--font-roboto" });
const lato = Lato({ subsets: ["latin"], weight: ["100", "300", "400", "700", "900"], variable: "--font-lato" });
const oswald = Oswald({ subsets: ["latin"], weight: ["200", "300", "400", "500", "600", "700"], variable: "--font-oswald" });
const raleway = Raleway({ subsets: ["latin"], weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"], variable: "--font-raleway" });
const nunito = Nunito({ subsets: ["latin"], weight: ["200", "300", "400", "600", "700", "800", "900"], variable: "--font-nunito" });
const mulish = Mulish({ subsets: ["latin"], weight: ["200", "300", "400", "500", "600", "700", "800", "900"], variable: "--font-mulish" });
const openSans = Open_Sans({ subsets: ["latin"], weight: ["300", "400", "600", "700", "800"], variable: "--font-open-sans" });
const poppins = Poppins({ subsets: ["latin"], weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"], variable: "--font-poppins" });
const karla = Karla({ subsets: ["latin"], weight: ["200", "300", "400", "500", "600", "700", "800"], variable: "--font-karla" });

const fontMap = {
    Montserrat: montserrat,
    Roboto: roboto,
    Lato: lato,
    Oswald: oswald,
    Raleway: raleway,
    Nunito: nunito,
    Mulish: mulish,
    "Open Sans": openSans,
    Poppins: poppins,
    Karla: karla
};

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
        title: salonData.name,
        description: `Explore the services and team at ${salonData.name}. ${salonData.about_short_description}`,
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

    const fontName = salonData?.branding?.fontFamily?.split(",")[0].trim() || "Montserrat";
    const font = fontMap[fontName] || montserrat;

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
        <div className={`flex flex-col w-full min-h-screen pt-20 ${font.className}`}>
            <SalonHeader data={salonData} slug={slug} subpage={subpage} />
            {renderContent()}
            <SalonFooter data={salonData} />
        </div>
    );
}
