import { describe, it, expect, vi, beforeEach } from "vitest";
import { prisma } from "@/lib/prisma";
import { createBooking } from "@/app/actions/booking";

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

  it("creates booking with trimmed data", async () => {
    vi.mocked(prisma.booking.create).mockResolvedValue({
      id: 1,
      name: "Budi",
      phone: "0812345",
      email: null,
      packageSlug: "jogja-city-explore",
      vehicleName: "Sigra",
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
      vehicleName: "Sigra",
      tourDate: "2026-09-01",
      pax: 2,
    });

    expect(res?.success).toBe(true);
    expect(prisma.booking.create).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({
          name: "Budi",
          phone: "0812345",
          email: "budi@x.com",
          packageSlug: "jogja-city-explore",
          vehicleName: "Sigra",
        }),
      }),
    );
  });
});
