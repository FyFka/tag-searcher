import { Hero } from "@/components/hero";
import { ServerDashboard } from "@/components/server-dashboard";
import { notFound } from "next/navigation";
import { getServers } from "@/lib/servers";

export const metadata = {
  title: "Search Discord Tags & Badges",
  description:
    "Explore the most up-to-date 2025 Discord guild tags and badges instantly search thousands of tags discover communities personalize your profile.",
  keywords: [
    "discord",
    "discord servers",
    "discord tag",
    "discord tags",
    "tags discord",
    "discord guild tags",
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
