'use client';
import Image from 'next/image';
import Link from 'next/link';
import { FaCut, FaSpa, FaStar, FaClock, FaHandSparkles, FaArrowRight } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

const iconMap = {
  FaCut: FaCut,
  FaSpa: FaSpa,
  FaHandSparkles: FaHandSparkles
};

const SalonServices = ({ data }) => {
  if (!data?.services?.items?.length) return null;

  const services = data.services.items;
  const slidesPerView = 2; // number of slides visible
  const [current, setCurrent] = useState(0);

  // Autoplay
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + slidesPerView) % services.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [services.length]);

  const nextSlide = () => {
    setCurrent((prev) => (prev + slidesPerView) % services.length);
  };

  const prevSlide = () => {
    setCurrent((prev) =>
      (prev - slidesPerView + services.length) % services.length
    );
  };

  return (
    <section
      id="services"
      className="py-20 relative"
      style={{ backgroundColor: data?.branding?.secondaryColor || '#f3f4f6' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2
            className="text-4xl font-extrabold mb-4"
            style={{ color: data?.branding?.primaryColor || '#111' }}
          >
            {data?.services?.title || 'Our Services'}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {data?.services?.description ||
              'Experience our premium beauty services designed to enhance your natural beauty.'}
          </p>
        </div>

        {/* Carousel */}
        <div className="relative">
          <div className="overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                className="flex gap-6"
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -50, opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                {services
                  .slice(current, current + slidesPerView)
                  .concat(
                    current + slidesPerView > services.length
                      ? services.slice(0, (current + slidesPerView) % services.length)
                      : []
                  )
                  .map((service) => {
                    const IconComponent = iconMap[service.icon] || FaStar;
                    return (
                      <div
                        key={service.id}
                        className="relative bg-white rounded-3xl shadow-lg overflow-hidden flex-1 group hover:shadow-2xl transition-shadow duration-500"
                      >
                        {/* Image with overlay */}
                        <div className="h-56 relative overflow-hidden">
                          <Image
                            src={service.imageUrl || '/images/image.jpeg'}
                            alt={service.title || 'Service'}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-700"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                          <div className="absolute top-4 left-4 bg-white/80 text-sm font-bold px-3 py-1 rounded-full shadow">
                            {service.duration || '30 min'}
                          </div>
                        </div>

                        {/* Content */}
                        <div className="p-6 flex flex-col justify-between h-full">
                          <div>
                            <div className="flex items-center mb-4">
                              <div
                                className="p-3 rounded-full mr-4 shadow-md"
                                style={{
                                  backgroundColor:
                                    data?.branding?.secondaryColor || '#e5e7eb'
                                }}
                              >
                                <IconComponent
                                  className="text-xl"
                                  style={{
                                    color: data?.branding?.primaryColor || '#111'
                                  }}
                                />
                              </div>
                              <h3 className="text-xl font-bold">
                                {service.title || 'Service Title'}
                              </h3>
                            </div>
                            <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                              {service.description ||
                                'Service description not available.'}
                            </p>
                          </div>
                          <div className="flex justify-between items-center border-t border-gray-100 pt-4">
                            <div>
                              <span
                                className="text-2xl font-bold"
                                style={{
                                  color: data?.branding?.primaryColor || '#111'
                                }}
                              >
                                ₹{service.price || 'N/A'}
                              </span>
                            </div>
                            <Link
                              href="/contact"
                              className="flex items-center gap-2 px-4 py-2 rounded-full text-white text-sm font-semibold shadow-lg hover:scale-105 transition-transform"
                              style={{
                                backgroundColor:
                                  data?.branding?.primaryColor || '#111'
                              }}
                            >
                              Book Now <FaArrowRight size={14} />
                            </Link>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          {services.length > slidesPerView && (
            <div className="flex justify-between mt-8">
              <button
                onClick={prevSlide}
                className="px-4 py-2 bg-gray-900 text-white rounded-full hover:bg-gray-700 transition"
              >
                Prev
              </button>
              <button
                onClick={nextSlide}
                className="px-4 py-2 bg-gray-900 text-white rounded-full hover:bg-gray-700 transition"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default SalonServices;
