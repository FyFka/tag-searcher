import { Hero } from "@/components/hero";
import client from "@/lib/mongodb";
import { dbName, serverLimitPerPage } from "@/config";
import { ServerDashboard } from "@/components/server-dashboard";
import { notFound } from "next/navigation";
import { getSortByType, parseSortBy } from "@/lib/parse";

export const metadata = {
  title: "TagSearcher",
  description: "TagSearcher",
  keywords: "discord, discord badge, discord tag, discord server tag, discord tags 2025, discord tags list",
};

const getServers = async () => {
  try {
    const connection = await client;
    const db = connection.db(dbName);
    const sortBy = parseSortBy(); // we take popular
    const sort = getSortByType(sortBy, "");

    const results = await db
      .collection("servertags")
      .find({}, { projection: { _id: 0, __v: 0 } }) // any nsfw
      .sort(sort)
      .limit(serverLimitPerPage + 1)
      .toArray();

    const hasMore = results.length > serverLimitPerPage;
    const servers = hasMore ? results.slice(0, serverLimitPerPage) : results;

    const stats = await db.collection("stats").findOne({}, { projection: { _id: 0, __v: 0 } });

    return { servers, stats, hasMore };
  } catch (e) {
    console.error("Error fetching collections:", e);
    return null;
  }
};

export default async function Home() {
  const result = await getServers();

  if (!result) {
    return notFound();
  }

  return (
    <div>
      <Hero />
      <ServerDashboard result={result} />
    </div>
  );
}
