"use client";
import { Search } from "@/components/search";
import { Servers } from "@/components/servers";
import { useState } from "react";

export const ServerDashboard = ({ result }) => {
  const [dashboard, setDashboard] = useState({ ...result, page: 1, search: "", sortBy: "popular", NSFW: true });
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

  return (
    <>
      <Search
        refetchServers={(search, sortBy, NSFW) => fetchServers({ page: 1, search, sortBy, NSFW })}
        totalServers={result.stats.servers}
        totalMembers={result.stats.members}
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
