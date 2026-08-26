import type { Metadata } from "next";
import { getBlogPosts } from "@/lib/data";
import BlogsScreen from "./blogs_screen";

export const metadata: Metadata = {
  title: "Blog Wisata Jogja",
  description:
    "Artikel dan tips wisata Jogja dari Claris and City Tour: destinasi tersembunyi, kuliner, dan fakta menarik seputar Yogyakarta.",
  alternates: {
    canonical: "/blogs",
  },
};

export default async function BlogsPage() {
  const posts = await getBlogPosts();
  return <BlogsScreen posts={posts} />;
}
