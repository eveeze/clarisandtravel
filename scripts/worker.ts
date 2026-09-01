import { config } from "dotenv";
config({ path: ".env.local" });
import { startReminderWorker } from "../src/lib/worker";

// Jalankan: npm run worker
// Host di proses terpisah (Railway/Render/VPS) — worker harus selalu hidup.
const worker = startReminderWorker();
if (!worker) {
  console.error("Worker gagal start. Pastikan REDIS_URL di-set.");
  process.exit(1);
}

console.log("✅ Reminder worker jalan. Menunggu job... (Ctrl+C untuk stop)");

process.on("SIGINT", async () => {
  console.log("\nMenghentikan worker...");
  await worker.close();
  process.exit(0);
});
process.on("SIGTERM", async () => {
  await worker.close();
  process.exit(0);
});
