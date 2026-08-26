"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function updateSiteContent(formData: FormData) {
  const session = await auth();
  if (!session) return;

  const key = String(formData.get("key"));
  const raw = String(formData.get("content"));
  let content: unknown;
  try {
    content = JSON.parse(raw);
  } catch {
    return;
  }

  await prisma.siteContent.update({
    where: { key },
    data: { content: content as never },
  });

  revalidatePath("/admin/content");
}