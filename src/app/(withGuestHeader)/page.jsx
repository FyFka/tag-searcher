import { Hero } from "@/components/hero";
import { ServerDashboard } from "@/components/server-dashboard";
import { notFound } from "next/navigation";
import { getServers } from "@/lib/servers";

export const metadata = {
  title: "Search Discord Tags & Badges",
  description:
    "Explore the most up-to-date 2026 Discord guild tags and badges instantly search thousands of tags discover communities personalize your profile.",
  keywords: [
    "Discord special name",
    "Discord channel symbols",
    "Discord guilds list",
    "Discord server tags",
    "Discord badges",
    "Discord guild tags",
    "Server tag directory",
    "Username badges 2026",
    "Discord server icons",
    "Discord servers",
  ],
  alternates: {
    canonical: `https://tagsearcher.org`,
  },
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
