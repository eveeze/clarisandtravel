import { notFound } from "next/navigation";
import { format } from "date-fns";
import { blogPosts } from "@/lib/types/blog_data";
import BlogContent from "@/components/blog/BlogContent";

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
  const post = blogPosts.find((post) => post.slug === params.slug);

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

export default function BlogPost({ params }: { params: { slug: string } }) {
  const post = blogPosts.find((post) => post.slug === params.slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="min-h-screen bg-white">
      <div
        className="relative bg-center bg-cover h-[60vh]"
        style={{ backgroundImage: `url(${post.coverImage})` }}
      >
        <div className="absolute inset-0 bg-black/60" />
        <div className="container flex relative z-10 items-center px-4 mx-auto max-w-4xl h-full">
          <div className="max-w-3xl">
            <div className="mb-4 text-sm font-medium text-primary">
              {format(new Date(post.date), "MMMM d, yyyy")}
            </div>
            <h1 className="mb-4 text-4xl font-bold text-white md:text-6xl">
              {post.title}
            </h1>
            <p className="text-xl text-gray-200">{post.excerpt}</p>
          </div>
        </div>
      </div>

      <div className="container py-16 px-4 mx-auto max-w-4xl">
        <BlogContent content={post.content} />
      </div>
    </article>
  );
}
