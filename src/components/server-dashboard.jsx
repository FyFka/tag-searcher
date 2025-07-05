"use client";

import { Search } from "@/components/search";
import { Servers } from "@/components/servers";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export const ServerDashboard = ({ result }) => {
  const pathname = usePathname();
  const [dashboard, setDashboard] = useState({ ...result, page: 1 });
  const [serversLoading, setServersLoading] = useState({ loading: false, force: false });

  const fetchServers = async ({
    page = 1,
    search = dashboard.search,
    sortBy = dashboard.sortBy,
    NSFW = dashboard.NSFW,
    append = false,
  }) => {
    try {
      setServersLoading({ loading: true, force: !append });

      const query = new URLSearchParams({ page, s: search, sortBy, NSFW }).toString();
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
      }));
    } catch (err) {
      console.error(err.message);
    } finally {
      setServersLoading({ loading: false, force: false });
    }
  };

  const createQueryWithDefaultParams = (search, sortBy, NSFW) => {
    const defaultParams = { search: "", sortBy: "relevant", NSFW: true };
    const params = {};

    if (search !== defaultParams.search) params.s = search;
    if (sortBy !== defaultParams.sortBy) params.sortBy = sortBy;
    if (NSFW !== defaultParams.NSFW) params.nsfw = NSFW;

    return new URLSearchParams(params).toString();
  };

  const forceRefreshServers = async (search, sortBy, NSFW, isPopState) => {
    if (!isPopState) {
      const query = createQueryWithDefaultParams(search, sortBy, NSFW);
      window.history.pushState(null, "", `${pathname}?${query}`);
    }

    await fetchServers({ page: 1, search, sortBy, NSFW });
  };

  return (
    <>
      <Search
        refetchServers={forceRefreshServers}
        totalServers={result.stats.servers}
        totalMembers={result.stats.members}
        initSetup={{ search: result.search, sortBy: result.sortBy, NSFW: result.NSFW }}
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
