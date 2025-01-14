"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { format } from "date-fns";
import { BlogPost } from "@/lib/types/blog_data";
import Image from "next/image";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

// BlogList Component
export default function BlogList({ posts }: { posts: BlogPost[] }) {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
    >
      {posts.map((post) => (
        <motion.div
          key={post.slug}
          variants={item}
          className="flex flex-col h-full"
        >
          <Link
            href={`/blogs/${post.slug}`}
            className="block overflow-hidden bg-white rounded-2xl shadow-lg transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 group h-full"
          >
            <div className="overflow-hidden aspect-[16/9]">
              <motion.div className="relative w-full h-full">
                <Image
                  src={post.coverImage}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority
                />
              </motion.div>
            </div>
            <div className="p-8 flex flex-col flex-grow">
              <div className="flex gap-2 items-center mb-4 text-sm  font-medium text-gray-500">
                <Icon icon="mdi:calendar" className="w-5 h-5" />
                {format(new Date(post.date), "MMMM d, yyyy")}
              </div>
              <h2 className="mb-4 text-2xl font-bold text-gray-900 transition-colors duration-300 group-hover:text-primary-600 font-display">
                {post.title}
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed flex-grow">
                {post.excerpt}
              </p>
            </div>
          </Link>
        </motion.div>
      ))}
    </motion.div>
  );
}
