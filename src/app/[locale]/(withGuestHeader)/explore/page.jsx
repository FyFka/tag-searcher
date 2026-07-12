import { notFound } from "next/navigation";
import { getServers } from "@/lib/servers";
import { Explore } from "@/components/explore/explore";
import { getTranslations } from "next-intl/server";
import { getAlternates } from "@/lib/metadata";

export const revalidate = 64800; // 12 hours

export const generateMetadata = async () => {
  const t = await getTranslations("metadata.explore");
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
    alternates: getAlternates("/explore"),
  };
};

export default async function ExploreHome() {
  const result = await getServers("", "newest", true, -1, 1680);
  const t = await getTranslations("metadata.explore");

  if (!result) {
    return notFound();
  }

  return (
    <div>
      <Explore servers={result.servers} />
      <div className="absolute -z-10 w-full h-full flex flex-col items-center text-center">
        <h1 className="font-extrabold text-2xl md:text-4xl lg:text-6xl font-mono text-center py-6 opacity-40 select-none">
          {t("heading")}
        </h1>
        <p className="opacity-25 select-none">{t("subheading")}</p>
      </div>
    </div>
  );
}
