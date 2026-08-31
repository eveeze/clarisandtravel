import { describe, it, expect, vi, beforeEach } from "vitest";
import { prisma } from "@/lib/prisma";
import { createBooking } from "@/app/actions/booking";

vi.mock("@/lib/rate-limit", () => ({
  rateLimit: vi.fn().mockResolvedValue({
    limited: false,
    remaining: 5,
    resetAt: Date.now() + 60_000,
  }),
}));

vi.mock("@/lib/prisma", () => ({
  prisma: {
    tourPackage: { findMany: vi.fn(), findUnique: vi.fn() },
    blogPost: { findMany: vi.fn(), findUnique: vi.fn() },
    touristSpot: { findMany: vi.fn() },
    galleryItem: { findMany: vi.fn() },
    vehicle: { findMany: vi.fn(), update: vi.fn(), updateMany: vi.fn(), findFirst: vi.fn() },
    siteContent: { findUnique: vi.fn(), findMany: vi.fn(), update: vi.fn() },
    booking: { create: vi.fn(), findMany: vi.fn(), update: vi.fn(), delete: vi.fn(), count: vi.fn() },
    adminUser: { findUnique: vi.fn(), findMany: vi.fn(), upsert: vi.fn() },
  },
}));

describe("createBooking (server action)", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("rejects when name is empty", async () => {
    const res = await createBooking({ name: "", phone: "0812345", pax: 1 });
    expect(res?.error).toBeDefined();
    expect(prisma.booking.create).not.toHaveBeenCalled();
  });

  it("rejects when phone is empty", async () => {
    const res = await createBooking({ name: "Budi", phone: "  ", pax: 1 });
    expect(res?.error).toBeDefined();
    expect(prisma.booking.create).not.toHaveBeenCalled();
  });

  it("rejects invalid phone format", async () => {
    const res = await createBooking({ name: "Budi", phone: "abc", pax: 1 });
    expect(res?.error).toMatch(/nomor whatsapp/i);
  });

  it("rejects invalid pax", async () => {
    const res = await createBooking({ name: "Budi", phone: "08123456789", pax: 0 });
    expect(res?.error).toMatch(/jumlah orang/i);
  });

  it("creates booking with random booking code and computed totalPrice", async () => {
    vi.mocked(prisma.tourPackage.findUnique).mockResolvedValue({
      name: "Jogja City Explore",
      basePrice: 250000,
    } as never);
    vi.mocked(prisma.vehicle.findFirst).mockResolvedValue({
      id: 2,
      priceIncrement: 100000,
    } as never);
    vi.mocked(prisma.booking.create).mockResolvedValue({
      id: 1,
      bookingCode: "CLR-AB12CD34",
      name: "Budi",
      phone: "0812345",
      email: "budi@x.com",
      packageSlug: "jogja-city-explore",
      packageName: "Jogja City Explore",
      vehicleId: 2,
      vehicleName: "Avanza",
      tourDate: "2026-09-01",
      pax: 2,
      message: null,
      status: "baru",
      createdAt: new Date(),
    } as never);

    const res = await createBooking({
      name: "  Budi ",
      phone: " 0812345 ",
      email: " budi@x.com ",
      packageSlug: "jogja-city-explore",
      vehicleName: "Avanza",
      tourDate: "2026-09-01",
      pax: 2,
    });

    expect(res?.success).toBe(true);
    expect(res?.bookingCode).toBe("CLR-AB12CD34");
    expect(prisma.booking.create).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({
          name: "Budi",
          phone: "0812345",
          email: "budi@x.com",
          packageSlug: "jogja-city-explore",
          packageName: "Jogja City Explore",
          vehicleId: 2,
          vehicleName: "Avanza",
          // basePrice 250000 + increment 100000 = 350000, × pax 2 = 700000
          totalPrice: 700000,
          bookingCode: expect.stringMatching(/^CLR-[A-Z0-9]{8}$/),
        }),
      }),
    );
  });
});
