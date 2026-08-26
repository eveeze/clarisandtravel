import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { format } from "date-fns";
import { getBlogPosts, getBlogPostBySlug } from "@/lib/data";
import BlogContent from "@/components/blog/BlogContent";
import { Icon } from "@iconify/react/dist/iconify.js";

type Params = Promise<{ slug: string }>;

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata(props: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await props.params;
  const post = await getBlogPostBySlug(slug);
  if (!post) return { title: "Blog Post Not Found" };

  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blogs/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      images: [{ url: post.coverImage, alt: post.title }],
      publishedTime: post.date,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [post.coverImage],
    },
  };
}

export default async function BlogPost(props: { params: Params }) {
  const { slug } = await props.params;
  const post = await getBlogPostBySlug(slug);
  if (!post) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: post.coverImage,
    datePublished: post.date,
    author: { "@type": "Organization", name: "Claris and City Tour Jogja" },
    publisher: {
      "@type": "Organization",
      name: "Claris and City Tour Jogja",
    },
    mainEntityOfPage: `https://clarisandtravel.vercel.app/blogs/${post.slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article className="min-h-screen bg-gradient-to-b from-primary-900 via-primary-800 to-primary-700">
        <div
          className="relative bg-fixed bg-center bg-cover transition-all duration-500 ease-in-out h-[70vh]"
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
              <p className="text-2xl font-light leading-relaxed text-primary-100">
                {post.excerpt}
              </p>
            </div>
          </div>
        </div>
        <div className="container relative py-24 px-6 mx-auto -mt-20 max-w-4xl">
          <div className="bg-white rounded-2xl shadow-2xl">
            <BlogContent content={post.content} />
          </div>
        </div>
      </article>
    </>
  );
}
