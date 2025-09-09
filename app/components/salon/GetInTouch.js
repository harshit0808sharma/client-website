'use client'

import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
    FaFacebook,
    FaInstagram,
    FaWhatsapp,
    FaPhone,
    FaEnvelope,
    FaMapMarkerAlt,
} from "react-icons/fa";
import { motion } from "framer-motion";

const SalonGetInTouch = ({data}) => {
    const socialIconMap = {
        facebook: FaFacebook,
        instagram: FaInstagram,
        whatsapp: FaWhatsapp,
    };

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [service, setService] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!name.trim()) {
            toast.error("Name is required!");
            return;
        }

        if (!email.trim()) {
            toast.error("Email is required!");
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            toast.error("Invalid email format!");
            return;
        }

        if (!service) {
            toast.error("Please select a service!");
            return;
        }

        if (!message.trim()) {
            toast.error("Message cannot be empty!");
            return;
        }
        toast.success("Message sent successfully!");

        setName("");
        setEmail("");
        setService("");
        setMessage("");
    };

    if (!data?.contact) return null;

    const sectionVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };

    return (
        <motion.section
            id="contact"
            className="py-20 bg-white"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={sectionVariants}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Heading */}
                <div className="text-center mb-16">
                    <motion.h2
                        className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight"
                        style={{ color: data?.branding?.primaryColor || "#000" }}
                        variants={itemVariants}
                    >
                        Get In Touch 👋
                    </motion.h2>
                    <motion.p
                        className="text-lg text-gray-600 max-w-2xl mx-auto"
                        variants={itemVariants}
                    >
                        Ready for your beauty transformation? Contact us to book your appointment
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Left Column: Contact Info */}
                    <div className="space-y-12">
                        <motion.div className="space-y-8" variants={itemVariants}>
                            {/* Phone */}
                            {data?.contact?.phone && (
                                <motion.div
                                    className="flex items-start space-x-4 p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300"
                                    whileHover={{ scale: 1.05 }}
                                >
                                    <div
                                        className="p-4 rounded-full flex-shrink-0 transition-colors duration-300"
                                        style={{ backgroundColor: data?.branding?.secondaryColor || "#f3f4f6" }}
                                    >
                                        <FaPhone className="text-2xl" style={{ color: data?.branding?.primaryColor || "#111" }} />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900">Phone</h3>
                                        <p className="text-gray-600 mt-1">{data.contact.phone}</p>
                                    </div>
                                </motion.div>
                            )}

                            {/* Email */}
                            {data?.contact?.email && (
                                <motion.div
                                    className="flex items-start space-x-4 p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300"
                                    whileHover={{ scale: 1.05 }}
                                >
                                    <div
                                        className="p-4 rounded-full flex-shrink-0 transition-colors duration-300"
                                        style={{ backgroundColor: data?.branding?.secondaryColor || "#f3f4f6" }}
                                    >
                                        <FaEnvelope className="text-2xl" style={{ color: data?.branding?.primaryColor || "#111" }} />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900">Email</h3>
                                        <p className="text-gray-600 mt-1">{data.contact.email}</p>
                                    </div>
                                </motion.div>
                            )}

                            {/* Address */}
                            {data?.contact?.address && (
                                <motion.div
                                    className="flex items-start space-x-4 p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300"
                                    whileHover={{ scale: 1.05 }}
                                >
                                    <div
                                        className="p-4 rounded-full flex-shrink-0 transition-colors duration-300"
                                        style={{ backgroundColor: data?.branding?.secondaryColor || "#f3f4f6" }}
                                    >
                                        <FaMapMarkerAlt className="text-2xl" style={{ color: data?.branding?.primaryColor || "#111" }} />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900">Address</h3>
                                        <p className="text-gray-600 mt-1">{data.contact.address}</p>
                                    </div>
                                </motion.div>
                            )}
                        </motion.div>

                        {/* Opening Hours & Social Links */}
                        <motion.div className="space-y-10" variants={itemVariants}>
                            {data?.contact?.openingHours?.length > 0 && (
                                <div>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-6">Opening Hours</h3>
                                    <div className="bg-gray-100 p-6 rounded-2xl shadow-inner">
                                        <div className="space-y-3">
                                            {data.contact.openingHours.map((schedule, index) => (
                                                <div key={index} className="flex justify-between items-center text-gray-700 font-medium">
                                                    <span>{schedule.day}</span>
                                                    <span>{schedule.hours}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {data?.socialLinks?.length > 0 && (
                                <div>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-6">Follow Us</h3>
                                    <div className="flex space-x-4">
                                        {data.socialLinks.map((social, index) => {
                                            const IconComponent = socialIconMap[social.platform];
                                            if (!IconComponent) return null;
                                            return (
                                                <motion.a
                                                    key={index}
                                                    href={social.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="p-4 rounded-full shadow-md transition-all duration-300 flex items-center justify-center"
                                                    style={{ backgroundColor: data?.branding?.primaryColor || "#111" }}
                                                    whileHover={{ scale: 1.2, rotate: 15 }}
                                                >
                                                    <IconComponent className="text-white text-xl" />
                                                </motion.a>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    </div>

                    {/* Right Column: Contact Form */}
                    <motion.div className="bg-white p-8 rounded-2xl shadow-2xl" variants={itemVariants}>
                        <h3 className="text-2xl font-bold text-gray-900 mb-6">Send Us a Message</h3>
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Name</label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-4 focus:outline-none transition-all duration-300"
                                    style={{ '--tw-ring-color': data?.branding?.primaryColor + '80' || '#11111180' }}
                                    placeholder="Your full name"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-4 focus:outline-none transition-all duration-300"
                                    style={{ '--tw-ring-color': data?.branding?.primaryColor + '80' || '#11111180' }}
                                    placeholder="your.email@example.com"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Service</label>
                                <select
                                    value={service}
                                    onChange={(e) => setService(e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-white focus:ring-4 focus:outline-none transition-all duration-300"
                                    style={{ '--tw-ring-color': data?.branding?.primaryColor + '80' || '#11111180' }}
                                >
                                    <option value="">Select a service</option>
                                    {data?.services?.items?.map((s) => (
                                        <option key={s.id} value={s.id}>
                                            {s.title}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Message</label>
                                <textarea
                                    rows={4}
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-4 focus:outline-none transition-all duration-300"
                                    style={{ '--tw-ring-color': data?.branding?.primaryColor + '80' || '#11111180' }}
                                    placeholder="Tell us about your preferences..."
                                ></textarea>
                            </div>

                            <motion.button
                                type="submit"
                                className="w-full py-3 px-6 rounded-full text-white font-bold shadow-lg transition-all"
                                style={{ backgroundColor: data?.branding?.primaryColor || "#111" }}
                                whileHover={{ scale: 1.05, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)" }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Send Message
                            </motion.button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </motion.section>
    );
};

export default SalonGetInTouch;