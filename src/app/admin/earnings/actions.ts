"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function updateCommissionPaid(id: number, paid: boolean) {
  const session = await auth();
  if (!session) return { error: "Unauthorized" };

  await prisma.booking.update({
    where: { id },
    data: {
      commissionPaid: paid,
      commissionPaidAt: paid ? new Date() : null,
    },
  });

  revalidatePath("/admin/earnings");
  revalidatePath("/admin/bookings");
  return { success: true };
}
