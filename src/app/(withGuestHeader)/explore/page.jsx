import { notFound } from "next/navigation";
import { getServers } from "@/lib/servers";
import { Explore } from "@/components/explore/explore";

export const revalidate = 64800; // 12 hours

export const metadata = {
  title: "Explore Discord Tags & Badges",
  description:
    "Browse and explore Discord server tags. Discover communities by tag and join Discord servers directly from the list.",
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

export default async function ExploreHome() {
  const result = await getServers("", "newest", true, -1, 1680);

  if (!result) {
    return notFound();
  }

  return (
    <div>
      <div>
        <Explore servers={result.servers} />
        <div className="absolute -z-10 w-full h-full flex flex-col items-center text-center">
          <h1 className="font-extrabold text-2xl md:text-4xl lg:text-6xl font-mono text-center py-6 opacity-40 select-none">
            Explore Discord Tags
          </h1>
          <p className="opacity-25 select-none">TagSearcher is the place where you can list/find discord tags</p>
        </div>
      </div>
    </div>
  );
}
