import { Hero } from "@/components/hero";
import { notFound } from "next/navigation";
import { getStats, getTrendingTagsList } from "@/lib/servers";
import Link from "next/link";
import { getAlternates } from "@/lib/metadata";
import { getTranslations } from "next-intl/server";

export const generateMetadata = async () => {
  const t = await getTranslations("metadata.trendingTags");
  return {
    title: t("title"),
    description: t("description"),
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
    alternates: getAlternates("/trending-tags"),
  };
};

export default async function TrendingTags() {
  const t = await getTranslations("metadata.trendingTags");
  const [stats, trendingTags] = await Promise.all([getStats(), getTrendingTagsList()]);

  if (!stats || !trendingTags || !trendingTags.length) {
    return notFound();
  }

  const customDescription = t("description");
  const customTitle = t("title");
  return (
    <>
      <Hero
        totalMembers={stats.members}
        totalServers={stats.servers}
        totalVisits={stats.visits}
        customDescription={customDescription}
        customTitle={customTitle}
        linkToSearchPage
      />
      <ul className="grid relative grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6 gap-4 bg-base-300 py-4 px-2 md:px-10 xl:px-14">
        {trendingTags.map((tag) => (
          <li
            key={tag.urlSegment}
            className="w-full relative group overflow-hidden bg-base-100 rounded-box border border-[color-mix(in_oklab,var(--color-base-content)_10%,transparent)]"
          >
            <Link className="block font-semibold p-2 relative text-center z-30" href={`/tag/${tag.urlSegment}`} prefetch={false}>
              {tag.tagName}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
