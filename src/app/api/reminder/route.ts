import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendWhatsApp } from "@/lib/whatsapp";

// Endpoint cron reminder H-1 — dipanggil oleh cron-job.org setiap hari.
// Proteksi via CRON_SECRET (Authorization: Bearer <secret>).
export const dynamic = "force-dynamic";
export const maxDuration = 60;

export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET;
  if (!secret) {
    return NextResponse.json({ error: "CRON_SECRET not configured" }, { status: 500 });
  }
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Besok — hitung pake WIB (Asia/Jakarta)
  const now = new Date();
  const jakarta = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Jakarta" }));
  jakarta.setDate(jakarta.getDate() + 1);
  const tomorrow = jakarta.toISOString().slice(0, 10);

  const bookings = await prisma.booking.findMany({
    where: {
      tourDate: tomorrow,
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

    // Catat audit trail
    await prisma.bookingHistory.create({
      data: {
        bookingId: b.id,
        from: null,
        to: "reminder_h1",
        note: res.success ? "Reminder H-1 terkirim" : `Reminder H-1 GAGAL: ${res.error ?? ""}`,
        changedBy: "system",
      },
    });

    results.push({ code: b.bookingCode, sent: res.success, error: res.error });
  }

  return NextResponse.json({ tourDate: tomorrow, total: bookings.length, results });
}
