'use client';

import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { FaBars, FaTimes } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const mobileMenuVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.2 } },
};

const SalonHeader = ({ data }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Get the salon slug from the current URL
  const currentSlug = pathname.split('/')[1] || ''; // e.g., "radiance-salon"

  const toggleMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  const navLinks = [
    { label: 'Home', href: '' },
    { label: 'About', href: 'about' },
    { label: 'Services', href: 'services' },
    { label: 'Team', href: 'team' },
    { label: 'Contact', href: 'contact' },
  ];

  const getLinkClasses = (href) => {
    const fullPath = `/${currentSlug}${href ? `/${href}` : ''}`;
    const base = 'relative px-3 py-2 text-sm font-medium transition-colors duration-300 group';
    return pathname === fullPath
      ? `${base} text-gray-900`
      : `${base} text-gray-600 hover:text-gray-900`;
  };

  return (
    <nav className="fixed w-full top-0 z-50 bg-white/80 backdrop-blur-sm shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex items-center">
            <Link
              href={`/${currentSlug}`}
              className="text-3xl font-bold tracking-tight"
              style={{ color: data?.branding?.primaryColor || '#000' }}
            >
              {data?.name}
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => {
              const fullPath = `/${currentSlug}${link.href ? `/${link.href}` : ''}`;
              return (
                <Link key={link.href} href={fullPath} className={getLinkClasses(link.href)}>
                  {link.label}
                  <span
                    className={`absolute bottom-0 left-0 h-0.5 bg-current transition-all duration-300 ease-out group-hover:w-full ${
                      pathname === fullPath ? 'w-full' : 'w-0'
                    }`}
                  ></span>
                </Link>
              );
            })}

            {data?.settings?.showBookingButton && (
              <Link
                href={`/${currentSlug}/contact`}
                className="ml-4 px-6 py-3 rounded-full text-white font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
                style={{ backgroundColor: data?.branding?.primaryColor || '#000' }}
              >
                {data?.hero?.cta?.label || 'Book Now'}
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="text-gray-900 focus:outline-none"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Content */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="md:hidden bg-white/90 backdrop-blur-sm shadow-inner"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={mobileMenuVariants}
          >
            <div className="px-4 py-4 pb-6 flex flex-col items-start space-y-4">
              {navLinks.map((link) => {
                const fullPath = `/${currentSlug}${link.href ? `/${link.href}` : ''}`;
                return (
                  <Link
                    key={link.href}
                    href={fullPath}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block w-full px-3 py-2 text-base font-medium transition-colors text-gray-800 hover:text-pink-600"
                  >
                    {link.label}
                  </Link>
                );
              })}
              {data?.settings?.showBookingButton && (
                <Link
                  href={`/${currentSlug}/contact`}
                  className="mt-4 w-full px-6 py-3 text-center rounded-full text-white font-semibold"
                  onClick={() => setMobileMenuOpen(false)}
                  style={{ backgroundColor: data?.branding?.primaryColor || '#000' }}
                >
                  {data?.hero?.cta?.label || 'Book Now'}
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default SalonHeader;
