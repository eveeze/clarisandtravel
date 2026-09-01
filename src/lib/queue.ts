import { Queue } from "bullmq";
import { getRedis } from "./redis";

let _queue: Queue | null | undefined = undefined;

export function getReminderQueue(): Queue | null {
  if (_queue !== undefined) return _queue;

  const redis = getRedis();
  if (!redis) {
    _queue = null;
    return null;
  }

  _queue = new Queue("reminders", {
    connection: redis,
    defaultJobOptions: {
      removeOnComplete: true,
      removeOnFail: 100,
      attempts: 3,
      backoff: { type: "exponential", delay: 60_000 },
    },
  });

  return _queue;
}

export { getRedis, redisReady as getRedisReady } from "./redis";
