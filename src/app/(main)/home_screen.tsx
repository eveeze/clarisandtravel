"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import ReasonScreen from "./reason_screen";
import ArmadaScreen from "./armada_screen";
import HeroScreen from "./hero_screen";

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
    <main className="min-h-screen">
      <HeroScreen />
      <ArmadaScreen />
      <ReasonScreen />
    </main>
  );
}
