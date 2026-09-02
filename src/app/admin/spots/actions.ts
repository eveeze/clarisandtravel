"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { getTenantFromHeaders } from "@/lib/tenant";
import { invalidateSiteCache } from "@/lib/cache";

export async function createSpot(formData: FormData) {
  const session = await auth();
  if (!session) return;

  const tenantId = await getTenantFromHeaders();
  await prisma.touristSpot.create({
    data: {
      tenantId,
      slug: String(formData.get("slug") ?? ""),
      name: String(formData.get("name") ?? ""),
      description: String(formData.get("description") ?? ""),
      history: String(formData.get("history") ?? "") || null,
      category: String(formData.get("category") ?? "") || null,
      imageUrl: String(formData.get("imageUrl") ?? ""),
      location: String(formData.get("location") ?? ""),
    },
  });

  await invalidateSiteCache(tenantId);
  revalidatePath("/admin/spots");
}

export async function updateSpot(formData: FormData) {
  const session = await auth();
  if (!session) return;

  const id = Number(formData.get("id"));
  await prisma.touristSpot.update({
    where: { id },
    data: {
      slug: String(formData.get("slug") ?? ""),
      name: String(formData.get("name") ?? ""),
      description: String(formData.get("description") ?? ""),
      history: String(formData.get("history") ?? "") || null,
      category: String(formData.get("category") ?? "") || null,
      imageUrl: String(formData.get("imageUrl") ?? ""),
      location: String(formData.get("location") ?? ""),
    },
  });

  await invalidateSiteCache(await getTenantFromHeaders());
  revalidatePath("/admin/spots");
}

export async function deleteSpot(id: number) {
  const session = await auth();
  if (!session) return;
  await prisma.touristSpot.delete({ where: { id } });
  await invalidateSiteCache(await getTenantFromHeaders());
  revalidatePath("/admin/spots");
}
