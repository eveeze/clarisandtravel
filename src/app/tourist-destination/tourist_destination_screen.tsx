"use client";

import { motion } from "framer-motion";
import { TouristSpotScreen } from "@/components/TouristSpotScreen";
import type { TouristSpot } from "@/lib/types/tourist_spots_data";

export default function TouristAttractions({
  spots,
}: {
  spots: TouristSpot[];
}) {
  return (
    <section className="w-full bg-primary-900">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="w-full"
      >
        {spots.map((spotData, index) => (
          <TouristSpotScreen key={spotData.id} spot={spotData} index={index} />
        ))}
      </motion.div>
    </section>
  );
}
