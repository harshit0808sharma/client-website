'use client';
import Image from 'next/image';
import Link from 'next/link';
import { FaCut, FaSpa, FaStar, FaClock, FaHandSparkles } from 'react-icons/fa';
import { motion } from 'framer-motion';

const iconMap = {
  FaCut: FaCut,
  FaSpa: FaSpa,
  FaHandSparkles: FaHandSparkles
};

const SalonServices = ({data}) => {
  if (!data?.services?.items?.length) return null;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100
      }
    }
  };

  return (
    <motion.section
      id="services"
      className="py-20"
      style={{ backgroundColor: data?.branding?.secondaryColor || "#f3f4f6" }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={containerVariants}
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
            {data?.services?.title || "Our Services"}
          </motion.h2>
          <motion.p
            className="text-lg text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {data?.services?.description || "Experience our premium beauty services designed to enhance your natural beauty."}
          </motion.p>
        </div>

        {/* Services Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10"
          variants={containerVariants}
        >
          {data?.services?.items?.map((service) => {
            const IconComponent = iconMap[service.icon] || FaStar;

            return (
              <motion.div
                key={service.id}
                className="bg-white rounded-3xl shadow-2xl overflow-hidden cursor-pointer transform hover:-translate-y-2 hover:shadow-3xl transition-all duration-500"
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
              >
                {/* Image */}
                <div className="h-48 bg-gray-200 overflow-hidden relative">
                  <Image
                    src={service.imageUrl || "/images/image.jpeg"}
                    alt={service.title || "Service"}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>

                {/* Content */}
                <div className="p-8">
                  <div className="flex items-center mb-5">
                    <div
                      className="p-4 rounded-full mr-5"
                      style={{ backgroundColor: data?.branding?.secondaryColor || "#e5e7eb" }}
                    >
                      <IconComponent
                        className="text-2xl"
                        style={{ color: data?.branding?.primaryColor || "#111" }}
                      />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">{service.title || "Service Title"}</h3>
                  </div>
                  <p className="text-gray-600 mb-6 leading-relaxed">{service.description || "Service description not available."}</p>
                  <div className="flex justify-between items-center border-t border-gray-100 pt-6">
                    <div className="flex items-center space-x-5">
                      <span
                        className="text-3xl font-extrabold"
                        style={{ color: data?.branding?.primaryColor || "#111" }}
                      >
                        ₹{service.price || "N/A"}
                      </span>
                      <span className="text-gray-500 flex items-center text-sm">
                        <FaClock className="mr-2 text-base" />
                        {service.duration || "-"}
                      </span>
                    </div>
                    <Link
                      href="/contact"
                      className="px-6 py-3 rounded-full text-white font-semibold shadow-lg transition-all duration-300 transform hover:scale-105"
                      style={{ backgroundColor: data?.branding?.primaryColor || "#111" }}
                    >
                      Book Now
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default SalonServices;
