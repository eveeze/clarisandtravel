"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { getTenantFromHeaders } from "@/lib/tenant";
import { invalidateSiteCache } from "@/lib/cache";

export async function updateVehicleMarketing(formData: FormData) {
  const session = await auth();
  if (!session) return;

  const id = Number(formData.get("id"));
  await prisma.vehicle.update({
    where: { id },
    data: {
      description: String(formData.get("description") ?? ""),
      priceLabel: String(formData.get("priceLabel") ?? ""),
      features: String(formData.get("features") ?? "")
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      sortOrder: Number(formData.get("sortOrder") ?? 0),
    },
  });

  await invalidateSiteCache(await getTenantFromHeaders());
  revalidatePath("/admin/vehicles");
}
