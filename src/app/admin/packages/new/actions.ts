"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { getTenantFromHeaders } from "@/lib/tenant";

export async function createPackage(formData: FormData) {
  const session = await auth();
  if (!session) return;

  const tenantId = await getTenantFromHeaders();
  const features = String(formData.get("features") ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  await prisma.tourPackage.create({
    data: {
      tenantId,
      slug: String(formData.get("slug") ?? ""),
      name: String(formData.get("name") ?? ""),
      description: String(formData.get("description") ?? ""),
      basePrice: Number(formData.get("basePrice") ?? 0),
      duration: String(formData.get("duration") ?? ""),
      touristType: String(formData.get("touristType") ?? "local"),
      thumbnail: String(formData.get("thumbnail") ?? ""),
      features,
      isPopular: formData.get("isPopular") === "on",
    },
  });

  revalidatePath("/admin/packages");
  revalidatePath("/tours-pricing");
}
