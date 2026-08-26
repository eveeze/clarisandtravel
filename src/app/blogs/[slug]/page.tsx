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
      <article className="min-h-screen bg-ivory">
        <div
          className="relative bg-fixed bg-center bg-cover h-[70vh]"
          style={{ backgroundImage: `url(${post.coverImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/40 to-forest-950/30" />
          <div className="container flex relative z-10 items-end px-6 mx-auto max-w-5xl h-full pb-14">
            <div className="max-w-3xl animate-fade-in">
              <div className="flex gap-2 items-center mb-4 text-sm font-medium text-sand-200">
                <Icon icon="mdi:calendar" className="w-5 h-5" />
                {format(new Date(post.date), "MMMM d, yyyy")}
              </div>
              <h1 className="mb-4 font-display text-4xl font-bold text-ivory md:text-5xl">
                {post.title}
              </h1>
              <p className="text-xl font-light leading-relaxed text-sand-200">
                {post.excerpt}
              </p>
            </div>
          </div>
        </div>
        <div className="container relative px-6 py-16 mx-auto max-w-4xl">
          <div className="bg-ivory">
            <BlogContent content={post.content} />
          </div>
        </div>
      </article>
    </>
  );
}
