import { Hero } from "@/components/hero";
import { ServerDashboard } from "@/components/server-dashboard";
import { notFound } from "next/navigation";
import { getFastRoute, getServers } from "@/lib/servers";

export const generateMetadata = async ({ params }) => {
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
      `Discord special name with ${tag}`,
      `Discord server tag ${tag}`,
      `Discord badge ${tag}`,
      `Discord profile badge ${tag}`,
      `Discord tag ${tag}`,
      "Server tag directory",
      `Username badge ${tag} 2026`,
      "Discord tag list",
      `Discord server ${tag} icons`,
      `Discord servers related to ${tag}`,
    ],
  };
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
        totalVisits={result.stats.visits}
        customDescription={customDescription}
      />
      <ServerDashboard result={result} fastRoute />
    </>
  );
}
