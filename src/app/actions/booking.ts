"use server";

import { prisma } from "@/lib/prisma";

export type BookingInput = {
  name: string;
  phone: string;
  email?: string;
  packageSlug?: string;
  vehicleName?: string;
  tourDate?: string;
  pax: number;
  message?: string;
};

export async function createBooking(input: BookingInput) {
  const phone = input.phone.trim();
  if (!input.name.trim() || !phone) {
    return { error: "Nama dan nomor WhatsApp wajib diisi." };
  }

  const booking = await prisma.booking.create({
    data: {
      name: input.name.trim(),
      phone,
      email: input.email?.trim() || null,
      packageSlug: input.packageSlug || null,
      vehicleName: input.vehicleName || null,
      tourDate: input.tourDate || null,
      pax: input.pax || 1,
      message: input.message?.trim() || null,
    },
  });

  return { success: true, id: booking.id };
}
