import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import i4 from "../assets/Hero/4.jpg";

const Hero = () => {
  const [showShopName, setShowShopName] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowShopName((prev) => !prev);
    }, 8000); // Switch every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative flex items-center justify-center h-screen overflow-hidden font-JosefinSans">
      {/* Image Block */}
      <div className="absolute inset-0">
        <img
          src={i4}
          alt="Luxury Bags"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-opacity-50"></div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-6 md:px-12">
        <AnimatePresence mode="wait">
          {showShopName ? (
            // **Phase 1: Shop Name + Buttons**
            <motion.div
              key="shop-name"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-4">
                Welcome to{" "}
                <span className="text-[#3d6c26] text-8xl">Great</span>
                <span className="text-[#6a4d1a] text-8xl"> Design</span>
              </h1>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="flex justify-center space-x-4"
              >
                <button className="px-6 py-3 bg-[#3d6c26] text-white font-semibold text-lg rounded-full hover:bg-[#6a4d1a] transition-all">
                  Shop Now
                </button>
                <button className="px-6 py-3 border border-white text-white font-semibold text-lg rounded-full hover:bg-white hover:text-gray-900 transition-all">
                  Explore Collections
                </button>
              </motion.div>
            </motion.div>
          ) : (
            // **Phase 2: Headline, Description, Buttons**
            <motion.div
              key="hero-content"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-4">
                Elevate Your Style with{" "}
                <span className="text-[#3d6c26]">Luxury Bags</span>
              </h1>

              <p className="text-lg md:text-xl text-gray-300 mb-6">
                Discover high-quality handbags, backpacks, and accessories. Shop
                the latest trends today!
              </p>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="flex justify-center space-x-4"
              >
                <button className="px-6 py-3 bg-[#3d6c26] text-white font-semibold text-lg rounded-full hover:bg-[#6a4d1a] transition-all">
                  Shop Now
                </button>
                <button className="px-6 py-3 border border-white text-white font-semibold text-lg rounded-full hover:bg-white hover:text-gray-900 transition-all">
                  Explore Collections
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Hero;
