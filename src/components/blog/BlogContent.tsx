"use client";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";

const animationVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function BlogContent({ content }: { content: string }) {
  return (
    <motion.div
      variants={animationVariants}
      initial="hidden"
      animate="show"
      transition={{ duration: 0.5 }}
      className="prose-blog max-w-none"
    >
      <ReactMarkdown>{content}</ReactMarkdown>
    </motion.div>
  );
}
