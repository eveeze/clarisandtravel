import { describe, it, expect, vi, beforeEach } from "vitest";
import { prisma } from "@/lib/prisma";
import {
  getTourPackages,
  getBlogPosts,
  getTouristSpots,
  getGalleryItems,
  getVehiclesMarketing,
  getSiteContent,
} from "@/lib/data";

vi.mock("@/lib/prisma", () => ({
  prisma: {
    tourPackage: { findMany: vi.fn() },
    blogPost: { findMany: vi.fn(), findUnique: vi.fn() },
    touristSpot: { findMany: vi.fn() },
    galleryItem: { findMany: vi.fn() },
    vehicle: { findMany: vi.fn(), update: vi.fn(), updateMany: vi.fn() },
    siteContent: { findUnique: vi.fn(), findMany: vi.fn(), update: vi.fn() },
    booking: { create: vi.fn(), findMany: vi.fn(), update: vi.fn(), delete: vi.fn(), count: vi.fn() },
    adminUser: { findUnique: vi.fn(), findMany: vi.fn(), upsert: vi.fn() },
  },
}));

const mockPackage = {
  id: 1,
  slug: "jogja-city-explore",
  name: "Jogja City Explore",
  basePrice: 250000,
  duration: "1 Day",
  features: ["Lunch Included"],
  isPopular: true,
  description: "desc",
  thumbnail: "/tugu.jpg",
  images: ["/borobudur.jpg"],
  touristType: "local",
  createdAt: new Date(),
  updatedAt: new Date(),
  vehicles: [{ id: 1, name: "Sigra", capacity: "7", priceIncrement: 0, image: "/sigra.png" }],
  itinerary: [
    {
      day: 1,
      title: "Historical",
      packageId: 1,
      destinations: [{ id: 1, itineraryId: 1, name: "Kraton", description: "palace", time: "09:00" }],
    },
  ],
};

describe("data layer", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("getTourPackages", () => {
    it("returns mapped packages from DB", async () => {
      vi.mocked(prisma.tourPackage.findMany).mockResolvedValue([mockPackage as never]);
      const result = await getTourPackages();
      expect(result).toHaveLength(1);
      expect(result[0]).toMatchObject({
        slug: "jogja-city-explore",
        basePrice: 250000,
        touristType: "local",
      });
      expect(result[0].vehicles[0].name).toBe("Sigra");
      expect(result[0].itinerary[0].destinations[0].name).toBe("Kraton");
    });

    it("falls back to hardcoded when DB returns empty", async () => {
      vi.mocked(prisma.tourPackage.findMany).mockResolvedValue([]);
      const result = await getTourPackages();
      expect(result.length).toBeGreaterThan(0);
      expect(result[0].slug).toBe("jogja-city-explore");
    });

    it("falls back to hardcoded when DB throws", async () => {
      vi.mocked(prisma.tourPackage.findMany).mockRejectedValue(new Error("db down"));
      const result = await getTourPackages();
      expect(result.length).toBeGreaterThan(0);
    });
  });

  describe("getBlogPosts", () => {
    it("maps DB rows to BlogPost", async () => {
      vi.mocked(prisma.blogPost.findMany).mockResolvedValue([
        {
          id: 1,
          slug: "hidden-gems",
          title: "Hidden Gems",
          excerpt: "excerpt",
          contentMd: "# content",
          coverImage: "/img.jpg",
          date: new Date("2024-03-12"),
          createdAt: new Date(),
          updatedAt: new Date(),
        } as never,
      ]);
      const result = await getBlogPosts();
      expect(result[0].date).toBe("2024-03-12");
      expect(result[0].content).toBe("# content");
    });
  });

  describe("getTouristSpots", () => {
    it("maps slug to id", async () => {
      vi.mocked(prisma.touristSpot.findMany).mockResolvedValue([
        {
          id: 1,
          slug: "borobudur",
          name: "Borobudur",
          description: "temple",
          history: "built 850",
          category: "Temple",
          imageUrl: "/borobudur.jpg",
          location: "Magelang",
        } as never,
      ]);
      const result = await getTouristSpots();
      expect(result[0].id).toBe("borobudur");
      expect(result[0].history).toBe("built 850");
    });
  });

  describe("getGalleryItems", () => {
    it("returns empty array on empty DB", async () => {
      vi.mocked(prisma.galleryItem.findMany).mockResolvedValue([]);
      expect(await getGalleryItems()).toEqual([]);
    });
  });

  describe("getVehiclesMarketing", () => {
    it("includes marketing fields", async () => {
      vi.mocked(prisma.vehicle.findMany).mockResolvedValue([
        {
          id: 1,
          name: "Toyota Calya",
          capacity: "7 Seats",
          priceIncrement: 0,
          image: "/calya.png",
          description: "desc",
          features: ["Full AC"],
          priceLabel: "IDR 450K",
          sortOrder: 1,
        } as never,
      ]);
      const result = await getVehiclesMarketing();
      expect(result[0].priceLabel).toBe("IDR 450K");
      expect(result[0].features).toContain("Full AC");
    });
  });

  describe("getSiteContent", () => {
    it("returns null when not found", async () => {
      vi.mocked(prisma.siteContent.findUnique).mockResolvedValue(null);
      expect(await getSiteContent("hero")).toBeNull();
    });
  });
});
