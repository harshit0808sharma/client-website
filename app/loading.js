'use client'
// components/LoadingPage.js
import { motion } from 'framer-motion';

const spinVariants = {
  animate: {
    rotate: 360,
    transition: {
      duration: 1.5,
      ease: "linear",
      repeat: Infinity,
    },
  },
};

const LoadingPage = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
      <motion.div
        className="w-16 h-16 border-4 border-black border-t-transparent rounded-full"
        variants={spinVariants}
        animate="animate"
      />
    </div>
  );
};

export default LoadingPage;