"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function createSpot(formData: FormData) {
  const session = await auth();
  if (!session) return;

  await prisma.touristSpot.create({
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

  revalidatePath("/admin/spots");
}

export async function deleteSpot(id: number) {
  const session = await auth();
  if (!session) return;
  await prisma.touristSpot.delete({ where: { id } });
  revalidatePath("/admin/spots");
}