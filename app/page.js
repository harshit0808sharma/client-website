//page.js
import SalonHero from './components/salon/Hero';
import SalonHeader from './components/salon/Header';
import SalonAbout from './components/salon/About';
import SalonServices from './components/salon/Services';
import SalonTeam from './components/salon/Team';
import SalonTestimonials from './components/salon/Testimonials';
import SalonGetInTouch from './components/salon/GetInTouch';
import SalonFooter from './components/salon/Footer';


export default function Home() {
    return (
        <>
            <div className="flex flex-col w-full min-h-screen scrollbar-none">
                <SalonHeader />
                <SalonHero />
                <SalonAbout />
                <SalonServices />
                <SalonTeam />
                <SalonTestimonials />
                <SalonGetInTouch />
                <SalonFooter />
            </div>
        </>
    );
};