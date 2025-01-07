"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] },
};

const fadeInRight = {
  initial: { opacity: 0, x: -60 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] },
};

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const heroImageAnimation = {
  initial: { scale: 1.2, opacity: 0 },
  animate: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 1.2,
      ease: [0.6, -0.05, 0.01, 0.99],
    },
  },
};

export default function HomeScreen() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-primary-900 to-primary-800">
      {/* Hero Section */}
      <section className="grid relative items-center min-h-screen md:grid-cols-2">
        <motion.div
          className="flex relative flex-col justify-center py-20 px-6 md:py-0 md:pl-12 lg:pl-20"
          variants={stagger}
          initial="initial"
          animate="animate"
        >
          <motion.h1
            className="mb-6 text-4xl font-bold md:text-6xl lg:text-7xl text-accent-300"
            variants={fadeInRight}
          >
            Discover the
            <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-accent-300 to-accent-400">
              Magic of Yogyakarta
            </span>
          </motion.h1>

          <motion.p
            className="mb-8 max-w-xl text-lg md:text-xl text-secondary-100"
            variants={fadeInRight}
          >
            Experience authentic cultural tours, majestic temples, and hidden
            gems with your personal guide
          </motion.p>

          <motion.div
            className="flex flex-col gap-4 sm:flex-row"
            variants={fadeInRight}
          >
            <Link href="/private-tour">
              <motion.button
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 10px 20px rgba(251, 146, 60, 0.2)",
                }}
                whileTap={{ scale: 0.95 }}
                className="py-4 px-8 text-lg font-medium rounded-lg transition-all bg-accent-400 text-secondary-900 hover:bg-accent-500"
              >
                Book Private Tour
              </motion.button>
            </Link>

            <Link href="/group-tour">
              <motion.button
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 10px 20px rgba(251, 146, 60, 0.1)",
                }}
                whileTap={{ scale: 0.95 }}
                className="py-4 px-8 text-lg font-medium rounded-lg border-2 transition-all border-accent-400 text-accent-400 hover:bg-accent-400/10"
              >
                Join Group Tour
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          className="overflow-hidden relative h-full md:min-h-screen min-h-[400px]"
          variants={heroImageAnimation}
          initial="initial"
          animate="animate"
        >
          <Image
            src="/hero.png"
            alt="Jogja Landscape"
            objectFit="cover"
            width={800}
            height={800}
            className="mt-32 rounded-bl-[80px]"
            priority
          />
        </motion.div>
      </section>

      {/* Featured Tours Section */}
      <motion.section
        className="py-20 px-6"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto">
          <motion.h2
            className="mb-12 text-3xl font-bold text-center text-accent-300"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Popular Tours
          </motion.h2>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {["Borobudur Sunrise", "City Heritage", "Food Adventure"].map(
              (tour, index) => (
                <motion.div
                  key={tour}
                  className="overflow-hidden rounded-xl transition-all hover:shadow-2xl group bg-primary-800/50"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -5 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="overflow-hidden relative h-48">
                    <Image
                      src={`/tour-${index + 1}.jpg`}
                      alt={tour}
                      layout="fill"
                      objectFit="cover"
                      className="transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="mb-2 text-xl font-bold text-accent-300">
                      {tour}
                    </h3>
                    <p className="mb-4 text-secondary-200">
                      Experience the best of Jogja with our expert guides
                    </p>
                    <Link
                      href="/private-tour"
                      className="flex items-center font-medium transition-colors text-accent-400 hover:text-accent-300"
                    >
                      Learn more
                      <motion.span
                        className="ml-1"
                        initial={{ x: 0 }}
                        whileHover={{ x: 5 }}
                      >
                        →
                      </motion.span>
                    </Link>
                  </div>
                </motion.div>
              ),
            )}
          </div>
        </div>
      </motion.section>
    </main>
  );
}
