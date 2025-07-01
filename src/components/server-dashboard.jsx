"use client";
import { Search } from "@/components/search";
import { Servers } from "@/components/servers";
import { useState } from "react";

export const ServerDashboard = ({ result }) => {
  const [dashboard, setDashboard] = useState({ ...result, page: 1, search: "" }); // hasMore
  const [serversLoading, setServersLoading] = useState({ loading: false, force: false });

  const refetchServersWithSearch = async (search) => {
    try {
      setServersLoading({ loading: true, force: true });
      const query = new URLSearchParams({ page: 1, s: search }).toString();
      const res = await fetch(`/api/servers?${query}`);
      const data = await res.json();

      setDashboard((prev) => ({ ...prev, servers: data.servers, hasMore: data.hasMore, search, page: 1 }));
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
      const query = new URLSearchParams({ page: nextPage, s: dashboard.search }).toString();
      const res = await fetch(`/api/servers?${query}`);
      const data = await res.json();
      setDashboard((prev) => ({
        ...prev,
        servers: [...prev.servers, ...data.servers],
        hasMore: data.hasMore,
        page: nextPage,
      }));
    } catch (err) {
      console.log(err.message);
    } finally {
      setServersLoading({ loading: false, force: false });
    }
  };

  return (
    <>
      <Search
        refetchServersWithSearch={refetchServersWithSearch}
        totalServers={result.stats.servers}
        totalMembers={result.stats.members}
      />
      <Servers
        servers={dashboard.servers}
        hasMore={dashboard.hasMore}
        serversLoading={serversLoading}
        fetchNextServers={fetchNextServers}
      />
    </>
  );
};
