import BlogList from "@/components/blog/BlogList";
import { blogPosts } from "@/lib/types/blog_data";

export const metadata = {
  title: "Travel Blog - Claris and City Tour Jogja",
  description:
    "Discover the best travel tips, hidden gems, and cultural insights about Yogyakarta through our curated travel blog.",
};

export default function BlogsScreen() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-primary-900 via-primary-800 to-primary-700">
      <section className="relative h-[100vh] bg-[url('https://images.unsplash.com/photo-1584810359583-96fc3448beaa')] bg-cover bg-center">
        <div className="absolute inset-0 bg-black/50" />
        <div className="container flex relative z-10 items-center px-4 mx-auto max-w-7xl h-full">
          <div className="max-w-2xl">
            <h1 className="mb-4 text-5xl font-bold text-white">
              Travel Stories & Insights
            </h1>
            <p className="text-lg text-gray-200">
              Discover the magic of Yogyakarta through our travel stories, local
              insights, and expert recommendations.
            </p>
          </div>
        </div>
      </section>

      <section className="container py-16 px-4 mx-auto max-w-7xl">
        <BlogList posts={blogPosts} />
      </section>
    </main>
  );
}
