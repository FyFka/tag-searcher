import { Hero } from "@/components/hero";
import { Search } from "@/components/search";
import { Servers } from "@/components/servers";

export default function Home() {
  return (
    <div>
      <Hero />
      <Search />
      <Servers />
    </div>
  );
}
