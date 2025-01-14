import BlogList from "@/components/blog/BlogList";
import { blogPosts } from "@/lib/types/blog_data";

export const metadata = {
  title: "Travel Blog - Claris and City Tour Jogja",
  description:
    "Discover the best travel tips, hidden gems, and cultural insights about Yogyakarta through our curated travel blog.",
};

export default function BlogsScreen() {
  return (
    <section className=" min-h-screen p-32 mx-auto w-full bg-gradient-to-b from-primary-900 via-primary-800 to-primary-700">
      <BlogList posts={blogPosts} />
    </section>
  );
}
