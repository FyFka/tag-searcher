import { Hero } from "@/components/hero";
import client from "@/lib/mongodb";
import { dbName, serverLimitPerPage } from "@/config";
import { ServerDashboard } from "@/components/server-dashboard";
import { notFound } from "next/navigation";
import { getSortByType, parseSortBy } from "@/lib/parse";

export const metadata = {
  title: "Discord Server Tags & Profile Badges | 2025 Directory & Search",
  description:
    "Explore the most up-to-date collection of Discord server tags and profile badges for 2025. Search thousands of tags, discover new communities, and personalize your profile to stand out.",
  keywords: [
    "discord server tags",
    "discord badges",
    "discord profile badges",
    "discord tags 2025",
    "discord server",
    "new discord badges 2025",
    "server tag search",
    "server tag finder",
    "discord tag directory",
    "list of Discord tags",
    "how to get discord server tags",
    "discord profile customization",
    "username flair",
    "discord community tags",
  ],
  openGraph: {
    url: "https://tagsearcher.lol/",
    type: "website",
    title: "The Ultimate 2025 Discord Server Tag & Profile Badge Directory",
    description:
      "Search, find, and explore the most complete collection of Discord server tags and profile badges for 2025. Customize your profile and discover new communities.",
    images: [
      {
        url: "https://tagsearcher.lol/preview.webp",
        width: 1200,
        height: 630,
        alt: "A display of various Discord Server Tags and Profile Badges available to search on TagSearcher.lol.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Ultimate 2025 Discord Server Tag & Profile Badge Directory",
    description:
      "Search, find, and explore the most complete collection of Discord server tags and profile badges for 2025. Customize your profile and discover new communities.",
    images: [
      {
        url: "https://tagsearcher.lol/preview.webp",
        width: 1200,
        height: 630,
        alt: "A display of various Discord Server Tags and Profile Badges available to search on TagSearcher.lol.",
      },
    ],
  },
  alternates: { canonical: "https://tagsearcher.lol/" },
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
