import { Hero } from "@/components/hero";
import client from "@/lib/mongodb";
import { dbName, serverLimitPerPage } from "@/config";
import { ServerDashboard } from "@/components/server-dashboard";
import { notFound } from "next/navigation";
import { parseSortBy, parseSearch, getSortByType, parseNSFW, parseCharacters } from "@/lib/parse";

export const metadata = {
  title: "Search Discord Tags & Badges",
  description:
    "Explore the most up-to-date 2025 Discord server tags and badges instantly search thousands of tags discover communities personalize your profile.",
  keywords: [
    "discord",
    "discord server",
    "discord servers",
    "discord tag",
    "discord tags",
    "tags discord",
    "discord server tags",
    "find discord servers",
    "search discord servers",
    "discord server finder",
    "discord server search",
    "discord server directory",
    "public discord servers",
    "browse discord servers",
    "discord server browser",
    "discord communities",
    "discord community finder",
    "discord tag search",
    "gaming discord servers",
    "anime discord servers",
    "discord server list",
    "popular discord servers",
    "2025 discord servers",
  ],
};

const getServers = async (userSearch = "", userSortBy = "relevant", userNsfw = true, userCharacters = -1) => {
  try {
    const search = parseSearch(userSearch);
    const sortBy = parseSortBy(userSortBy);
    const sort = getSortByType(sortBy, search);
    const withNSFW = parseNSFW(userNsfw);
    const characters = parseCharacters(userCharacters);

    const connection = await client;
    const db = connection.db(dbName);

    const query = {
      ...(search ? { $text: { $search: search } } : {}),
      ...(withNSFW ? {} : { nsfw: withNSFW }),
      ...(characters !== -1 ? { $expr: { $eq: [{ $strLenCP: "$tagName" }, characters] } } : {}),
    };
    const projection = { _id: 0, __v: 0, inviteCode: 0, guildId: 0, categoryId: 0 };

    const [results, stats] = await Promise.all([
      db
        .collection("servertags")
        .find(query, { projection })
        .sort(sort)
        .limit(serverLimitPerPage + 1)
        .toArray(),
      db.collection("stats").findOne({}, { projection: { _id: 0, __v: 0 } }),
    ]);

    const hasMore = results.length > serverLimitPerPage;
    const servers = hasMore ? results.slice(0, serverLimitPerPage) : results;

    return { servers, stats, hasMore, search, sortBy, NSFW: withNSFW, characters };
  } catch (e) {
    console.error("Error fetching collections:", e);
    return null;
  }
};

export default async function Home({ searchParams }) {
  const { s, sortBy, nsfw, c } = await searchParams;
  const result = await getServers(s, sortBy, nsfw, c);

  if (!result) {
    return notFound();
  }

  return (
    <>
      <Hero totalMembers={result.stats.members} totalServers={result.stats.servers} />
      <ServerDashboard result={result} />
    </>
  );
}
