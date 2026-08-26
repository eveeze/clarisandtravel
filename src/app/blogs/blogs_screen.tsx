import BlogList from "@/components/blog/BlogList";
import type { BlogPost } from "@/lib/types/blog_data";

export default function BlogsScreen({ posts }: { posts: BlogPost[] }) {
  return (
    <section className=" min-h-screen p-32 mx-auto w-full bg-gradient-to-b from-primary-900 via-primary-800 to-primary-700">
      <BlogList posts={posts} />
    </section>
  );
}
