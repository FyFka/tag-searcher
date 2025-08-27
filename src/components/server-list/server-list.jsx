"use client";

import { useRef, useEffect } from "react";
import { ServerListItem } from "@/components/server-card/server-card";
import AdCard from "./server-list-ad-card";

export const ServerList = ({ servers, hasMore, serversLoading, fetchNextServers }) => {
  const loaderRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first.isIntersecting && hasMore && !serversLoading.loading) {
          fetchNextServers();
        }
      },
      { threshold: 0.5 }
    );

    const current = loaderRef.current;
    if (current) observer.observe(current);

    return () => {
      if (current) observer.unobserve(current);
    };
  }, [fetchNextServers]);

  const isServersLoading = serversLoading.loading;
  return (
    <>
      {servers.map((server, idx) => (
        <ServerListItem key={server.profileId} server={server} idx={idx} />
      ))}
      {servers.length > 0 && <AdCard />}
      {isServersLoading && (
        <div className="min-h-96 col-span-full flex justify-center py-4">
          <span className="loading loading-spinner loading-lg text-primary" />
        </div>
      )}
      <div ref={loaderRef} className="absolute bottom-0 left-0 h-96 w-full -z-50" />
    </>
  );
};
