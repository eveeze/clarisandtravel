"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function createGalleryItem(formData: FormData) {
  const session = await auth();
  if (!session) return;

  const max = await prisma.galleryItem.aggregate({ _max: { sortOrder: true } });
  await prisma.galleryItem.create({
    data: {
      title: String(formData.get("title") ?? ""),
      category: String(formData.get("category") ?? ""),
      image: String(formData.get("image") ?? ""),
      location: String(formData.get("location") ?? "") || null,
      description: String(formData.get("description") ?? "") || null,
      sortOrder: (max._max.sortOrder ?? 0) + 1,
    },
  });

  revalidatePath("/admin/gallery");
}

export async function updateGalleryItem(formData: FormData) {
  const session = await auth();
  if (!session) return;

  const id = Number(formData.get("id"));
  await prisma.galleryItem.update({
    where: { id },
    data: {
      title: String(formData.get("title") ?? ""),
      category: String(formData.get("category") ?? ""),
      image: String(formData.get("image") ?? ""),
      location: String(formData.get("location") ?? "") || null,
      description: String(formData.get("description") ?? "") || null,
      sortOrder: Number(formData.get("sortOrder") ?? 0),
    },
  });

  revalidatePath("/admin/gallery");
}

export async function deleteGalleryItem(id: number) {
  const session = await auth();
  if (!session) return;
  await prisma.galleryItem.delete({ where: { id } });
  revalidatePath("/admin/gallery");
}