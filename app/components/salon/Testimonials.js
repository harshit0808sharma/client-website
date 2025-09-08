'use client'
import salonData from '../../data/salon.json';
import Image from 'next/image';
import { FaQuoteLeft, FaStar } from 'react-icons/fa';
import { motion } from 'framer-motion';

const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
        <FaStar
            key={i}
            className={`text-lg transition-colors duration-300 ${i < (rating || 0) ? 'text-yellow-400' : 'text-gray-300'}`}
        />
    ));
};

const SalonTestimonials = () => {
    if (!salonData?.testimonials?.length) return null;

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1
        }
    };

    return (
        <section
            id="testimonials"
            className="py-20"
            style={{ backgroundColor: salonData?.branding?.secondaryColor || "#f3f4f6" }}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Heading */}
                <div className="text-center mb-16">
                    <motion.h2
                        className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight"
                        style={{ color: salonData?.branding?.primaryColor || "#111" }}
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        {salonData?.testimonialsHeading || "What Our Clients Say"} 🗣️
                    </motion.h2>
                    <motion.p
                        className="text-lg text-gray-600 max-w-2xl mx-auto"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        {salonData?.testimonialsSubHeading || "Don't just take our word for it - hear from our satisfied customers"}
                    </motion.p>
                </div>

                {/* Testimonials Grid */}
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 gap-10"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                >
                    {salonData.testimonials.map((testimonial) => (
                        <motion.div
                            key={testimonial.id}
                            className="bg-white rounded-3xl shadow-xl p-8 relative overflow-hidden transform hover:-translate-y-2 hover:shadow-2xl transition-all duration-300"
                            variants={itemVariants}
                            whileHover={{ scale: 1.02 }}
                        >
                            <div className="relative mb-6">
                                <motion.div
                                    className="absolute -top-2 -left-2 text-4xl opacity-20 transform -rotate-12 origin-top-left"
                                    style={{ color: salonData?.branding?.primaryColor || "#111" }}
                                    initial={{ scale: 0.8 }}
                                    animate={{ scale: 1 }}
                                    transition={{ duration: 0.3, type: 'spring' }}
                                >
                                    <FaQuoteLeft />
                                </motion.div>
                                <p className="text-gray-700 italic text-lg leading-relaxed pl-8">"{testimonial.text || "No testimonial text available."}"</p>
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
                                    <div className="flex space-x-1 mt-2">
                                        {renderStars(testimonial.rating)}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default SalonTestimonials;