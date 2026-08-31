"use server";

import { prisma } from "@/lib/prisma";

export type BookingLookupResult = {
  id: number;
  bookingCode: string;
  name: string;
  phone: string;
  packageName: string | null;
  vehicleName: string | null;
  tourDate: string | null;
  tourTime: string | null;
  pickupLocation: string | null;
  pax: number;
  status: string;
  paymentStatus: string;
  totalPrice: number | null;
  driverName: string | null;
  createdAt: Date;
};

// Normalisasi nomor ke format "628xxxxxxxxx" (62 + tanpa leading 0)
function normalizePhone(phone: string): string {
  let digits = phone.replace(/\D/g, "");
  if (digits.startsWith("0")) digits = "62" + digits.slice(1);
  else if (digits.startsWith("62")) digits = "62" + digits.slice(2);
  else if (digits.startsWith("8")) digits = "62" + digits;
  return digits;
}

export async function lookupBooking(query: string): Promise<{ error?: string; booking?: BookingLookupResult }> {
  const q = query.trim();
  if (!q) return { error: "Masukkan kode booking atau nomor WhatsApp." };

  // Kode booking persis (case-insensitive): "CLR-2026-0001"
  // Kalau kode, cari persis; kalau nomor, cari persis (normalisasi 62)
  const isCode = /^clr[- ]?/i.test(q);
  const isPhone = /^[+0-9][0-9\s-]{8,}$/.test(q);

  if (!isCode && !isPhone) {
    return { error: "Format tidak dikenali. Masukkan kode booking (CLR-...) atau nomor WhatsApp." };
  }

  let booking;
  if (isCode) {
    const normalized = q.toUpperCase().replace(/\s+/g, "").replace(/-+/g, "-");
    booking = await prisma.booking.findFirst({
      where: { bookingCode: { equals: normalized, mode: "insensitive" }, deletedAt: null },
      include: { driver: { select: { name: true } } },
    });
  } else {
    const normalized = normalizePhone(q);
    booking = await prisma.booking.findFirst({
      where: {
        deletedAt: null,
        OR: [{ phone: { equals: normalized } }, { phone: { equals: q.replace(/\s/g, "") } }],
      },
      include: { driver: { select: { name: true } } },
      orderBy: { createdAt: "desc" },
    });
  }

  if (!booking) {
    return { error: "Booking tidak ditemukan. Pastikan kode/nomor benar, atau hubungi kami via WhatsApp." };
  }

  return {
    booking: {
      id: booking.id,
      bookingCode: booking.bookingCode,
      name: booking.name,
      phone: booking.phone,
      packageName: booking.packageName ?? booking.packageSlug,
      vehicleName: booking.vehicleName,
      tourDate: booking.tourDate,
      tourTime: booking.tourTime,
      pickupLocation: booking.pickupLocation,
      pax: booking.pax,
      status: booking.status,
      paymentStatus: booking.paymentStatus,
      totalPrice: booking.totalPrice,
      driverName: booking.driver?.name ?? null,
      createdAt: booking.createdAt,
    },
  };
}
