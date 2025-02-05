import { notFound } from "next/navigation";
import { format } from "date-fns";
import { blogPosts } from "@/lib/types/blog_data";
import BlogContent from "@/components/blog/BlogContent";
import { Icon } from "@iconify/react/dist/iconify.js";

// Type untuk params dan searchParams
type Params = Promise<{ slug: string }>;
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

// Fungsi untuk generateStaticParams
export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

// Fungsi untuk generateMetadata
export async function generateMetadata(props: {
  params: Params;
  searchParams: SearchParams;
}) {
  const params = await props.params;
  const { slug } = params;

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

// Komponen BlogPost
export default async function BlogPost(props: {
  params: Params;
  searchParams: SearchParams;
}) {
  // Await params untuk mendapatkan slug
  const params = await props.params;
  const { slug } = params;

  // Cari post berdasarkan slug
  const post = blogPosts.find((post) => post.slug === slug);

  // Jika post tidak ditemukan, tampilkan 404
  if (!post) {
    notFound();
  }

  return (
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
  );
}
