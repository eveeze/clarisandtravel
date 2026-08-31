"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { getTenantFromHeaders } from "@/lib/tenant";

export async function createBlog(formData: FormData) {
  const session = await auth();
  if (!session) return;

  const tenantId = await getTenantFromHeaders();
  await prisma.blogPost.create({
    data: {
      tenantId,
      slug: String(formData.get("slug") ?? ""),
      title: String(formData.get("title") ?? ""),
      excerpt: String(formData.get("excerpt") ?? ""),
      contentMd: String(formData.get("contentMd") ?? ""),
      coverImage: String(formData.get("coverImage") ?? ""),
      date: new Date(),
    },
  });

  revalidatePath("/admin/blogs");
  revalidatePath("/blogs");
}

export async function updateBlog(formData: FormData) {
  const session = await auth();
  if (!session) return;

  const id = Number(formData.get("id"));
  await prisma.blogPost.update({
    where: { id },
    data: {
      slug: String(formData.get("slug") ?? ""),
      title: String(formData.get("title") ?? ""),
      excerpt: String(formData.get("excerpt") ?? ""),
      contentMd: String(formData.get("contentMd") ?? ""),
      coverImage: String(formData.get("coverImage") ?? ""),
    },
  });

  revalidatePath("/admin/blogs");
  revalidatePath("/blogs");
}

export async function deleteBlog(id: number) {
  const session = await auth();
  if (!session) return;
  await prisma.blogPost.delete({ where: { id } });
  revalidatePath("/admin/blogs");
  revalidatePath("/blogs");
}
