import client from "@/lib/mongodb";
import { dbName } from "@/config";

const TIME_FRAME_IN_MS = 60000;
const MAX_REQUESTS = 5;

export async function isRateLimited(ip) {
  if (!ip) return true;

  try {
    const connection = await client;
    const db = connection.db(dbName);
    const collection = db.collection("join_attempts");
    const now = Date.now();
    const recentAttempts = await collection.countDocuments({ ip, timestamp: { $gt: now - TIME_FRAME_IN_MS } });

    if (recentAttempts > MAX_REQUESTS) return true;

    await Promise.all([
      collection.insertOne({ ip, timestamp: now }),
      collection.deleteMany({ timestamp: { $lt: now - TIME_FRAME_IN_MS } }),
    ]);

    return false;
  } catch (e) {
    console.error("Rate limiting error:", e);
    return true;
  }
}
