"use client";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useState, useRef } from "react";
import Image from "next/image";
import { Experience } from "@/lib/types/experience_type";
const experiences = [
  {
    id: 1,
    url: "/images/borobudur.jpg",
    title: "Borobudur Sunrise",
    location: "Magelang",
    description:
      "Witness the magical sunrise at the world's largest Buddhist temple",
    category: "Cultural",
  },
  {
    id: 2,
    url: "/images/malioboro.jpg",
    title: "Malioboro Night Market",
    location: "Yogyakarta",
    description: "Experience the vibrant night life and local delicacies",
    category: "Urban",
  },
  {
    id: 3,
    url: "/images/prambanan.jpg",
    title: "Prambanan Temple",
    location: "Sleman",
    description: "Marvel at the ancient Hindu architecture",
    category: "Cultural",
  },
  {
    id: 4,
    url: "/images/jeep-merapi.jpg",
    title: "Merapi Jeep Tour",
    location: "Mount Merapi",
    description: "Adventure through volcanic landscapes",
    category: "Adventure",
  },
  {
    id: 5,
    url: "/images/goa-pindul.jpeg",
    title: "Pindul Cave Tubing",
    location: "Gunungkidul",
    description: "Float through stunning cave formations",
    category: "Adventure",
  },
  {
    id: 6,
    url: "/images/tugu.jpg",
    title: "Tugu Monument",
    location: "Yogyakarta",
    description: "Visit the iconic symbol of Yogyakarta",
    category: "Urban",
  },
];

const ImageCard = ({
  experience,
  index,
}: {
  experience: Experience;
  index: number;
}) => {
  const cardRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <motion.div
      ref={cardRef}
      style={{ y, scale, opacity }}
      className="relative group"
    >
      <div className="overflow-hidden relative rounded-2xl">
        <div className="absolute inset-0 z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-primary-900/20 backdrop-blur-[2px]" />
        <Image
          src={experience.url}
          alt={experience.title}
          width={800}
          height={600}
          className="object-cover w-full transition-transform duration-700 transform group-hover:scale-110 h-[70vh]"
        />
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileHover={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex absolute inset-0 z-20 flex-col justify-end p-8 bg-gradient-to-t to-transparent from-primary-900 via-primary-800/40"
        >
          <motion.span
            whileHover={{ scale: 1.05 }}
            className="py-1 px-4 text-sm font-medium rounded-full border bg-accent-400/20 text-accent-100 w-fit backdrop-blur-sm border-accent-400/20"
          >
            {experience.category}
          </motion.span>
          <motion.h3
            initial={{ x: -20 }}
            whileHover={{ x: 0 }}
            className="mt-4 text-3xl font-bold text-primary-50"
          >
            {experience.title}
          </motion.h3>
          <motion.p
            initial={{ x: -10 }}
            whileHover={{ x: 0 }}
            className="mt-2 text-lg text-primary-100"
          >
            {experience.location}
          </motion.p>
          <motion.p
            initial={{ opacity: 0.8 }}
            whileHover={{ opacity: 1 }}
            className="mt-2 text-primary-200/80"
          >
            {experience.description}
          </motion.p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default function GalleryScreen() {
  const containerRef = useRef(null);
  const [activeCategory, setActiveCategory] = useState("All");

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    damping: 20,
    stiffness: 100,
  });

  const categories = ["All", "Cultural", "Urban", "Adventure"];

  return (
    <section
      ref={containerRef}
      className="bg-gradient-to-b from-primary-900 via-primary-800 to-primary-700 font-poppins"
    >
      {/* Hero Section */}
      <div className="flex overflow-hidden relative flex-col justify-center justify-items-center items-center min-h-screen">
        <div className="absolute inset-0 z-0 bg-primary-900/40 backdrop-blur-sm" />
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b to-transparent opacity-90 from-primary-900 via-primary-900/50" />
          <Image
            src="/images/view_borobudur.jpg"
            alt="Hero Background"
            fill
            className="object-cover"
          />
        </div>

        <div className="relative z-10 py-20 px-4 mx-auto max-w-7xl">
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mb-12 text-6xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r md:text-8xl from-accent-300 via-accent-400 to-accent-500"
          >
            Travel Moments
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="mx-auto mb-12 max-w-2xl text-xl text-center text-primary-100"
          >
            Discover the enchanting moments captured during unforgettable
            journeys through Yogyakarta
          </motion.p>

          {/* Category Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-wrap gap-4 justify-center mt-8"
          >
            {categories.map((category) => (
              <motion.button
                key={category}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-2 rounded-full backdrop-blur-sm transition-all border ${
                  activeCategory === category
                    ? "bg-accent-500 text-white border-accent-400"
                    : "bg-primary-800/30 text-primary-100 border-primary-700/50 hover:bg-primary-700/50"
                }`}
              >
                {category}
              </motion.button>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Parallax Gallery */}
      <div className="py-16 px-4">
        <div className="grid grid-cols-1 gap-16 mx-auto max-w-7xl md:grid-cols-2">
          {/* Left Column */}
          <div className="space-y-32">
            {experiences
              .filter(
                (exp) =>
                  activeCategory === "All" || exp.category === activeCategory,
              )
              .filter((_, i) => i % 2 === 0)
              .map((exp, i) => (
                <ImageCard key={exp.id} experience={exp} index={i} />
              ))}
          </div>
          {/* Right Column */}
          <div className="mt-16 space-y-32 md:mt-32">
            {experiences
              .filter(
                (exp) =>
                  activeCategory === "All" || exp.category === activeCategory,
              )
              .filter((_, i) => i % 2 === 1)
              .map((exp, i) => (
                <ImageCard key={exp.id} experience={exp} index={i} />
              ))}
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <motion.div
        style={{
          scaleX: smoothProgress,
          transformOrigin: "left",
        }}
        className="fixed right-0 bottom-0 left-0 h-1 bg-accent-400"
      />
    </section>
  );
}
