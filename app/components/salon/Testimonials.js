'use client';
import Image from 'next/image';
import { FaQuoteLeft, FaStar } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useState, useEffect, useCallback } from 'react';

const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
        <FaStar
            key={i}
            className={`text-lg transition-colors duration-300 ${i < (rating || 0) ? 'text-yellow-400' : 'text-gray-300'}`}
        />
    ));
};

const SalonTestimonials = ({ data }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isMobile, setIsMobile] = useState(false);

    // Always call hooks first
    useEffect(() => {
        const checkScreen = () => setIsMobile(window.innerWidth < 768);
        checkScreen();
        window.addEventListener("resize", checkScreen);
        return () => window.removeEventListener("resize", checkScreen);
    }, []);

    const cardsVisible = isMobile ? 1 : 2;
    const slideStep = 1;
    const maxIndex = data?.testimonials?.length ? data.testimonials.length - cardsVisible : 0;

    const nextSlide = useCallback(() => {
        setCurrentIndex((prev) => Math.min(prev + slideStep, maxIndex));
    }, [maxIndex, slideStep]);

    const prevSlide = useCallback(() => {
        setCurrentIndex((prev) => Math.max(prev - slideStep, 0));
    }, [slideStep]);

    const goToSlide = (index) => {
        setCurrentIndex(Math.min(index, maxIndex));
    };

    useEffect(() => {
        if (!data?.testimonials?.length) return;
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + slideStep));
        }, 5000);
        return () => clearInterval(interval);
    }, [maxIndex, slideStep, data?.testimonials?.length]);

    if (!data?.testimonials?.length) return null; // Return after hooks

    const handleDragEnd = (event, info) => {
        const threshold = isMobile ? 50 : 100;
        const velocity = Math.abs(info.velocity.x);

        if (info.offset.x > threshold || (velocity > 300 && info.offset.x > 20)) {
            if (currentIndex > 0) prevSlide();
        } else if (info.offset.x < -threshold || (velocity > 300 && info.offset.x < -20)) {
            if (currentIndex < maxIndex) nextSlide();
        }
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2 }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 }
    };

    const cardWidthPercentage = isMobile ? 100 : 50;

    return (
        <section
            id="testimonials"
            className="py-20"
            style={{ backgroundColor: data?.branding?.secondaryColor || "#f3f4f6" }}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Heading */}
                <div className="text-center mb-16">
                    <motion.h2
                        className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight"
                        style={{ color: data?.branding?.primaryColor || "#111" }}
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        {data?.testimonialsHeading || "What Our Clients Say"}
                    </motion.h2>
                    <motion.p
                        className="text-lg text-gray-600 max-w-2xl mx-auto"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        {data?.testimonialsSubHeading || "Do not just take our word for it, hear from our satisfied customers"}
                    </motion.p>
                </div>

                {/* Carousel Container */}
                <div className="relative overflow-hidden select-none">
                    <motion.div
                        className="flex"
                        drag="x"
                        dragConstraints={{ left: 0, right: 0 }}
                        dragElastic={0.2}
                        onDragEnd={handleDragEnd}
                        whileDrag={{ cursor: "grabbing" }}
                        animate={{ x: `-${currentIndex * cardWidthPercentage}%` }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                    >
                        {data.testimonials.map((testimonial) => (
                            <motion.div
                                key={testimonial.id}
                                className={`flex-shrink-0 px-5 cursor-grab ${isMobile ? 'w-full' : 'w-1/2'}`}
                                variants={itemVariants}
                                whileHover={{ scale: 1.02 }}
                            >
                                <div className="bg-white rounded-3xl shadow-xl p-8 relative overflow-hidden transform hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 h-full select-none" style={{ userSelect: 'none' }}>
                                    <div className="relative mb-6">
                                        <motion.div
                                            className="absolute -top-2 -left-2 text-4xl opacity-20 transform -rotate-12 origin-top-left"
                                            style={{ color: data?.branding?.primaryColor || "#111" }}
                                            initial={{ scale: 0.8 }}
                                            animate={{ scale: 1 }}
                                            transition={{ duration: 0.3, type: 'spring' }}
                                        >
                                            <FaQuoteLeft />
                                        </motion.div>
                                        <p className="text-gray-700 italic text-lg leading-relaxed pl-8">{testimonial.text || "No testimonial text available."}</p>
                                    </div>

                                    <div className="flex items-center">
                                        <div className="w-16 h-16 rounded-full overflow-hidden mr-4 shadow-md">
                                            <Image
                                                src={testimonial.photoUrl || "/placeholder.jpg"}
                                                alt={testimonial.clientName || "Client"}
                                                width={64}
                                                height={64}
                                                className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="font-bold text-gray-900 text-lg">{testimonial.clientName || "Client Name"}</h4>
                                            <p className="text-gray-500 text-sm">{testimonial.role || "Client Role"}</p>
                                            <div className="flex space-x-1 mt-2">{renderStars(testimonial.rating)}</div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>

                <div className="flex justify-center mt-8 space-x-2">
                    {Array.from({ length: maxIndex + 1 }).map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goToSlide(index)}
                            className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentIndex ? "w-8" : "bg-gray-300 hover:bg-gray-400"}`}
                            style={{
                                backgroundColor: index === currentIndex
                                    ? (data?.branding?.primaryColor || "#111")
                                    : undefined
                            }}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default SalonTestimonials;
