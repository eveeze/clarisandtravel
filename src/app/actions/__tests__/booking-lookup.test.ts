import { describe, it, expect, vi, beforeEach } from "vitest";
import { prisma } from "@/lib/prisma";
import { lookupBooking } from "@/app/actions/booking-lookup";

vi.mock("@/lib/prisma", () => ({
  prisma: {
    booking: { findFirst: vi.fn() },
  },
}));

const mockBooking = {
  id: 1,
  bookingCode: "CLR-X7K2P9QD",
  name: "Budi",
  phone: "628123456789",
  packageSlug: "jogja-city-explore",
  packageName: "Jogja City Explore",
  vehicleName: "Avanza",
  tourDate: "2026-09-01",
  tourTime: "08:00",
  pickupLocation: "Hotel Malioboro",
  pax: 2,
  status: "baru",
  paymentStatus: "belum",
  totalPrice: 750000,
  driver: null,
  createdAt: new Date(),
} as never;

describe("lookupBooking (server action)", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("rejects empty query", async () => {
    const res = await lookupBooking("  ");
    expect(res?.error).toBeDefined();
    expect(prisma.booking.findFirst).not.toHaveBeenCalled();
  });

  it("rejects unrecognized format", async () => {
    const res = await lookupBooking("hello world");
    expect(res?.error).toBeDefined();
    expect(prisma.booking.findFirst).not.toHaveBeenCalled();
  });

  it("finds booking by booking code (case-insensitive)", async () => {
    vi.mocked(prisma.booking.findFirst).mockResolvedValue(mockBooking);
    const res = await lookupBooking("clr-x7k2p9qd");
    expect(res?.booking?.bookingCode).toBe("CLR-X7K2P9QD");
    expect(prisma.booking.findFirst).toHaveBeenCalled();
  });

  it("finds booking by phone number (08 format normalized to 62)", async () => {
    vi.mocked(prisma.booking.findFirst).mockResolvedValue(mockBooking);
    const res = await lookupBooking("08123456789");
    expect(res?.booking?.name).toBe("Budi");
    // harus query dengan nomor ternormalisasi 628123456789 (exact match)
    expect(prisma.booking.findFirst).toHaveBeenCalledWith(
      expect.objectContaining({
        where: expect.objectContaining({
          OR: expect.arrayContaining([expect.objectContaining({ phone: { equals: "628123456789" } })]),
        }),
      }),
    );
  });

  it("finds booking by phone number with +62 format", async () => {
    vi.mocked(prisma.booking.findFirst).mockResolvedValue(mockBooking);
    const res = await lookupBooking("+62 812-3456-789");
    expect(res?.booking?.name).toBe("Budi");
  });

  it("returns not-found error when booking missing", async () => {
    vi.mocked(prisma.booking.findFirst).mockResolvedValue(null);
    const res = await lookupBooking("CLR-ZZZZZZZZ");
    expect(res?.error).toMatch(/tidak ditemukan/i);
  });
});
