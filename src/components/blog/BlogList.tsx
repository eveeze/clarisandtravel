"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { format } from "date-fns";
import { BlogPost } from "@/lib/types/blog_data";
import Image from "next/image";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.12 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export default function BlogList({ posts }: { posts: BlogPost[] }) {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
    >
      {posts.map((post) => (
        <motion.div key={post.slug} variants={item} className="flex flex-col h-full">
          <Link
            href={`/blogs/${post.slug}`}
            className="group block h-full overflow-hidden rounded-2xl bg-white border border-sand-200 hover:border-gold-400/30 transition-all"
          >
            <div className="relative aspect-[16/10] overflow-hidden">
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-volcanic-900 via-transparent to-transparent" />
            </div>
            <div className="p-6">
              <div className="flex gap-2 items-center mb-3 text-xs font-medium text-ink-9000">
                <Icon icon="mdi:calendar" className="w-4 h-4" />
                {format(new Date(post.date), "dd MMM yyyy")}
              </div>
              <h2 className="mb-3 font-display text-2xl text-ink-900 group-hover:text-gold-600 transition-colors">
                {post.title}
              </h2>
              <p className="text-sm text-ink-500 leading-relaxed line-clamp-3">{post.excerpt}</p>
            </div>
          </Link>
        </motion.div>
      ))}
    </motion.div>
  );
}
