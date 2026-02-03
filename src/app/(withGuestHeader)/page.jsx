import { Hero } from "@/components/hero";
import { ServerDashboard } from "@/components/server-dashboard";
import { notFound } from "next/navigation";
import { getServers } from "@/lib/servers";
import { unstable_cache } from "next/cache";

export const metadata = {
  title: "Search Discord Tags & Badges",
  description:
    "Explore the most up-to-date 2026 Discord tags and badges instantly search thousands of tags discover communities personalize your profile.",
  keywords: [
    "Discord special name",
    "Discord channel symbols",
    "Discord guilds list",
    "Discord server tags",
    "Discord badges",
    "Discord tags",
    "Server tag directory",
    "Username badges 2026",
    "Discord server icons",
    "Discord servers",
  ],
};

const getServersStatic = unstable_cache(async () => getServers(), ["home-page-servers"], {
  revalidate: 60 * 60 * 24, // 24h
});

export default async function Home({ searchParams }) {
  const params = await searchParams;
  const { s, sortBy, nsfw, c } = params;
  const hasParams = !!(s || sortBy || nsfw || c);
  const result = hasParams ? await getServers(s, sortBy, nsfw, c) : await getServersStatic();

  if (!result) return notFound();

  return (
    <>
      <Hero totalMembers={result.stats.members} totalServers={result.stats.servers} />
      <ServerDashboard result={result} />
    </>
  );
}
