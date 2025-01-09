"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@iconify/react";
import { useState } from "react";

export default function PickupScreen() {
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredFeature, setHoveredFeature] = useState(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const featureCardVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
    hover: {
      scale: 1.05,
      y: -10,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  };

  const iconVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20,
      },
    },
    hover: {
      scale: 1.2,
      rotate: 360,
      transition: {
        duration: 0.8,
        ease: "easeInOut",
      },
    },
  };

  const features = [
    {
      icon: "solar:clock-circle-bold",
      title: "24/7 Service",
      description: "Available round-the-clock for your convenience",
      gradient: "from-blue-400 to-purple-500",
    },
    {
      icon: "solar:shield-check-bold",
      title: "Safe & Secure",
      description: "Licensed drivers and insured vehicles",
      gradient: "from-emerald-400 to-teal-500",
    },
    {
      icon: "solar:globus-bold",
      title: "Multilingual Drivers",
      description: "English-speaking professional chauffeurs",
      gradient: "from-orange-400 to-pink-500",
    },
  ];

  return (
    <AnimatePresence>
      <div className="min-h-screen bg-gradient-to-b from-primary-900 via-primary-800 to-primary-700">
        <motion.section
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="container py-16 px-4 mx-auto md:py-24"
        >
          {/* Hero Section */}
          <div className="grid grid-cols-1 gap-12 items-center mb-20 lg:grid-cols-2">
            <motion.div variants={itemVariants} className="space-y-6">
              <motion.div
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="inline-block"
              >
                <div className="py-2 px-4 rounded-full border bg-primary-500/10 border-primary-400/20 backdrop-blur-sm">
                  <motion.span
                    animate={{ opacity: [1, 0.5, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="text-sm font-medium text-primary-300"
                  >
                    ✨ Welcome to Yogyakarta
                  </motion.span>
                </div>
              </motion.div>

              <motion.h1
                className="text-5xl font-bold md:text-6xl lg:text-7xl"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                      duration: 0.8,
                      ease: "easeOut",
                    },
                  },
                }}
              >
                <motion.span
                  className="text-transparent bg-clip-text bg-gradient-to-r from-accent-400 via-accent-300 to-accent-200"
                  animate={{ backgroundPosition: ["0%", "100%", "0%"] }}
                  transition={{ duration: 10, repeat: Infinity }}
                  style={{ backgroundSize: "200%" }}
                >
                  Premium Airport
                </motion.span>
                <br />
                <span className="text-white">Pickup Service</span>
              </motion.h1>

              <motion.p
                className="max-w-xl text-xl leading-relaxed text-primary-100/80"
                variants={itemVariants}
              >
                Experience the perfect start to your Jogja journey with our
                premium airport transfer service. Professional drivers, luxury
                vehicles, and seamless coordination.
              </motion.p>

              <motion.div
                className="flex flex-wrap gap-4"
                variants={itemVariants}
              >
                <motion.button
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 0 20px rgba(251, 146, 60, 0.3)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="overflow-hidden relative py-4 px-8 font-semibold text-white rounded-xl"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-accent-500 to-accent-400"
                    animate={{
                      backgroundPosition: ["0%", "100%", "0%"],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      repeatType: "reverse",
                    }}
                    style={{ backgroundSize: "200%" }}
                  />
                  <span className="relative">Book Your Pickup</span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="py-4 px-8 font-semibold rounded-xl border transition-colors text-primary-100 bg-primary-900/40 border-primary-400/20 backdrop-blur-sm hover:bg-primary-900/60"
                >
                  View Services
                </motion.button>
              </motion.div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="overflow-hidden relative rounded-2xl h-[500px] group"
              onHoverStart={() => setIsHovered(true)}
              onHoverEnd={() => setIsHovered(false)}
            >
              <Image
                src="/bandara.jpg"
                alt="Luxury Airport Transfer"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                priority
              />
            </motion.div>
          </div>

          {/* Features Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={featureCardVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                onHoverStart={() => setHoveredFeature(index)}
                onHoverEnd={() => setHoveredFeature(null)}
                className="overflow-hidden relative p-8 rounded-xl border bg-primary-900/40 border-primary-400/20 backdrop-blur-sm group"
              >
                <motion.div
                  className={`absolute inset-0 opacity-0 bg-gradient-to-br ${feature.gradient}`}
                  animate={{
                    opacity: hoveredFeature === index ? 0.1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                />

                <motion.div
                  variants={iconVariants}
                  className="flex justify-center items-center mb-6 w-16 h-16 rounded-2xl bg-primary-800/50"
                >
                  <Icon
                    icon={feature.icon}
                    className="w-8 h-8 transition-colors text-accent-400 group-hover:text-accent-300"
                  />
                </motion.div>

                <motion.div
                  variants={{
                    hover: {
                      transition: {
                        staggerChildren: 0.1,
                      },
                    },
                  }}
                  className="relative z-10"
                >
                  <motion.h3
                    variants={{
                      hover: { scale: 1.05, x: 5 },
                    }}
                    className="mb-3 text-2xl font-semibold text-white"
                  >
                    {feature.title}
                  </motion.h3>
                  <motion.p
                    variants={{
                      hover: { opacity: 0.9, x: 3 },
                    }}
                    className="text-lg text-primary-100/80"
                  >
                    {feature.description}
                  </motion.p>
                </motion.div>

                <motion.div
                  className="absolute -right-4 -bottom-4 w-24 h-24 bg-gradient-to-r rounded-full from-accent-400/20 to-accent-300/20 blur-md"
                  animate={{
                    scale: hoveredFeature === index ? 1.5 : 1,
                    opacity: hoveredFeature === index ? 1 : 0,
                  }}
                  transition={{ duration: 0.4 }}
                />
              </motion.div>
            ))}
          </motion.div>
        </motion.section>
      </div>
    </AnimatePresence>
  );
}
