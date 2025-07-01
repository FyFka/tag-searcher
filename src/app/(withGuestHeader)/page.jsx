import { Hero } from "@/components/hero";
import { Search } from "@/components/search";
import { Servers } from "@/components/servers";
import client from "@/lib/mongodb";
import { dbName } from "@/config";

const getServers = async () => {
  try {
    const connection = await client;
    const db = connection.db(dbName);

    const servers = await db.collection("servertags").find({}, { _id: 0 }).limit(35).toArray();
    const stats = await db.collection("stats").findOne({});

    return { servers, stats };
  } catch (e) {
    console.error("Error fetching collections:", e);
    return [];
  }
};

export default async function Home() {
  const result = await getServers();

  if (!result) {
    return notFound();
  }

  return (
    <div>
      <Hero />
      <Search totalServers={result.stats.servers} totalMembers={result.stats.members} />
      <Servers servers={result.servers} />
    </div>
  );
}
