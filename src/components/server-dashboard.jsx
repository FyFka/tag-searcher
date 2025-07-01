"use client";
import { Search } from "@/components/search";
import { Servers } from "@/components/servers";
import { useState } from "react";

export const ServerDashboard = ({ result }) => {
  const [dashboard, setDashboard] = useState({ ...result, page: 1, search: "", sortBy: "popular" }); // hasMore
  const [serversLoading, setServersLoading] = useState({ loading: false, force: false });

  const refetchServers = async (search, sortBy) => {
    try {
      setServersLoading({ loading: true, force: true });
      const query = new URLSearchParams({ page: 1, s: search, sortBy }).toString();
      const res = await fetch(`/api/servers?${query}`);
      const data = await res.json();

      setDashboard((prev) => ({ ...prev, servers: data.servers, hasMore: data.hasMore, search, page: 1, sortBy }));
    } catch (err) {
      console.log(err.message);
    } finally {
      setServersLoading({ loading: false, force: false });
    }
  };

  const fetchNextServers = async () => {
    try {
      setServersLoading({ loading: true, force: false });
      const nextPage = dashboard.page + 1;
      const query = new URLSearchParams({ page: nextPage, s: dashboard.search, sortBy: dashboard.sortBy }).toString();
      const res = await fetch(`/api/servers?${query}`);
      const data = await res.json();
      setDashboard((prev) => ({
        ...prev,
        servers: [...prev.servers, ...data.servers],
        hasMore: data.hasMore,
        page: nextPage,
        // sortBy
      }));
    } catch (err) {
      console.log(err.message);
    } finally {
      setServersLoading({ loading: false, force: false });
    }
  };

  return (
    <>
      <Search refetchServers={refetchServers} totalServers={result.stats.servers} totalMembers={result.stats.members} />
      <Servers
        servers={dashboard.servers}
        hasMore={dashboard.hasMore}
        serversLoading={serversLoading}
        fetchNextServers={fetchNextServers}
      />
    </>
  );
};
