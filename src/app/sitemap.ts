import type { MetadataRoute } from "next";
import { getTourPackages, getBlogPosts, getTouristSpots } from "@/lib/data";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://clarisandtravel.vercel.app";

  const [packages, blogs, spots] = await Promise.all([getTourPackages(), getBlogPosts(), getTouristSpots()]);

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/tours-pricing`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/tourist-destination`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/gallery`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/blogs`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
    { url: `${baseUrl}/cek-booking`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/profile`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
  ];

  const packageRoutes: MetadataRoute.Sitemap = packages.map((p) => ({
    url: `${baseUrl}/tours-pricing/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  const blogRoutes: MetadataRoute.Sitemap = blogs.map((b) => ({
    url: `${baseUrl}/blogs/${b.slug}`,
    lastModified: new Date(b.date),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const spotRoutes: MetadataRoute.Sitemap = spots.map((s) => ({
    url: `${baseUrl}/tourist-destination/${s.id}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...packageRoutes, ...blogRoutes, ...spotRoutes];
}
