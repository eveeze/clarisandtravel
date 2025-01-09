"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@iconify/react";
import Image from "next/image";

type Vehicle = {
  name: string;
  image: string;
  capacity: string;
  features: { icon: string; text: string }[];
  description: string;
  price: string;
};
const vehicles: Vehicle[] = [
  {
    name: "Toyota Calya",
    image: "/calya.png",
    capacity: "7 Seats",
    features: [
      { icon: "mdi:car-seat", text: "Comfortable Seating" },
      { icon: "mdi:air-conditioner", text: "Full AC" },
      { icon: "mdi:bag-checked", text: "Luggage Space" },
      { icon: "mdi:fuel", text: "Fuel Efficient" },
    ],
    description:
      "Perfect for small families and groups, offering comfort and efficiency for city tours.",
    price: "Start from IDR 450K/day",
  },
  {
    name: "Daihatsu Sigra",
    image: "/sigra.png",
    capacity: "7 Seats",
    features: [
      { icon: "mdi:car-seat", text: "Ergonomic Seats" },
      { icon: "mdi:air-conditioner", text: "Climate Control" },
      { icon: "mdi:car-speed-limiter", text: "Economic Drive" },
      { icon: "mdi:car-wireless", text: "Modern Features" },
    ],
    description:
      "Ideal for city exploration with excellent fuel economy and comfortable seating.",
    price: "Start from IDR 450K/day",
  },
  {
    name: "Toyota Avanza",
    image: "/avanza.png",
    capacity: "7 Seats",
    features: [
      { icon: "mdi:car-seat", text: "Premium Seats" },
      { icon: "mdi:car-door", text: "Easy Access" },
      { icon: "mdi:bag-suitcase", text: "Large Trunk" },
      { icon: "mdi:shield-car", text: "Enhanced Safety" },
    ],
    description:
      "A versatile MPV perfect for family tours and longer journeys around Jogja.",
    price: "Start from IDR 500K/day",
  },
  {
    name: "Daihatsu Xenia",
    image: "/xenia_bg.png",
    capacity: "7 Seats",
    features: [
      { icon: "mdi:car-seat", text: "Quality Seating" },
      { icon: "mdi:car-cruise-control", text: "Smooth Ride" },
      { icon: "mdi:car-child-seat", text: "Family Friendly" },
      { icon: "mdi:car-connected", text: "Modern Features" },
    ],
    description:
      "Reliable and spacious, great for both city tours and longer trips.",
    price: "Start from IDR 500K/day",
  },
  {
    name: "Toyota Hiace",
    image: "/hiace.png",
    capacity: "16 Seats",
    features: [
      { icon: "mdi:car-seat", text: "Spacious Seating" },
      { icon: "mdi:air-conditioner", text: "Dual Zone AC" },
      { icon: "mdi:bag-suitcase-outline", text: "Extra Storage" },
      { icon: "mdi:account-group", text: "Group Friendly" },
    ],
    description:
      "Ideal for larger groups, offering maximum comfort and space for extended tours.",
    price: "Start from IDR 1000K/day",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.6, -0.05, 0.01, 0.99],
    },
  },
};

export default function ArmadaScreen() {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [direction, setDirection] = useState<number>(0);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
    }),
  };

  const swipeConfidenceThreshold = 10000;

  const swipePower = (offset: number, velocity: number): number => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection: number): void => {
    setDirection(newDirection);
    setCurrentIndex(
      (prev) => (prev + newDirection + vehicles.length) % vehicles.length,
    );
  };

  return (
    <section className="flex items-center py-40 px-6 min-h-screen bg-gradient-to-b from-primary-700 to-primary-800">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
        className="container mx-auto"
      >
        <motion.h2
          variants={itemVariants}
          className="mb-20 text-5xl font-bold text-center md:text-6xl lg:text-7xl"
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-300 to-accent-400">
            Our Premium Fleet
          </span>
        </motion.h2>

        <div className="grid grid-cols-1 gap-16 w-full md:grid-cols-2">
          {/* Carousel Section */}
          <motion.div
            className="overflow-hidden relative p-6 rounded-3xl shadow-2xl h-[400px] group bg-primary-800/30 md:h-[500px] lg:h-[700px]"
            variants={itemVariants}
          >
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                  scale: { duration: 0.4 },
                }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={1}
                onDragEnd={(e, { offset, velocity }) => {
                  const swipe = swipePower(offset.x, velocity.x);
                  if (swipe < -swipeConfidenceThreshold) {
                    paginate(1);
                  } else if (swipe > swipeConfidenceThreshold) {
                    paginate(-1);
                  }
                }}
                className="absolute inset-0 w-full h-full"
              >
                <div className="relative w-full h-full">
                  <Image
                    src={vehicles[currentIndex].image}
                    fill
                    alt={vehicles[currentIndex].name}
                    className="object-contain w-full h-full transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t to-transparent from-primary-900/90" />
              </motion.div>
            </AnimatePresence>

            {/* Navigation controls */}
            <div className="flex absolute inset-x-0 bottom-6 z-20 justify-center p-4 space-x-3">
              {vehicles.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => {
                    setDirection(index > currentIndex ? 1 : -1);
                    setCurrentIndex(index);
                  }}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? "bg-accent-400 w-6"
                      : "bg-secondary-400/50 hover:bg-accent-400/50"
                  }`}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.8 }}
                />
              ))}
            </div>

            <motion.button
              className="absolute left-6 top-1/2 z-20 p-4 rounded-full opacity-100 transition-all duration-300 -translate-y-1/2 bg-accent-400/80 text-secondary-900"
              onClick={() => paginate(-1)}
              whileHover={{ scale: 1.1, backgroundColor: "rgb(251 146 60)" }}
              whileTap={{ scale: 0.9 }}
            >
              <Icon icon="mdi:chevron-left" width="32" />
            </motion.button>

            <motion.button
              className="absolute right-6 top-1/2 z-20 p-4 rounded-full opacity-100 transition-all duration-300 -translate-y-1/2 bg-accent-400/80 text-secondary-900"
              onClick={() => paginate(1)}
              whileHover={{ scale: 1.1, backgroundColor: "rgb(251 146 60)" }}
              whileTap={{ scale: 0.9 }}
            >
              <Icon icon="mdi:chevron-right" width="32" />
            </motion.button>
          </motion.div>

          {/* Details Section */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col justify-center p-8 space-y-8"
            >
              <motion.h3
                className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-accent-300 to-accent-400"
                layout
              >
                {vehicles[currentIndex].name}
              </motion.h3>

              <motion.div className="flex flex-col gap-2">
                <motion.div
                  className="flex items-center space-x-3 text-2xl text-secondary-100"
                  layout
                >
                  <Icon
                    icon="mdi:account-group"
                    className="text-accent-400"
                    width="32"
                  />
                  <span>Capacity: {vehicles[currentIndex].capacity}</span>
                </motion.div>
                <motion.div
                  className="flex items-center space-x-3 text-2xl text-secondary-100"
                  layout
                >
                  <Icon
                    icon="mdi:currency-usd"
                    className="text-accent-400"
                    width="32"
                  />
                  <span>{vehicles[currentIndex].price}</span>
                </motion.div>
              </motion.div>

              <motion.p
                className="text-xl leading-relaxed text-secondary-200"
                layout
              >
                {vehicles[currentIndex].description}
              </motion.p>

              <motion.div
                className="grid grid-cols-2 gap-4"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {vehicles[currentIndex].features.map((feature, i) => (
                  <motion.div
                    key={i}
                    className="flex items-center space-x-3 text-xl text-secondary-100"
                  >
                    <Icon icon={feature.icon} width="28" />
                    <span>{feature.text}</span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </section>
  );
}
