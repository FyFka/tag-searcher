import { Hero } from "@/components/hero";
import { Search } from "@/components/search";
import { Servers } from "@/components/servers";
import client from "@/lib/mongodb";
import { dbName } from "@/config";

const getServers = async () => {
  try {
    const connection = await client;
    const db = connection.db(dbName);

    const servers = await db.collection("servertags").find({}, { _id: 0 }).toArray();

    if (!servers) return [];

    return servers;
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
      <Search totalServers={1000} totalMembers={83990} />
      <Servers servers={result} />
    </div>
  );
}
