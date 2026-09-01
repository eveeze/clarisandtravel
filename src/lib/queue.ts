import { Queue } from "bullmq";
import { redis, redisReady } from "./redis";

const globalForQueue = globalThis as unknown as {
  reminderQueue?: Queue | null;
};

export const reminderQueue: Queue | null = redisReady
  ? (globalForQueue.reminderQueue ??
    new Queue("reminders", {
      connection: redis!,
      defaultJobOptions: {
        removeOnComplete: true,
        removeOnFail: 100,
        attempts: 3,
        backoff: { type: "exponential", delay: 60_000 },
      },
    }))
  : null;

if (process.env.NODE_ENV !== "production" && reminderQueue) {
  globalForQueue.reminderQueue = reminderQueue;
}

export { redisReady };
