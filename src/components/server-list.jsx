"use client";

import Link from "next/link";
import { Users } from "lucide-react";
import Image from "next/image";
import { useRef, useEffect } from "react";

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
      {servers.map((server) => (
        <div key={server.inviteCode} className="card bg-base-100 w-full shadow-md overflow-hidden rounded-xl relative">
          <div className="absolute top-3 left-3 z-10">
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full font-semibold bg-base-100 text-base">
              {server.tagImg && (
                <Image
                  src={`${server.tagImg}.webp?size=16`}
                  alt={`${server.name} tag`}
                  width={16}
                  height={16}
                  className="w-4 h-4"
                  unoptimized
                />
              )}
              {server.tagName}
            </span>
          </div>

          <div className="relative">
            <figure className="h-32 w-full overflow-hidden bg-primary">
              {server.banner && (
                <Image
                  src={`${server.banner}.webp?size=480`}
                  alt="Server banner"
                  width={500}
                  height={500}
                  className="w-full h-full object-cover object-center"
                  unoptimized
                />
              )}
            </figure>

            <figure className="h-16 w-16 rounded-full absolute -bottom-8 left-4 border-4 border-base-100  bg-base-200 overflow-hidden">
              {server.avatar && (
                <Image
                  src={`${server.avatar}.webp?size=64`}
                  className="w-full h-full"
                  alt="Server avatar"
                  width={64}
                  height={64}
                  unoptimized
                />
              )}
              {!server.avatar && (
                <div className="h-full w-full flex items-center justify-center">
                  <span className="text-base font-extrabold">{server.name.slice(0, 1)}</span>
                </div>
              )}
            </figure>
          </div>

          <div className="card-body py-10">
            <h2 className="card-title">{server.name}</h2>
            <div className="flex gap-0.5 justify-between">
              <p className="flex gap-1 items-center text-sm text-base-content/60">
                <Users height={14} width={14} className="text-primary" /> {server.membersCount.toLocaleString()} members
              </p>
              <p className="flex gap-1 items-center justify-end text-sm text-base-content/60">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span> {server.membersOnline.toLocaleString()}{" "}
                online
              </p>
            </div>
            <p className="text-sm text-base-content/80 overflow-hidden line-clamp-3">{server.description}</p>

            <div className="card-actions justify-end mt-2">
              <Link
                href={`https://discord.com/invite/${server.inviteCode}`}
                rel="noopener noreferrer"
                target="_blank"
                className="btn btn-primary "
              >
                Join Server
              </Link>
            </div>
          </div>
        </div>
      ))}
      {isServersLoading && (
        <div className="min-h-48 col-span-full flex justify-center py-4">
          <span className="loading loading-spinner loading-lg" />
        </div>
      )}
      <div ref={loaderRef} className="absolute bottom-0 left-0 h-96 w-full -z-50" />
    </>
  );
};
