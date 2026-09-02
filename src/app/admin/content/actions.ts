"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { getTenantFromHeaders } from "@/lib/tenant";
import { invalidateSiteCache } from "@/lib/cache";

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

  const tenantId = await getTenantFromHeaders();
  await prisma.siteContent.update({
    where: { tenantId_key: { tenantId, key } },
    data: { content: content as never },
  });

  await invalidateSiteCache(tenantId);
  revalidatePath("/admin/content");
}
