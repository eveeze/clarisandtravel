import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendWhatsApp } from "@/lib/whatsapp";

// Cron reminder WhatsApp H-1 sebelum tour.
// Dijalankan oleh Vercel Cron (vercel.json). Dilindungi secret biar gak bisa di-trigger sembarangan.
export const dynamic = "force-dynamic";
export const maxDuration = 60;

export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET;
  if (secret) {
    const authHeader = request.headers.get("authorization");
    if (authHeader !== `Bearer ${secret}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  // Besok (tanggal tour H-1)
  const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000);
  const tourDate = tomorrow.toISOString().slice(0, 10);

  const bookings = await prisma.booking.findMany({
    where: {
      tourDate,
      deletedAt: null,
      status: { in: ["dikonfirmasi", "driver_ditugaskan", "berlangsung", "dibayar"] },
    },
    include: { driver: { select: { name: true } } },
  });

  const results: { code: string; sent: boolean; error?: string }[] = [];
  for (const b of bookings) {
    const lines = [
      "*Reminder Tour Besok — Claris & Travel* 🎉",
      `Halo ${b.name}!`,
      "",
      `Paket: ${b.packageName ?? b.packageSlug ?? "-"}`,
      b.tourDate ? `Tanggal: ${b.tourDate}` : "",
      b.tourTime ? `Jam jemput: ${b.tourTime}` : "",
      b.pickupLocation ? `Lokasi jemput: ${b.pickupLocation}` : "",
      b.driver?.name ? `Driver: ${b.driver.name}` : "",
      `Jumlah orang: ${b.pax}`,
      "",
      "Sampai ketemu besok! Kalau ada pertanyaan, balas chat ini ya 😊",
    ]
      .filter(Boolean)
      .join("\n");

    const res = await sendWhatsApp(b.phone, lines);
    results.push({ code: b.bookingCode, sent: res.success, error: res.error });
  }

  return NextResponse.json({ tourDate, total: bookings.length, results });
}
