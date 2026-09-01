import { Worker, type Job } from "bullmq";
import { prisma } from "./prisma";
import { sendWhatsApp } from "./whatsapp";
import { getRedis } from "./redis";

type ReminderJobData = { bookingCode: string };

const REMINDER_STATUS = ["dikonfirmasi", "driver_ditugaskan", "berlangsung", "dibayar"];

async function processReminder(job: Job<ReminderJobData>) {
  const { bookingCode } = job.data;
  const booking = await prisma.booking.findUnique({
    where: { bookingCode },
    include: { driver: { select: { name: true } } },
  });

  // Booking gak ada / udah dihapus / status gak layak → skip
  if (!booking || booking.deletedAt) {
    return { skipped: "not-found-or-deleted" };
  }
  if (!REMINDER_STATUS.includes(booking.status)) {
    return { skipped: "status-not-eligible" };
  }

  const lines = [
    "*Reminder Tour Besok — Claris & Travel* 🎉",
    `Halo ${booking.name}!`,
    "",
    `Paket: ${booking.packageName ?? booking.packageSlug ?? "-"}`,
    booking.tourDate ? `Tanggal: ${booking.tourDate}` : "",
    booking.tourTime ? `Jam jemput: ${booking.tourTime}` : "",
    booking.pickupLocation ? `Lokasi jemput: ${booking.pickupLocation}` : "",
    booking.driver?.name ? `Driver: ${booking.driver.name}` : "",
    `Jumlah orang: ${booking.pax}`,
    "",
    "Sampai ketemu besok! Kalau ada pertanyaan, balas chat ini ya 😊",
  ]
    .filter(Boolean)
    .join("\n");

  const res = await sendWhatsApp(booking.phone, lines);

  // Catat audit trail pengiriman
  await prisma.bookingHistory.create({
    data: {
      bookingId: booking.id,
      from: null,
      to: "reminder_h1",
      note: res.success ? "Reminder H-1 terkirim" : `Reminder H-1 GAGAL: ${res.error ?? ""}`,
      changedBy: "system",
    },
  });

  return { sent: res.success, error: res.error };
}

export function startReminderWorker() {
  const redis = getRedis();
  if (!redis) {
    console.warn("[ReminderWorker] REDIS_URL tidak di-set — worker tidak jalan.");
    return null;
  }

  const worker = new Worker<ReminderJobData>("reminders", processReminder, {
    connection: redis,
    concurrency: 5,
  });

  worker.on("completed", (job) => {
    console.log(`[ReminderWorker] job ${job.id} selesai`);
  });
  worker.on("failed", (job, err) => {
    console.error(`[ReminderWorker] job ${job?.id} gagal:`, err.message);
  });

  return worker;
}
