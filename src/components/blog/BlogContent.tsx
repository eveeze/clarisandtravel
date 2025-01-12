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
      className="max-w-none prose prose-lg prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-primary prose-strong:text-gray-900"
    >
      <div className="p-5 card">
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>{" "}
    </motion.div>
  );
}
