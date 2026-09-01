import { getReminderQueue } from "./queue";

export type ReminderScheduleInput = {
  bookingCode: string;
  tourDate: string | null;
  status: string;
};

// Schedule reminder H-1 (24 jam sebelum tour). Job pakai delay sampai H-1.
// Kalau Redis/queue tidak tersedia, return false (booking tetap jalan).
export async function scheduleReminder(input: ReminderScheduleInput): Promise<boolean> {
  const queue = getReminderQueue();
  if (!queue) return false;
  if (!input.tourDate) return false;
  const eligible = ["dikonfirmasi", "driver_ditugaskan", "berlangsung", "dibayar"];
  if (!eligible.includes(input.status)) return false;

  const tourAt = new Date(`${input.tourDate}T06:00:00+07:00`).getTime();
  const remindAt = tourAt - 24 * 60 * 60 * 1000;
  const delay = Math.max(0, remindAt - Date.now());

  try {
    await queue.add("remind-h1", { bookingCode: input.bookingCode }, { jobId: `remind-${input.bookingCode}`, delay });
    return true;
  } catch (e) {
    console.error("Failed to schedule reminder:", e);
    return false;
  }
}

// Hapus reminder yang sudah terjadwal (booking dibatalkan)
export async function removeScheduledReminder(bookingCode: string): Promise<void> {
  const queue = getReminderQueue();
  if (!queue) return;
  try {
    await queue.remove(`remind-${bookingCode}`);
  } catch {
    // ignore
  }
}
