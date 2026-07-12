import { Hero } from "@/components/hero";
import { ServerDashboard } from "@/components/server-dashboard";
import { notFound } from "next/navigation";
import { getFastRoute, getServers, getStats } from "@/lib/servers";
import { getTranslations } from "next-intl/server";
import { getAlternates } from "@/lib/metadata";

export const generateMetadata = async ({ params }) => {
  const p = await params;
  const t = await getTranslations("metadata.tag");
  return {
    title: t("title", { tag: p.slug }),
    description: t("description", { tag: p.slug }),
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
    alternates: getAlternates(`/tag/${p.slug}`),
  };
};

export default async function TagPage({ params, searchParams }) {
  const p = await params;
  const s = await searchParams;
  const { slug } = p;
  const { sortBy, nsfw, c } = s;

  const [stats, fastRoute] = await Promise.all([getStats(), getFastRoute(slug)]);

  if (!stats || !fastRoute) {
    return notFound();
  }

  const result = await getServers(fastRoute.tagName, sortBy, nsfw, c);

  if (!result) return notFound();

  const t = await getTranslations("metadata.tag");

  return (
    <>
      <Hero
        totalMembers={stats.members}
        totalServers={stats.servers}
        totalVisits={stats.visits}
        customDescription={t("heroDescription", { tag: fastRoute.tagName })}
        customTitle={fastRoute.tagName}
        linkToSearchPage={false}
      />
      <ServerDashboard result={result} fastRoute={true} />
    </>
  );
}
