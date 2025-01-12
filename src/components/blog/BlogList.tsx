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

export default function BlogList({ posts }: { posts: BlogPost[] }) {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
    >
      {posts.map((post) => (
        <motion.div key={post.slug} variants={item}>
          <Link
            href={`/blogs/${post.slug}`}
            className="block overflow-hidden bg-white rounded-2xl shadow-lg transition-all hover:shadow-xl group"
          >
            <div className="overflow-hidden aspect-[16/9]">
              <motion.div className="relative w-full h-full">
                <Image
                  src={post.coverImage}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                  priority
                />
              </motion.div>
            </div>
            <div className="p-6 bg-white">
              <div className="flex gap-2 items-center mb-4 text-sm text-gray-600">
                <Icon icon="mdi:calendar-outline" className="w-4 h-4" />
                {format(new Date(post.date), "MMMM d, yyyy")}
              </div>
              <h2 className="mb-2 text-xl font-bold text-gray-900 transition-colors group-hover:text-primary-500">
                {post.title}
              </h2>
              <p className="text-gray-700">{post.excerpt}</p>
            </div>
          </Link>
        </motion.div>
      ))}
    </motion.div>
  );
}
