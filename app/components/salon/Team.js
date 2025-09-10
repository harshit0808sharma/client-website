'use client'

import Image from 'next/image';
import { FaInstagram } from 'react-icons/fa';
import { motion } from 'framer-motion';

const SalonTeam = ({data}) => {
    if (!data?.team?.length) return null;

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2 },
        },
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 },
    };

    return (
        <section id="team" className="py-20 bg-gray-50">
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
                        Meet Our Team
                    </motion.h2>

                    <motion.p
                        className="text-lg text-gray-600 max-w-2xl mx-auto"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        {data?.teamHeading || "Our skilled professionals are dedicated to making you look and feel your best"}
                    </motion.p>
                </div>

                {/* Team */}
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    {data.team.map((member) => (
                        <motion.div
                            key={member.id}
                            className="bg-white rounded-3xl shadow-xl p-8 text-center relative group overflow-hidden transition-all duration-300"
                            variants={itemVariants}
                            whileHover={{ scale: 1.05, y: -5, boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)" }}
                        >
                            <div className="relative w-48 h-48 mx-auto rounded-full overflow-hidden mb-6">
                                <Image
                                    src={member.photoUrl || "/placeholder.jpg"}
                                    alt={member.name || "Team Member"}
                                    fill
                                    style={{ objectFit: "cover" }}
                                    className="border-4 border-white transform transition-transform duration-300 group-hover:scale-110"
                                />
                            </div>

                            {/* Social Media Link */}
                            {member.instagramUrl && (
                                <motion.a
                                    href={member.instagramUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all duration-300"
                                    style={{ backgroundColor: data?.branding?.primaryColor || "#111" }}
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ duration: 0.3, delay: 0.5 }}
                                    whileHover={{ scale: 1.1, y: -5 }}
                                >
                                    <FaInstagram className="text-white text-2xl" />
                                </motion.a>
                            )}

                            {/* Member Info */}
                            <div className="mt-8">
                                <h3 className="text-2xl font-bold text-gray-900 mb-1">{member.name || "Name"}</h3>
                                <p
                                    className="text-lg font-medium mb-3"
                                    style={{ color: data?.branding?.primaryColor || "#111" }}
                                >
                                    {member.role || "Role"}
                                </p>
                                <p className="text-gray-600 text-sm max-w-xs mx-auto">{member.bio || "Bio not available."}</p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default SalonTeam;
