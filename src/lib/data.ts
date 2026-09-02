import { prisma } from "./prisma";
import { getTenantFromHeaders } from "./tenant";
import { cacheGet, cacheSet, cacheKey } from "./cache";
import type { TourPackage } from "./types/tour_package";
import type { BlogPost } from "./types/blog_data";
import type { TouristSpot } from "./types/tourist_spots_data";
import { tourPackages as hardcodedPackages } from "./types/tour_package";
import { blogPosts as hardcodedBlogs } from "./types/blog_data";
import { touristSpots as hardcodedSpots } from "./types/tourist_spots_data";

export async function getTourPackages(): Promise<TourPackage[]> {
  try {
    const tenantId = await getTenantFromHeaders();
    const ck = cacheKey(tenantId, "tours");
    const cached = await cacheGet<TourPackage[]>(ck);
    if (cached) return cached;
    const rows = await prisma.tourPackage.findMany({
      where: { tenantId },
      include: { vehicles: true, itinerary: { include: { destinations: true }, orderBy: { day: "asc" } } },
      orderBy: { id: "asc" },
    });
    if (rows.length === 0) return hardcodedPackages;
    const mapped = rows.map((r) => ({
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
    await cacheSet(ck, mapped);
    return mapped;
  } catch {
    return hardcodedPackages;
  }
}

export async function getTourPackageBySlug(slug: string): Promise<TourPackage | undefined> {
  try {
    const tenantId = await getTenantFromHeaders();
    const row = await prisma.tourPackage.findFirst({
      where: { tenantId, slug },
      include: { vehicles: true, itinerary: { include: { destinations: true }, orderBy: { day: "asc" } } },
    });
    if (!row) return (await getTourPackages()).find((p) => p.slug === slug) ?? undefined;
    return {
      id: row.id,
      slug: row.slug,
      name: row.name,
      basePrice: row.basePrice,
      duration: row.duration,
      features: row.features,
      isPopular: row.isPopular,
      description: row.description,
      thumbnail: row.thumbnail,
      images: row.images,
      touristType: row.touristType as "local" | "international",
      vehicles: row.vehicles.map((v) => ({
        id: v.id,
        name: v.name,
        capacity: v.capacity,
        priceIncrement: v.priceIncrement,
        image: v.image,
        description: v.description ?? undefined,
        features: v.features ?? [],
        priceLabel: v.priceLabel ?? undefined,
      })),
      itinerary: row.itinerary.map((d) => ({
        day: d.day,
        title: d.title,
        destinations: d.destinations.map((x) => ({
          name: x.name,
          description: x.description,
          time: x.time,
        })),
      })),
    };
  } catch {
    const all = await getTourPackages();
    return all.find((p) => p.slug === slug);
  }
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    const tenantId = await getTenantFromHeaders();
    const ck = cacheKey(tenantId, "blogs");
    const cached = await cacheGet<BlogPost[]>(ck);
    if (cached) return cached;
    const rows = await prisma.blogPost.findMany({ where: { tenantId }, orderBy: { date: "desc" } });
    if (rows.length === 0) return hardcodedBlogs;
    const mapped = rows.map((r) => ({
      slug: r.slug,
      title: r.title,
      excerpt: r.excerpt,
      date: r.date.toISOString().split("T")[0],
      coverImage: r.coverImage,
      content: r.contentMd,
    }));
    await cacheSet(ck, mapped);
    return mapped;
  } catch {
    return hardcodedBlogs;
  }
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
  try {
    const tenantId = await getTenantFromHeaders();
    const row = await prisma.blogPost.findFirst({
      where: { tenantId, slug },
    });
    if (!row) return (await getBlogPosts()).find((b) => b.slug === slug) ?? undefined;
    return {
      slug: row.slug,
      title: row.title,
      excerpt: row.excerpt,
      date: row.date.toISOString().split("T")[0],
      coverImage: row.coverImage,
      content: row.contentMd,
    };
  } catch {
    const all = await getBlogPosts();
    return all.find((b) => b.slug === slug);
  }
}

export async function getTouristSpots(): Promise<TouristSpot[]> {
  try {
    const tenantId = await getTenantFromHeaders();
    const ck = cacheKey(tenantId, "spots");
    const cached = await cacheGet<TouristSpot[]>(ck);
    if (cached) return cached;
    const rows = await prisma.touristSpot.findMany({ where: { tenantId }, orderBy: { name: "asc" } });
    if (rows.length === 0) return hardcodedSpots;
    const mapped = rows.map((r) => ({
      id: r.slug,
      name: r.name,
      description: r.description,
      history: r.history ?? undefined,
      imageUrl: r.imageUrl,
      location: r.location ?? "",
      category: r.category ?? "",
    }));
    await cacheSet(ck, mapped);
    return mapped;
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
    const tenantId = await getTenantFromHeaders();
    const ck = cacheKey(tenantId, "gallery");
    const cached = await cacheGet<GalleryItem[]>(ck);
    if (cached) return cached;
    const rows = await prisma.galleryItem.findMany({
      where: { tenantId },
      orderBy: { sortOrder: "asc" },
    });
    const mapped = rows.map((r) => ({
      id: r.id,
      title: r.title,
      category: r.category,
      image: r.image,
      location: r.location ?? "",
      description: r.description ?? "",
    }));
    await cacheSet(ck, mapped);
    return mapped;
  } catch {
    return [];
  }
}

export type SiteContentKey = "hero" | "reason" | "pickup" | "promo" | "footer";

export async function getSiteContent<T = unknown>(key: SiteContentKey): Promise<T | null> {
  try {
    const tenantId = await getTenantFromHeaders();
    const ck = cacheKey(tenantId, `content:${key}`);
    const cached = await cacheGet<T>(ck);
    if (cached) return cached;
    const row = await prisma.siteContent.findFirst({ where: { tenantId, key } });
    const result = row ? (row.content as T) : null;
    if (result) await cacheSet(ck, result);
    return result;
  } catch {
    return null;
  }
}

export async function getSiteContents() {
  try {
    const tenantId = await getTenantFromHeaders();
    const ck = cacheKey(tenantId, "content:all");
    const cached = await cacheGet(ck);
    if (cached) return cached;
    const rows = await prisma.siteContent.findMany({ where: { tenantId } });
    await cacheSet(ck, rows);
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
    const tenantId = await getTenantFromHeaders();
    const ck = cacheKey(tenantId, "vehicles");
    const cached = await cacheGet<VehicleMarketing[]>(ck);
    if (cached) return cached;
    const rows = await prisma.vehicle.findMany({
      where: { tenantId },
      orderBy: { sortOrder: "asc" },
    });
    const mapped = rows.map((v) => ({
      id: v.id,
      name: v.name,
      capacity: v.capacity,
      image: v.image,
      description: v.description ?? "",
      features: v.features ?? [],
      priceLabel: v.priceLabel ?? "",
      sortOrder: v.sortOrder,
    }));
    await cacheSet(ck, mapped);
    return mapped;
  } catch {
    return [];
  }
}

export type PackageReview = {
  id: number;
  rating: number;
  comment: string;
  customerName: string;
  createdAt: Date;
};

export async function getPackageReviews(packageId: number): Promise<PackageReview[]> {
  // GAK di-cache — berisi field Date (createdAt) yang rusak saat JSON round-trip,
  // dan review jarang diakses. Selalu baca DB fresh biar aman & konsisten.
  try {
    const rows = await prisma.review.findMany({
      where: { packageId },
      include: { booking: { select: { name: true } } },
      orderBy: { createdAt: "desc" },
    });
    return rows.map((r) => ({
      id: r.id,
      rating: r.rating,
      comment: r.comment,
      customerName: r.booking.name,
      createdAt: r.createdAt,
    }));
  } catch {
    return [];
  }
}

export async function getPackageReviewsWithSummary(packageId: number) {
  const reviews = await getPackageReviews(packageId);
  if (reviews.length === 0) {
    return { reviews, summary: { count: 0, average: 0 } };
  }
  const average = reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length;
  return {
    reviews,
    summary: { count: reviews.length, average: Math.round(average * 10) / 10 },
  };
}
