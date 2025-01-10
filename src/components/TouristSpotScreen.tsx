import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import { TouristSpot } from "@/lib/types/touris_spot_types";
interface TouristSpotScreenProps {
  spot: TouristSpot;
  index: number;
}

export const TouristSpotScreen: React.FC<TouristSpotScreenProps> = ({
  spot,
  index,
}) => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <div
      id={spot.id}
      className="overflow-hidden relative w-full h-screen snap-start"
      style={{
        backgroundImage: `url(${spot.imageUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/70"
      />

      <motion.div
        variants={staggerChildren}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="flex absolute inset-0 justify-center items-center px-4"
      >
        <div className="w-full max-w-4xl">
          <motion.div
            variants={fadeInUp}
            className="flex items-center mb-4 space-x-2 text-white/80"
          >
            <Icon icon="mdi:map-marker" className="w-5 h-5" />
            <span className="text-sm font-medium">{spot.location}</span>
          </motion.div>

          <motion.h2
            variants={fadeInUp}
            className="mb-6 text-6xl font-bold leading-tight text-white"
          >
            {spot.name}
          </motion.h2>

          <motion.div
            variants={fadeInUp}
            className="p-8 text-white rounded-xl bg-black/40 backdrop-blur-md"
          >
            <motion.div
              variants={fadeInUp}
              className="flex items-start mb-6 space-x-4"
            >
              <Icon
                icon="mdi:information"
                className="flex-shrink-0 mt-1 w-6 h-6"
              />
              <p className="text-lg leading-relaxed">{spot.description}</p>
            </motion.div>

            {spot.history && (
              <motion.div
                variants={fadeInUp}
                className="flex items-start pt-6 space-x-4 border-t border-white/10"
              >
                <Icon
                  icon="mdi:clock-outline"
                  className="flex-shrink-0 mt-1 w-6 h-6"
                />
                <div>
                  <h3 className="mb-2 text-xl font-semibold">History</h3>
                  <p className="text-lg leading-relaxed text-white/90">
                    {spot.history}
                  </p>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="absolute bottom-8 left-1/2 text-white transform -translate-x-1/2"
      >
        <motion.div
          animate={{
            y: [0, 10, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="cursor-pointer"
        >
          <Icon icon="mdi:chevron-down" className="w-8 h-8" />
        </motion.div>
      </motion.div>
    </div>
  );
};
