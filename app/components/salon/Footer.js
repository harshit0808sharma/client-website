'use client'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    FaFacebook,
    FaInstagram,
    FaWhatsapp,
    FaPhone,
    FaEnvelope,
    FaMapMarkerAlt,
} from 'react-icons/fa';

const SalonFooter = ({data}) => {
    const pathname = usePathname();
    const currentslug = pathname.split('/')[1] || '';
    const socialIconMap = {
        facebook: FaFacebook,
        instagram: FaInstagram,
        whatsapp: FaWhatsapp,
    };

    return (
        <footer className="bg-gray-900 text-white py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                    {/* Brand Section */}
                    <div className="md:col-span-2">
                        <h3
                            className="text-3xl font-extrabold mb-4 tracking-tight"
                            style={{ color: data?.branding?.primaryColor || '#FFF' }}
                        >
                            {data?.name}
                        </h3>
                        <p className="text-gray-400 mb-6 max-w-sm">
                            Your premier destination for beauty and wellness services, where luxury meets expertise.
                        </p>
                        {data?.socialLinks && data.socialLinks.length > 0 && (
                            <div className="flex space-x-4 mt-6">
                                {data.socialLinks.map((social, index) => {
                                    const IconComponent = socialIconMap[social?.platform];
                                    if (!IconComponent) return null;
                                    return (
                                        <a
                                            key={index}
                                            href={social.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="p-3 rounded-full transition-all duration-300 transform hover:scale-110 hover:shadow-lg"
                                            style={{ backgroundColor: data?.branding?.primaryColor || '#6b7280' }}
                                        >
                                            <IconComponent className="text-white text-xl" />
                                        </a>
                                    );
                                })}
                            </div>
                        )}
                    </div>

                    {/* Links */}
                    <div>
                        <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
                        <ul className="space-y-4">
                            <li>
                                <Link href={`/${currentslug}/`} className="text-gray-400 hover:text-white transition-colors duration-200">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link href={`/${currentslug}/about`} className="text-gray-400 hover:text-white transition-colors duration-200">
                                    About
                                </Link>
                            </li>
                            <li>
                                <Link href={`/${currentslug}/services`} className="text-gray-400 hover:text-white transition-colors duration-200">
                                    Services
                                </Link>
                            </li>
                            <li>
                                <Link href={`/${currentslug}/team`} className="text-gray-400 hover:text-white transition-colors duration-200">
                                    Team
                                </Link>
                            </li>
                            <li>
                                <Link href={`/${currentslug}/contact`} className="text-gray-400 hover:text-white transition-colors duration-200">
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-lg font-semibold mb-6">Contact Us</h4>
                        <div className="space-y-4">
                            {data?.contact?.phone && (
                                <p className="text-gray-400 flex items-center">
                                    <FaPhone className="mr-3 text-lg" style={{ color: data?.branding?.primaryColor || '#FFF' }} />
                                    {data.contact.phone}
                                </p>
                            )}
                            {data?.contact?.email && (
                                <p className="text-gray-400 flex items-center">
                                    <FaEnvelope className="mr-3 text-lg" style={{ color: data?.branding?.primaryColor || '#FFF' }} />
                                    {data.contact.email}
                                </p>
                            )}
                            {data?.contact?.address && (
                                <p className="text-gray-400 flex items-start">
                                    <FaMapMarkerAlt className="mr-3 mt-1 text-lg flex-shrink-0" style={{ color: data?.branding?.primaryColor || '#FFF' }} />
                                    {data.contact.address}
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-800 mt-12 pt-8 text-center">
                    <p className="text-gray-500 text-sm">
                        &copy; 2025{' '}
                        <span style={{ color: data?.branding?.primaryColor || '#FFF' }}>
                            {data?.name}
                        </span>
                        . All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default SalonFooter;