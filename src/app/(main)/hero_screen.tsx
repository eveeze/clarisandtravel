import { motion } from "framer-motion";
import Link from "next/link"; // Import Link
import Image from "next/image"; // Import Image

// Define your animation variants here
const stagger = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const fadeInRight = {
  initial: { opacity: 0, x: 50 },
  animate: { opacity: 1, x: 0 },
};

const heroImageAnimation = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
};

export default function HeroScreen() {
  return (
    <>
      {/* Hero Section */}
      <section className="grid relative items-center min-h-screen bg-gradient-to-t md:grid-cols-2 from-primary-900 to-primary-800">
        <motion.div
          className="flex relative flex-col justify-center py-20 px-6 mx-auto md:py-0 md:pl-12 lg:pl-20"
          variants={stagger}
          initial="initial"
          animate="animate"
        >
          <motion.h1
            className="mb-6 text-4xl font-bold md:text-5xl lg:text-6xl text-accent-300"
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
            gems with your personal guide.
          </motion.p>

          <motion.div
            className="flex flex-col gap-4 sm:flex-row"
            variants={fadeInRight}
          >
            <Link href="/private-tour" passHref>
              <motion.button
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 10px 20px rgba(251, 146, 60, 0.2)",
                }}
                whileTap={{ scale: 0.95 }}
                className="py-4 px-8 text-lg font-medium rounded-lg transition-all bg-accent-400 text-secondary-900 hover:bg-accent-500"
                aria-label="Book Private Tour"
              >
                Book Private Tour Now!!!
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          className="overflow-hidden relative md:min-h-screen min-h-[400px]"
          variants={heroImageAnimation}
          initial="initial"
          animate="animate"
        >
          <Image
            src="/hero.png"
            alt="Jogja Landscape"
            width={800}
            height={800}
            className="object-cover mt-32 rounded-bl-[80px]" // Use object-cover in className
            priority
          />
        </motion.div>
      </section>
    </>
  );
}
