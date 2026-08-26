"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function updateBookingStatus(id: number, status: string) {
  const session = await auth();
  if (!session) return;
  await prisma.booking.update({
    where: { id },
    data: { status },
  });
  revalidatePath("/admin/bookings");
}

export async function deleteBooking(id: number) {
  const session = await auth();
  if (!session) return;
  await prisma.booking.delete({ where: { id } });
  revalidatePath("/admin/bookings");
}
