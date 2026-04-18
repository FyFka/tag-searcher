"use client";

import { useRef, useEffect } from "react";
import { ServerListItem } from "@/components/server-card/server-card";
import { NativeBanner } from "@/components/banners/native-banner";

export const ServerList = ({ servers, hasMore, serversLoading, fetchNextServers }) => {
  const loaderRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];

        if (first.isIntersecting && hasMore && !serversLoading.loading) {
          const scrollPosition = window.innerHeight + window.scrollY;
          const threshold = document.body.offsetHeight;
          const nearBottom = scrollPosition >= threshold;

          if (!nearBottom) fetchNextServers();
        }
      },
      { threshold: 0.5 },
    );

    const current = loaderRef.current;
    if (current) observer.observe(current);

    return () => {
      if (current) observer.unobserve(current);
    };
  }, [fetchNextServers]);

  const isServersLoading = serversLoading.loading;
  const showAds = servers.length > 0;
  return (
    <>
      {servers.map((server, idx) => (
        <ServerListItem key={server.profileId} server={server} idx={idx} />
      ))}
      {showAds && (
        <>
          <NativeBanner
            id="container-a3853da0402d9b70eb6612e70db53061"
            src="https://drainalmost.com/a3853da0402d9b70eb6612e70db53061/invoke.js"
          />
          <NativeBanner
            id="container-75ddb1c05461565f2401775c94246293"
            src="https://drainalmost.com/75ddb1c05461565f2401775c94246293/invoke.js"
          />
        </>
      )}
      {isServersLoading && (
        <div className="min-h-96 col-span-full flex justify-center py-4">
          <span className="loading loading-spinner loading-lg text-primary" />
        </div>
      )}
      <div ref={loaderRef} className="absolute bottom-0 left-0 h-64 w-full -z-50" />
    </>
  );
};
