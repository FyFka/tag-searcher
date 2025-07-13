import { Hero } from "@/components/hero";
import { ServerDashboard } from "@/components/server-dashboard";
import { notFound } from "next/navigation";
import { getFastRoute, getServers } from "@/lib/servers";

export const generateMetadata = async ({ params }) => {
  try {
    const { slug } = await params;
    const fastRoute = await getFastRoute(slug);

    if (!fastRoute || !fastRoute.tagName)
      return {
        title: "Page not found",
      };

    const tag = fastRoute.tagName;

    return {
      title: `Find Discord Servers with ${tag} tag`,
      description: `Explore active Discord communities using the "${tag}" tag. Instantly search servers, discover unique tags, and personalize your Discord experience.`,
      keywords: [
        "discord",
        "discord server",
        `discord badge ${tag}`,
        `discord ${tag} tag`,
        `discord servers with ${tag}`,
        `find discord servers with ${tag} tag`,
        `discord servers using tag ${tag}`,
        `discord servers with server tag ${tag}`,
        `search discord servers with ${tag} tag`,
        `explore discord servers with ${tag}`,
        `join discord communities tagged ${tag}`,
        `discord channels with ${tag} tag`,
        `top discord servers with ${tag} tag`,
        `trending discord tags`,
        `active discord servers tagged ${tag}`,
        `best discord servers for ${tag}`,
        `discord groups related to ${tag}`,
      ],
      alternates: {
        canonical: `https://tagsearcher.org/tag/${slug}`,
      },
    };
  } catch (error) {
    return {
      title: "Page not found",
    };
  }
};

export default async function FastRouteServerTag({ params }) {
  const { slug } = await params;
  const fastRoute = await getFastRoute(slug);

  if (!fastRoute || !fastRoute.tagName) return notFound();

  const result = await getServers(fastRoute.tagName);

  if (!result) return notFound();

  const customDescription = `Explore the most up-to-date collection of Discord servers with the "${fastRoute.tagName}" tag. Browse thousands of communities, and personalize your profile to stand out.`;
  return (
    <>
      <Hero
        totalMembers={result.stats.members}
        totalServers={result.stats.servers}
        customDescription={customDescription}
      />
      <ServerDashboard result={result} fastRoute />
    </>
  );
}
