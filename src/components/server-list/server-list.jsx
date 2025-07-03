"use client";

import { useRef, useEffect } from "react";
import { ServerListItem } from "@/components/server-list/server-list-item";

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
        <ServerListItem key={server.inviteCode} server={server} idx={idx} />
      ))}
      {isServersLoading && (
        <div className="min-h-96 col-span-full flex justify-center py-4">
          <span className="loading loading-spinner loading-lg" />
        </div>
      )}
      <div ref={loaderRef} className="absolute bottom-0 left-0 h-96 w-full -z-50" />
    </>
  );
};
