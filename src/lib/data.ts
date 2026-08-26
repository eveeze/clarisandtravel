import { prisma } from "./prisma";
import type { TourPackage } from "./types/tour_package";
import type { BlogPost } from "./types/blog_data";
import type { TouristSpot } from "./types/tourist_spots_data";
import { tourPackages as hardcodedPackages } from "./types/tour_package";
import { blogPosts as hardcodedBlogs } from "./types/blog_data";
import { touristSpots as hardcodedSpots } from "./types/tourist_spots_data";

export async function getTourPackages(): Promise<TourPackage[]> {
  try {
    const rows = await prisma.tourPackage.findMany({
      include: { vehicles: true, itinerary: { include: { destinations: true }, orderBy: { day: "asc" } } },
      orderBy: { id: "asc" },
    });
    if (rows.length === 0) return hardcodedPackages;
    return rows.map((r) => ({
      id: r.id,
      slug: r.slug,
      name: r.name,
      basePrice: r.basePrice,
      duration: r.duration,
      features: r.features,
      isPopular: r.isPopular,
      description: r.description,
      thumbnail: r.thumbnail,
      images: r.images,
      touristType: r.touristType as "local" | "international",
      vehicles: r.vehicles.map((v) => ({
        id: v.id,
        name: v.name,
        capacity: v.capacity,
        priceIncrement: v.priceIncrement,
        image: v.image,
        description: v.description ?? undefined,
        features: v.features ?? [],
        priceLabel: v.priceLabel ?? undefined,
      })),
      itinerary: r.itinerary.map((d) => ({
        day: d.day,
        title: d.title,
        destinations: d.destinations.map((x) => ({
          name: x.name,
          description: x.description,
          time: x.time,
        })),
      })),
    }));
  } catch {
    return hardcodedPackages;
  }
}

export async function getTourPackageBySlug(slug: string): Promise<TourPackage | undefined> {
  const all = await getTourPackages();
  return all.find((p) => p.slug === slug);
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    const rows = await prisma.blogPost.findMany({ orderBy: { date: "desc" } });
    if (rows.length === 0) return hardcodedBlogs;
    return rows.map((r) => ({
      slug: r.slug,
      title: r.title,
      excerpt: r.excerpt,
      date: r.date.toISOString().split("T")[0],
      coverImage: r.coverImage,
      content: r.contentMd,
    }));
  } catch {
    return hardcodedBlogs;
  }
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
  const all = await getBlogPosts();
  return all.find((b) => b.slug === slug);
}

export async function getTouristSpots(): Promise<TouristSpot[]> {
  try {
    const rows = await prisma.touristSpot.findMany({ orderBy: { name: "asc" } });
    if (rows.length === 0) return hardcodedSpots;
    return rows.map((r) => ({
      id: r.slug,
      name: r.name,
      description: r.description,
      history: r.history ?? undefined,
      imageUrl: r.imageUrl,
      location: r.location ?? "",
      category: r.category ?? "",
    }));
  } catch {
    return hardcodedSpots;
  }
}

export type GalleryItem = {
  id: number;
  title: string;
  category: string;
  image: string;
  location: string;
  description: string;
};

export async function getGalleryItems(): Promise<GalleryItem[]> {
  try {
    const rows = await prisma.galleryItem.findMany({
      orderBy: { sortOrder: "asc" },
    });
    return rows.map((r) => ({
      id: r.id,
      title: r.title,
      category: r.category,
      image: r.image,
      location: r.location ?? "",
      description: r.description ?? "",
    }));
  } catch {
    return [];
  }
}

export type SiteContentKey = "hero" | "reason" | "pickup" | "promo" | "footer";

export async function getSiteContent<T = unknown>(
  key: SiteContentKey,
): Promise<T | null> {
  try {
    const row = await prisma.siteContent.findUnique({ where: { key } });
    return row ? (row.content as T) : null;
  } catch {
    return null;
  }
}

export async function getSiteContents() {
  try {
    const rows = await prisma.siteContent.findMany();
    return rows;
  } catch {
    return [];
  }
}

export type VehicleMarketing = {
  id: number;
  name: string;
  capacity: string;
  image: string;
  description: string;
  features: string[];
  priceLabel: string;
  sortOrder: number;
};

export async function getVehiclesMarketing(): Promise<VehicleMarketing[]> {
  try {
    const rows = await prisma.vehicle.findMany({
      orderBy: { sortOrder: "asc" },
    });
    return rows.map((v) => ({
      id: v.id,
      name: v.name,
      capacity: v.capacity,
      image: v.image,
      description: v.description ?? "",
      features: v.features ?? [],
      priceLabel: v.priceLabel ?? "",
      sortOrder: v.sortOrder,
    }));
  } catch {
    return [];
  }
}