"use client";

import { Search } from "@/components/search/search";
import { Servers } from "@/components/servers";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { createQueryWithDefaultParams } from "@/lib/utils";

export const ServerDashboard = ({ result, fastRoute }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [dashboard, setDashboard] = useState({ ...result, page: 1 });
  const [serversLoading, setServersLoading] = useState({ loading: false, force: false });

  const fetchServers = async ({
    page = 1,
    search = dashboard.search,
    sortBy = dashboard.sortBy,
    NSFW = dashboard.NSFW,
    characters = dashboard.characters,
    append = false,
  }) => {
    try {
      setServersLoading({ loading: true, force: !append });

      const query = createQueryWithDefaultParams(search, sortBy, NSFW, characters, page);
      const res = await fetch(`/api/servers?${query}`);
      const data = await res.json();

      setDashboard((prev) => ({
        ...prev,
        servers: append ? [...prev.servers, ...data.servers] : data.servers,
        hasMore: data.hasMore,
        page,
        search,
        sortBy,
        NSFW,
        characters,
      }));
    } catch (err) {
      console.error(err.message);
    } finally {
      setServersLoading({ loading: false, force: false });
    }
  };

  const forceRefreshServers = async (search, sortBy, NSFW, characters, isPopState) => {
    if (fastRoute) {
      const query = createQueryWithDefaultParams(search, sortBy, NSFW, characters);
      router.push(`/?${query}`);
      return;
    }

    if (!isPopState) {
      const query = createQueryWithDefaultParams(search, sortBy, NSFW, characters);
      globalThis.history.pushState(null, "", `${pathname}?${query}`);
    }

    await fetchServers({ page: 1, search, sortBy, NSFW, characters });
    globalThis.scrollTo({ top: 0 });
  };

  return (
    <>
      <Search
        refetchServers={forceRefreshServers}
        initSetup={{ search: result.search, sortBy: result.sortBy, NSFW: result.NSFW, characters: result.characters }}
      />
      <Servers
        servers={dashboard.servers}
        hasMore={dashboard.hasMore}
        serversLoading={serversLoading}
        fetchNextServers={() => fetchServers({ page: dashboard.page + 1, append: true })}
      />
    </>
  );
};
