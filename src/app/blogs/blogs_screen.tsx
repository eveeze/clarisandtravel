import BlogList from "@/components/blog/BlogList";
import type { BlogPost } from "@/lib/types/blog_data";

export default function BlogsScreen({ posts }: { posts: BlogPost[] }) {
  return (
    <section className="min-h-screen bg-volcanic-900 pt-32 pb-24">
      <div className="px-6 mx-auto max-w-7xl lg:px-8">
        <div className="mb-14 text-center max-w-2xl mx-auto">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-gold-400">Blog</p>
          <h1 className="font-display text-4xl font-normal tracking-tight text-stone-50 md:text-6xl">
            Tips & Cerita Wisata Jogja
          </h1>
          <p className="mt-4 text-lg text-stone-400">Destinasi tersembunyi, kuliner, dan fakta menarik.</p>
        </div>
        <BlogList posts={posts} />
      </div>
    </section>
  );
}