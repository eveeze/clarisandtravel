"use server";

import { nanoid } from "nanoid";
import { prisma } from "@/lib/prisma";
import { rateLimit } from "@/lib/rate-limit";
import { getTenantFromHeaders } from "@/lib/tenant";

export type BookingInput = {
  name: string;
  phone: string;
  email?: string;
  packageSlug?: string;
  vehicleName?: string;
  tourDate?: string;
  tourTime?: string;
  pickupLocation?: string;
  pax: number;
  message?: string;
};

const PHONE_REGEX = /^(\+?\d[\d\s-]{6,17})$/;
const DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;
const TIME_REGEX = /^\d{2}:\d{2}$/;

export async function createBooking(input: BookingInput) {
  const rate = await rateLimit("booking", 5, 60_000);
  if (rate.limited) {
    return { error: "Terlalu banyak booking dalam waktu singkat. Coba lagi beberapa menit lagi." };
  }

  const tenantId = await getTenantFromHeaders();
  const name = input.name.trim();
  const phone = input.phone.trim();
  const email = input.email?.trim() || null;
  const pax = Number(input.pax);

  if (!name) return { error: "Nama wajib diisi." };
  if (!phone || !PHONE_REGEX.test(phone)) {
    return { error: "Nomor WhatsApp tidak valid. Gunakan format 08xx atau +628xx." };
  }
  if (!Number.isInteger(pax) || pax < 1 || pax > 50) {
    return { error: "Jumlah orang harus antara 1-50." };
  }
  if (input.tourDate && !DATE_REGEX.test(input.tourDate)) {
    return { error: "Format tanggal tour tidak valid." };
  }
  if (input.tourTime && !TIME_REGEX.test(input.tourTime)) {
    return { error: "Format jam jemput tidak valid." };
  }
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { error: "Format email tidak valid." };
  }

  // Cari paket + armada buat denormalisasi + hitung totalPrice
  let packageName: string | null = null;
  let totalPrice: number | null = null;
  let vehicleId: number | null = null;
  if (input.packageSlug) {
    const pkg = await prisma.tourPackage.findUnique({
      where: { slug: input.packageSlug },
      select: { name: true, basePrice: true },
    });
    packageName = pkg?.name ?? null;
    totalPrice = pkg?.basePrice ?? null;
  }
  if (input.vehicleName) {
    const v = await prisma.vehicle.findFirst({
      where: { name: input.vehicleName },
      select: { id: true, priceIncrement: true },
    });
    vehicleId = v?.id ?? null;
    if (v?.priceIncrement) totalPrice = (totalPrice ?? 0) + v.priceIncrement;
  }
  // Harga per orang
  if (totalPrice != null) totalPrice = totalPrice * pax;

  // Kode unik acak — anti-enumerate + anti-race condition
  const bookingCode = `CLR-${nanoid(8).toUpperCase()}`;

  const booking = await prisma.booking.create({
    data: {
      tenantId,
      bookingCode,
      name,
      phone,
      email: input.email?.trim() || null,
      packageSlug: input.packageSlug || null,
      packageName,
      vehicleId,
      vehicleName: input.vehicleName || null,
      tourDate: input.tourDate || null,
      tourTime: input.tourTime || null,
      pickupLocation: input.pickupLocation || null,
      pax,
      message: input.message?.trim() || null,
      totalPrice,
      status: "baru",
      history: {
        create: {
          from: null,
          to: "baru",
          note: "Booking dibuat customer",
          changedBy: "customer",
        },
      },
    },
  });

  return { success: true, id: booking.id, bookingCode: booking.bookingCode };
}
