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
    const userAttempts = await collection.find({ ip }).toArray();
    const recentAttempts = userAttempts.filter((attempt) => now - attempt.timestamp < TIME_FRAME_IN_MS);

    if (recentAttempts.length >= MAX_REQUESTS) return true;

    await collection.insertOne({ ip, timestamp: now });
    await collection.deleteMany({ timestamp: { $lt: now - TIME_FRAME_IN_MS * 60 } });

    return false;
  } catch (e) {
    console.error("Rate limiting error:", e);
    return true;
  }
}
