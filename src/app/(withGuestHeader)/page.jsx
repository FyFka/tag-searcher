import { Hero } from "@/components/hero";
import client from "@/lib/mongodb";
import { dbName, serverLimitPerPage } from "@/config";
import { ServerDashboard } from "@/components/server-dashboard";
import { notFound } from "next/navigation";
import { parseSortBy, parseSearch, getSortByType, parseNSFW } from "@/lib/parse";

export const metadata = {
  title: "Discord Server Tags & Badges",
  description:
    "Explore the most up-to-date collection of Discord server tags and badges for 2025. Search thousands of tags, discover new communities, and personalize your profile to stand out",
  keywords: [
    "discord",
    "discord server",
    "discord tag",
    "tags discord",
    "discord server finder",
    "find discord servers",
    "discord server search",
    "discord server directory",
    "search discord servers by tag",
    "discord community finder",
    "discord tag search",
    "discord server browser",
    "discord server tags",
    "gaming discord servers",
    "anime discord servers",
    "browse discord servers",
    "public server list",
  ],
  openGraph: {
    url: "https://tagsearcher.lol/",
    type: "website",
    title: "Discord Server Tag & Badge Directory",
    description:
      "Search, find, and explore the most complete collection of Discord server tags and badges for 2025. Customize your profile and discover new communities.",
    images: [
      {
        url: "https://tagsearcher.lol/preview.webp",
        width: 1200,
        height: 630,
        alt: "A display of various Discord Server Tags and Badges available to search on TagSearcher.lol.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Discord Server Tag & Badge Directory",
    description:
      "Search, find, and explore the most complete collection of Discord server tags and badges for 2025. Customize your profile and discover new communities.",
    images: [
      {
        url: "https://tagsearcher.lol/preview.webp",
        width: 1200,
        height: 630,
        alt: "A display of various Discord Server Tags and Badges available to search on TagSearcher.lol.",
      },
    ],
  },
};

const getServers = async (userSearch = "", userSortBy = "relevant", nsfw) => {
  try {
    const search = parseSearch(userSearch);
    const sortBy = parseSortBy(userSortBy);
    const sort = getSortByType(sortBy, search);
    const withNSFW = parseNSFW(nsfw);

    const connection = await client;
    const db = connection.db(dbName);

    const query = search ? { $text: { $search: search } } : {};
    const projection = { _id: 0, __v: 0, inviteCode: 0, guildId: 0, categoryId: 0 };

    if (!withNSFW) query.nsfw = withNSFW;

    const results = await db
      .collection("servertags")
      .find(query, { projection })
      .sort(sort)
      .limit(serverLimitPerPage + 1)
      .toArray();

    const hasMore = results.length > serverLimitPerPage;
    const servers = hasMore ? results.slice(0, serverLimitPerPage) : results;

    const stats = await db.collection("stats").findOne({}, { projection: { _id: 0, __v: 0 } });

    return { servers, stats, hasMore, search, sortBy, NSFW: withNSFW };
  } catch (e) {
    console.error("Error fetching collections:", e);
    return null;
  }
};

export default async function Home({ searchParams }) {
  const { s, sortBy, nsfw } = await searchParams;
  const result = await getServers(s, sortBy, nsfw);

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
