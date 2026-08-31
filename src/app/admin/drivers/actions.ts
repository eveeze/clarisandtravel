"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { getTenantFromHeaders } from "@/lib/tenant";

const VALID_STATUS = ["tersedia", "bertugas", "cuti"];

export async function createDriver(formData: FormData) {
  const session = await auth();
  if (!session) return;

  const tenantId = await getTenantFromHeaders();
  const name = String(formData.get("name") || "").trim();
  const phone = String(formData.get("phone") || "").trim();
  const status = String(formData.get("status") || "tersedia");
  const notes = String(formData.get("notes") || "").trim() || null;

  if (!name || !phone) return;

  await prisma.driver.create({
    data: {
      tenantId,
      name,
      phone,
      status: VALID_STATUS.includes(status) ? status : "tersedia",
      notes,
    },
  });

  revalidatePath("/admin/drivers");
  revalidatePath("/admin/bookings");
}

export async function updateDriver(
  id: number,
  data: { name?: string; phone?: string; status?: string; notes?: string },
) {
  const session = await auth();
  if (!session) return;

  const payload: Record<string, unknown> = {};
  if (data.name) payload.name = data.name.trim();
  if (data.phone) payload.phone = data.phone.trim();
  if (data.status && VALID_STATUS.includes(data.status)) payload.status = data.status;
  if (data.notes !== undefined) payload.notes = data.notes.trim() || null;

  await prisma.driver.update({ where: { id }, data: payload });
  revalidatePath("/admin/drivers");
  revalidatePath("/admin/bookings");
  return { success: true };
}

export async function deleteDriver(id: number) {
  const session = await auth();
  if (!session) return;

  // Lepas relasi booking dulu (driverId -> null), baru hapus
  await prisma.booking.updateMany({
    where: { driverId: id },
    data: { driverId: null },
  });
  await prisma.driver.delete({ where: { id } });

  revalidatePath("/admin/drivers");
  revalidatePath("/admin/bookings");
  return { success: true };
}
