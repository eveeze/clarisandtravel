"use client";
import { motion } from "framer-motion";

interface ReasonCardProps {
  title: string;
  description: string;
  index: number;
}

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] },
};

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const reasons = [
  {
    title: "Local Expertise",
    description:
      "Our guides are Jogja natives with deep knowledge of the city's history, culture, and hidden gems.",
  },
  {
    title: "Personalized Experience",
    description:
      "We tailor each tour to your interests, ensuring you get the most out of your Jogja adventure.",
  },
  {
    title: "Convenience",
    description:
      "From airport pickup to restaurant recommendations, we handle all the details so you can focus on enjoying your trip.",
  },
  {
    title: "Best Value",
    description:
      "Competitive pricing with no hidden fees, plus exclusive access to local experiences you won't find elsewhere.",
  },
];

const ReasonCard = ({ title, description, index }: ReasonCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      },
    }}
    whileHover={{
      scale: 1.02,
      transition: {
        duration: 0.2,
        ease: "easeInOut",
      },
    }}
    className="overflow-hidden relative group"
    viewport={{ once: true }}
  >
    <div className="p-8 bg-gradient-to-br rounded-2xl border shadow-lg transition-all duration-300 hover:shadow-2xl from-primary-900/80 to-primary-800/80 backdrop-blur-sm border-primary-700/50">
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 from-accent-400/10" />

      {/* Content */}
      <div className="relative z-10">
        <div className="flex items-center mb-4">
          <span className="flex justify-center items-center mr-4 w-8 h-8 text-sm font-medium rounded-full bg-accent-400/20 text-accent-300">
            {index + 1}
          </span>
          <h3 className="text-2xl font-bold transition-colors duration-300 text-accent-300 group-hover:text-accent-200">
            {title}
          </h3>
        </div>
        <p className="leading-relaxed transition-colors duration-300 text-secondary-100 group-hover:text-secondary-50">
          {description}
        </p>
      </div>
    </div>
  </motion.div>
);

export default function ReasonScreen() {
  return (
    <section className="py-20 px-6 bg-gradient-to-t from-primary-900 to-primary-800">
      <div className="mx-auto max-w-screen-xl">
        <motion.div
          variants={stagger}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <motion.h2
            variants={fadeInUp}
            className="mb-6 text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r md:text-5xl from-accent-300 to-accent-400"
          >
            Why Choose Claris and City Tour Jogja?
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="mx-auto max-w-2xl text-lg text-secondary-100"
          >
            Let us be your gateway to experiencing the true essence of
            Yogyakarta
          </motion.p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2">
          {reasons.map((reason, index) => (
            <ReasonCard
              key={index}
              title={reason.title}
              description={reason.description}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
