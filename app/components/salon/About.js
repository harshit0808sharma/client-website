"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";

const SalonAbout = ({data}) => {
    if (!data?.about) return null;

    const sectionVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut", staggerChildren: 0.3 } },
    };

    const textVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
    };

    const imageVariants = {
        hidden: { opacity: 0, x: 50 },
        visible: { opacity: 1, x: 0, transition: { duration: 1.2, ease: "easeOut" } },
    };

    return (
        <motion.section
            className="relative py-20 bg-white overflow-hidden"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={sectionVariants}
        >
            <motion.div
                className="absolute top-10 left-10 md:top-20 md:left-20 w-16 h-16 md:w-20 md:h-20 rounded-full bg-pink-200 opacity-30 z-0"
                animate={{
                    y: [0, -15, 0],
                    x: [0, 10, 0],
                    rotate: [0, 10, -10, 0],
                }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            >
                <FaStar className="w-full h-full text-pink-400" />
            </motion.div>

            <motion.div
                className="absolute bottom-10 right-10 md:bottom-20 md:right-20 w-16 h-16 md:w-24 md:h-24 rounded-full bg-blue-200 opacity-30 z-0"
                animate={{
                    y: [0, 15, 0],
                    x: [0, -10, 0],
                    rotate: [0, -15, 15, 0],
                }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            ></motion.div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Left Section (Text) */}
                    <div className="order-2 lg:order-1">
                        <motion.h2
                            className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight"
                            style={{ color: data?.branding?.primaryColor || "#000" }}
                            variants={textVariants}
                        >
                            {data?.about?.title || "About Our Salon"}
                        </motion.h2>

                        <motion.p
                            className="text-lg text-gray-700 leading-relaxed mb-8"
                            variants={textVariants}
                        >
                            {data?.about?.paragraph ||
                                "Welcome to our salon! We provide professional beauty and wellness services."}
                        </motion.p>

                        <motion.div className="grid grid-cols-1 sm:grid-cols-2 gap-6" variants={sectionVariants}>
                            <motion.div
                                className="text-center p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300"
                                style={{ backgroundColor: data?.branding?.secondaryColor || "#f3f4f6" }}
                                variants={textVariants}
                                whileHover={{ scale: 1.05 }}
                            >
                                <div
                                    className="text-4xl font-bold mb-2"
                                    style={{ color: data?.branding?.primaryColor || "#111" }}
                                >
                                    500+
                                </div>
                                <div className="text-lg text-gray-600">Happy Clients</div>
                            </motion.div>

                            <motion.div
                                className="text-center p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300"
                                style={{ backgroundColor: data?.branding?.secondaryColor || "#f3f4f6" }}
                                variants={textVariants}
                                whileHover={{ scale: 1.05 }}
                            >
                                <div
                                    className="text-4xl font-bold mb-2"
                                    style={{ color: data?.branding?.primaryColor || "#111" }}
                                >
                                    10+
                                </div>
                                <div className="text-lg text-gray-600">Years Experience</div>
                            </motion.div>
                        </motion.div>
                    </div>

                    {/* Right Section (Image) */}
                    <motion.div
                        className="order-1 lg:order-2 relative"
                        variants={imageVariants}
                    >
                        <div className="w-full h-96 relative rounded-2xl overflow-hidden shadow-2xl">
                            <Image
                                src={data?.about?.imageUrl || "/placeholder.jpg"}
                                alt={data?.about?.title || "Salon Interior"}
                                layout="fill"
                                objectFit="cover"
                                className="transition-all duration-500 hover:scale-110"
                            />
                        </div>
                    </motion.div>
                </div>
            </div>
        </motion.section>
    );
};

export default SalonAbout;