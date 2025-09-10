'use client'

import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa';
import { usePathname } from 'next/navigation';

const SalonHero = ({data}) => {
    const pathname = usePathname();
      const currentSlug = pathname.split('/')[1] || '';
    if (!data?.hero) return null;

    const headingVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 1, ease: 'easeOut' } },
    };

    const subheadingVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 1, delay: 0.3, ease: 'easeOut' } },
    };

    const ctaVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.6, delay: 0.8 } },
    };


    return (
        <section
            id="home"
            className="relative h-screen flex items-center justify-center overflow-hidden"
        >
            <motion.div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${data?.hero?.heroImageUrl || "/placeholder.jpg"})` }}
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 4, ease: "easeOut" }}
            />

            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30 z-10"></div>

            {/* Hero content */}
            <div className="relative z-30 text-center text-white max-w-5xl mx-auto px-4">
                {/* Heading */}
                <motion.h1
                    className="text-5xl md:text-7xl lg:text-8xl font-extrabold mb-6 tracking-tight drop-shadow-lg"
                    variants={headingVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {data?.hero?.heading || "Welcome to Our Salon"}
                </motion.h1>

                {/* Subheading */}
                <motion.p
                    className="text-xl md:text-2xl mb-10 opacity-90 drop-shadow"
                    variants={subheadingVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {data?.hero?.subHeading || "Your beauty, our passion."}
                </motion.p>

                {/* CTA button */}
                {data?.hero?.cta?.label && (
                    <motion.div
                        variants={ctaVariants}
                        initial="hidden"
                        animate="visible"
                        whileHover={{ scale: 1.05, boxShadow: "0px 12px 24px rgba(0,0,0,0.3)" }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-block"
                    >
                        <Link
                            href={`/${currentSlug}/contact`}
                            className="px-10 py-5 text-lg font-bold rounded-full flex items-center justify-center gap-3 transition-all duration-300 transform"
                            style={{ backgroundColor: data?.branding?.primaryColor || "#111", boxShadow: '0 8px 15px rgba(0,0,0,0.2)' }}
                        >
                            {data?.hero?.cta?.label}
                            <FaArrowRight />
                        </Link>
                    </motion.div>
                )}
            </div>
        </section>
    );
};

export default SalonHero;
