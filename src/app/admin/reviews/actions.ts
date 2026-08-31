"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function upsertReview(formData: FormData) {
  const session = await auth();
  if (!session) return;

  const bookingId = Number(formData.get("bookingId"));
  const rating = Number(formData.get("rating"));
  const comment = String(formData.get("comment") || "").trim();

  if (!bookingId || !comment || rating < 1 || rating > 5) return;

  const booking = await prisma.booking.findUnique({
    where: { id: bookingId },
    select: { packageSlug: true },
  });
  if (!booking) return;

  const pkg = booking.packageSlug
    ? await prisma.tourPackage.findUnique({
        where: { slug: booking.packageSlug },
        select: { id: true },
      })
    : null;

  await prisma.review.upsert({
    where: { bookingId },
    update: { rating, comment, packageId: pkg?.id ?? null },
    create: {
      bookingId,
      packageId: pkg?.id ?? null,
      rating,
      comment,
      verified: true,
    },
  });

  revalidatePath("/admin/reviews");
}

export async function deleteReview(id: number) {
  const session = await auth();
  if (!session) return;
  await prisma.review.delete({ where: { id } });
  revalidatePath("/admin/reviews");
}
