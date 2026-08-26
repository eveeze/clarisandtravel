import BlogList from "@/components/blog/BlogList";
import type { BlogPost } from "@/lib/types/blog_data";

export default function BlogsScreen({ posts }: { posts: BlogPost[] }) {
  return (
    <section className="min-h-screen bg-ivory pt-28 pb-20">
      <div className="px-4 mx-auto max-w-7xl sm:px-6">
        <div className="mb-12 text-center max-w-2xl mx-auto">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-teak-500">
            Blog
          </p>
          <h1 className="font-display text-4xl font-bold text-ink-900 md:text-5xl">
            Tips & Cerita Wisata Jogja
          </h1>
          <p className="mt-3 text-lg text-ink-500">
            Destinasi tersembunyi, kuliner, dan fakta menarik seputar Yogyakarta.
          </p>
        </div>
        <BlogList posts={posts} />
      </div>
    </section>
  );
}
