"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
export default function TourPromoScreen() {
  return (
    <>
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
                      width={400}
                      height={400}
                      alt={tour}
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
    </>
  );
}
