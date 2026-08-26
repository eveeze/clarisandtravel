"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function updatePackage(formData: FormData) {
  const session = await auth();
  if (!session) return;

  const id = Number(formData.get("id"));
  const features = String(formData.get("features") ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  await prisma.tourPackage.update({
    where: { id },
    data: {
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
  revalidatePath(`/tours-pricing/${String(formData.get("slug"))}`);
}

export async function deletePackage(id: number) {
  const session = await auth();
  if (!session) return;
  await prisma.tourPackage.delete({ where: { id } });
  revalidatePath("/admin/packages");
}
