"use client";

import { useRef, useEffect } from "react";
import { ServerListItem } from "@/components/server-card/server-card";
import { NativeBanner } from "@/components/banners/native-banner";
import { Banner } from "@/components/banners/banner";

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
      {servers.length > 0 && (
        <>
          <NativeBanner id="container-a3853da0402d9b70eb6612e70db53061" />
          <Banner>
            <script type="text/javascript">
              {`atOptions = {
		'key' : '384fcc0fcb10ebda5dd48d69a7eb5c56',
		'format' : 'iframe',
		'height' : 250,
		'width' : 300,
		'params' : {}
	};`}
            </script>
          </Banner>
        </>
      )}

      {isServersLoading && (
        <div className="min-h-96 col-span-full flex justify-center py-4">
          <span className="loading loading-spinner loading-lg text-primary" />
        </div>
      )}
      <div ref={loaderRef} className="absolute bottom-0 left-0 h-96 w-full -z-50" />
    </>
  );
};
