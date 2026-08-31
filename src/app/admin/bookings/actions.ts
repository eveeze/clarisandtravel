"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

const VALID_STATUS = [
  "baru",
  "menunggu_bayar",
  "dibayar",
  "dikonfirmasi",
  "driver_ditugaskan",
  "berlangsung",
  "selesai",
  "batal",
  "no_show",
];

// Status yang boleh terima assign driver
const ASSIGNABLE_STATUS = ["baru", "menunggu_bayar", "dibayar", "dikonfirmasi", "driver_ditugaskan"];

export async function updateBookingStatus(id: number, status: string, note?: string) {
  const session = await auth();
  if (!session) return { error: "Unauthorized" };

  if (!VALID_STATUS.includes(status)) {
    return { error: "Status tidak valid." };
  }

  const existing = await prisma.booking.findUnique({
    where: { id },
    select: { status: true, commissionPaid: true, paymentStatus: true },
  });
  if (!existing) return { error: "Booking tidak ditemukan." };

  const data: Record<string, unknown> = { status };
  // Komisi otomatis terhitung SAAT booking selesai DAN sudah dibayar
  const paid = existing.paymentStatus === "dibayar";
  if (status === "selesai" && paid && !existing.commissionPaid) {
    data.commissionPaid = true;
    data.commissionPaidAt = new Date();
  }
  // Kalau batal/no_show, komisi gak dihitung
  if ((status === "batal" || status === "no_show") && existing.commissionPaid) {
    data.commissionPaid = false;
    data.commissionPaidAt = null;
  }

  await prisma.booking.update({
    where: { id },
    data,
  });

  await prisma.bookingHistory.create({
    data: {
      bookingId: id,
      from: existing.status,
      to: status,
      note: note ?? "Admin ubah status",
      changedBy: "admin",
    },
  });

  revalidatePath("/admin/bookings");
  revalidatePath("/admin/earnings");
  return { success: true };
}

export async function updatePaymentStatus(id: number, paymentStatus: string, method?: string, ref?: string) {
  const session = await auth();
  if (!session) return { error: "Unauthorized" };

  const existing = await prisma.booking.findUnique({
    where: { id },
    select: { status: true, commissionPaid: true },
  });
  if (!existing) return { error: "Booking tidak ditemukan." };

  const data: Record<string, unknown> = { paymentStatus };
  if (method) data.paymentMethod = method;
  if (ref) data.paymentRef = ref;
  data.paidAt = paymentStatus === "dibayar" ? new Date() : null;
  if (paymentStatus === "refunded") data.refundedAt = new Date();

  // Kalau booking sudah selesai DAN sekarang dibayar → komisi terhitung
  if (paymentStatus === "dibayar" && existing.status === "selesai" && !existing.commissionPaid) {
    data.commissionPaid = true;
    data.commissionPaidAt = new Date();
  }

  await prisma.booking.update({ where: { id }, data });

  await prisma.bookingHistory.create({
    data: {
      bookingId: id,
      from: existing.status,
      to: `payment:${paymentStatus}`,
      note: `Pembayaran ${paymentStatus}${method ? ` via ${method}` : ""}`,
      changedBy: "admin",
    },
  });

  revalidatePath("/admin/bookings");
  revalidatePath("/admin/earnings");
  return { success: true };
}

export async function assignDriver(id: number, driverId: number | null) {
  const session = await auth();
  if (!session) return { error: "Unauthorized" };

  const existing = await prisma.booking.findUnique({
    where: { id },
    select: { status: true },
  });
  if (!existing) return { error: "Booking tidak ditemukan." };

  // Gak boleh assign/hapus driver ke booking yang sudah selesai/batal/no_show
  if (!ASSIGNABLE_STATUS.includes(existing.status)) {
    return { error: "Booking sudah selesai/batal — driver tidak bisa diubah." };
  }

  await prisma.booking.update({
    where: { id },
    data: {
      driverId,
      status: driverId ? "driver_ditugaskan" : undefined,
      driverAssignedAt: driverId ? new Date() : null,
    },
  });

  await prisma.bookingHistory.create({
    data: {
      bookingId: id,
      from: existing.status,
      to: "driver",
      note: driverId ? "Driver ditugaskan" : "Driver dihapus dari booking",
      changedBy: "admin",
    },
  });

  revalidatePath("/admin/bookings");
  return { success: true };
}

export async function deleteBooking(id: number) {
  const session = await auth();
  if (!session) return;
  // Soft delete — booking gak benar-benar hilang, biar audit/komisi/review aman
  await prisma.booking.update({
    where: { id },
    data: { deletedAt: new Date() },
  });
  await prisma.bookingHistory.create({
    data: {
      bookingId: id,
      from: null,
      to: "deleted",
      note: "Booking dihapus (soft delete) oleh admin",
      changedBy: "admin",
    },
  });
  revalidatePath("/admin/bookings");
  revalidatePath("/admin/earnings");
}
