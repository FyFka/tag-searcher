import { Hero } from "@/components/hero";
import { notFound } from "next/navigation";
import { getStats, getTrendingTagsList } from "@/lib/servers";
import Link from "next/link";

export const metadata = {
  title: "Trending Tags list",
  description:
    "Trending Tags list – curated tags with high server count or strong engagement. Discover what gamers are joining and the most active tags.",
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

export default async function TrendingTags() {
  const [stats, trendingTags] = await Promise.all([getStats(), getTrendingTagsList()]);

  if (!stats || !trendingTags || !trendingTags.length) {
    return notFound();
  }

  const customDescription =
    "Trending Tags list – curated tags with high server count or strong engagement. Discover what gamers are joining and the most active tags.";
  const customTitle = "Trending Tags List";
  return (
    <>
      <Hero
        totalMembers={stats.members}
        totalServers={stats.servers}
        customDescription={customDescription}
        customTitle={customTitle}
        linkToSearchPage
      />
      <ul className="grid relative grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 bg-base-300 py-4 px-2 md:px-10 xl:px-14">
        {trendingTags.map((tag) => (
          <li key={tag.urlSegment} className="w-full relative group overflow-hidden bg-base-100 rounded-box">
            <Link
              className="block font-semibold p-4 relative text-center z-30"
              href={`/tag/${tag.urlSegment}`}
              prefetch={false}
            >
              {tag.tagName}
            </Link>
            <p className="absolute top-0 lef-0 w-full h-full flex items-center justify-center font-extrabold text-5xl text-nowrap uppercase opacity-0 group-hover:opacity-15 z-10 select-none pointer-events-none transition-opacity duration-200">
              View More
            </p>
          </li>
        ))}
      </ul>
    </>
  );
}
