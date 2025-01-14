"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";

// Define tour package types
interface TourPackage {
  id: number;
  name: string;
  price: number;
  duration: string;
  features: string[];
  isPopular?: boolean;
}

export default function ToursPricingScreen() {
  const [activeTourist, setActiveTourist] = useState<"local" | "international">(
    "local",
  );

  // Sample tour packages
  const localTourPackages: TourPackage[] = [
    {
      id: 1,
      name: "Jogja City Explore",
      price: 250000,
      duration: "1 Day",
      features: [
        "Visit 3 Historical Sites",
        "Local Transportation",
        "Lunch Included",
        "English Speaking Guide",
      ],
      isPopular: true,
    },
    // Add more local packages
  ];

  const internationalTourPackages: TourPackage[] = [
    {
      id: 1,
      name: "Comprehensive Jogja Tour",
      price: 750000,
      duration: "2 Days",
      features: [
        "Airport Pickup",
        "5 UNESCO Sites",
        "Luxury Transportation",
        "Professional Guide",
        "Meals & Accommodation",
      ],
      isPopular: true,
    },
    // Add more international packages
  ];

  const renderTourPackage = (pkg: TourPackage) => (
    <motion.div
      key={pkg.id}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className={`
        bg-white/10 backdrop-blur-md rounded-xl p-6 border border-primary-600/30 
        hover:border-primary-500 transition-all duration-300 
        ${pkg.isPopular ? "ring-2 ring-accent-500/50" : ""}
      `}
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-white">{pkg.name}</h3>
        {pkg.isPopular && (
          <span className="py-1 px-2 text-xs text-white rounded-full bg-accent-600">
            Most Popular
          </span>
        )}
      </div>
      <div className="mb-4 text-white">
        <span className="text-3xl font-bold">
          Rp {pkg.price.toLocaleString()}
        </span>
        <span className="ml-2 text-sm">/ {pkg.duration}</span>
      </div>
      <ul className="mb-6 space-y-2">
        {pkg.features.map((feature, index) => (
          <li key={index} className="flex items-center text-primary-200">
            <Icon icon="mdi:check-circle" className="mr-2 text-accent-500" />
            {feature}
          </li>
        ))}
      </ul>
      <button className="py-3 w-full text-white rounded-lg transition-colors bg-accent-600 hover:bg-accent-700">
        Book Now
      </button>
    </motion.div>
  );

  return (
    <section className="py-12 px-4 min-h-screen bg-gradient-to-b font-poppins from-primary-900 to-primary-800">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center text-white"
        >
          <h1 className="mb-4 text-4xl font-bold">
            Claris & City Tours Packages
          </h1>
          <p className="text-primary-200">
            Choose your perfect Jogja experience
          </p>
        </motion.div>

        {/* Tourist Type Selector */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex p-1 rounded-full bg-primary-800/50">
            {["local", "international"].map((type) => (
              <button
                key={type}
                onClick={() =>
                  setActiveTourist(type as "local" | "international")
                }
                className={`
                  px-6 py-2 rounded-full transition-all duration-300
                  ${
                    activeTourist === type
                      ? "bg-accent-600 text-white"
                      : "text-primary-200 hover:bg-primary-700"
                  }
                `}
              >
                {type === "local" ? "Local Tourist" : "International Tourist"}
              </button>
            ))}
          </div>
        </div>

        {/* Packages Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid gap-6 md:grid-cols-3"
        >
          {activeTourist === "local"
            ? localTourPackages.map(renderTourPackage)
            : internationalTourPackages.map(renderTourPackage)}
        </motion.div>
      </div>
    </section>
  );
}
