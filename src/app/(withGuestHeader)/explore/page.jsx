import { notFound } from "next/navigation";
import { getServers } from "@/lib/servers";
import { Explore } from "@/components/explore/explore";

export const revalidate = 64800; // 12 hours

export const metadata = {
  title: "Explore Discord Tags & Badges",
  description:
    "Explore the most up-to-date 2026 discord guild tags and badges instantly search thousands of tags discover communities personalize your profile.",
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
    "2026 discord servers",
  ],
  alternates: {
    canonical: `https://tagsearcher.org/explore`,
  },
};

export default async function ExploreHome() {
  const result = await getServers("", "newest", true, -1, 968);

  if (!result) {
    return notFound();
  }

  return <Explore servers={result.servers} />;
}
