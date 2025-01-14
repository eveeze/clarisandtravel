import { notFound } from "next/navigation";
import { format } from "date-fns";
import { blogPosts } from "@/lib/types/blog_data";
import BlogContent from "@/components/blog/BlogContent";
import { Icon } from "@iconify/react/dist/iconify.js";
// generateStaticParams untuk menentukan slug dari setiap post
export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params;

  const post = blogPosts.find((post) => post.slug === slug);

  if (!post) {
    return {
      title: "Blog Post Not Found",
    };
  }

  return {
    title: `${post.title} - Claris and City Tour Jogja`,
    description: post.excerpt,
  };
}

// BlogPost Component
export default async function BlogPost({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params;
  const post = blogPosts.find((post) => post.slug === slug);

  if (!post) {
    notFound();
    return null;
  }

  return (
    <article className="min-h-screen bg-gradient-to-b from-primary-900 via-primary-800 to-primary-700">
      <div
        className="relative bg-center bg-cover bg-fixed h-[70vh] transition-all duration-500 ease-in-out"
        style={{ backgroundImage: `url(${post.coverImage})` }}
      >
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
        <div className="container flex relative z-10 items-center px-6 mx-auto max-w-5xl h-full">
          <div className="max-w-3xl animate-fade-in">
            <div className="flex gap-2 items-center mb-6 text-sm font-medium text-primary-100">
              <Icon icon="mdi:calendar" className="w-5 h-5" />
              {format(new Date(post.date), "MMMM d, yyyy")}
            </div>
            <h1 className="mb-6 text-5xl font-bold text-white md:text-7xl font-display">
              {post.title}
            </h1>
            <p className="text-2xl font-light text-primary-100 leading-relaxed">
              {post.excerpt}
            </p>
          </div>
        </div>
      </div>

      <div className="container relative py-24 px-6 mx-auto max-w-4xl -mt-20">
        <div className="bg-white rounded-2xl shadow-2xl">
          <BlogContent content={post.content} />
        </div>
      </div>
    </article>
  );
}
