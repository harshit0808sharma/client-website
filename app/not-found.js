'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { MdErrorOutline } from 'react-icons/md';

const containerVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 10,
      delay: 0.2,
    },
  },
};

const iconVariants = {
  hidden: { scale: 0 },
  visible: {
    scale: 1,
    rotate: [0, 10, -10, 0],
    transition: {
      type: 'spring',
      stiffness: 260,
      damping: 20,
      delay: 0.5,
    },
  },
};

const textVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { delay: 0.8 } },
};

export default function Custom404() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-black p-4">
      <motion.div
        className="text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          className="mb-6"
          variants={iconVariants}
        >
          <MdErrorOutline className="text-red-500 text-9xl mx-auto" />
        </motion.div>

        <motion.h1
          className="text-6xl md:text-8xl font-bold mb-4"
          variants={textVariants}
        >
          404
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl mb-8"
          variants={textVariants}
        >
          Oops! The page you're looking for doesn't exist.
        </motion.p>

        <motion.div variants={textVariants}>
          <Link
            href="/"
            className="inline-block px-6 py-3 bg-black text-white font-semibold rounded-lg shadow-md hover:bg-gray-800 transition duration-300"
          >
            Go back home
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
