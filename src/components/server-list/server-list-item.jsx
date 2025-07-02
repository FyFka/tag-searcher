"use client";

import Link from "next/link";
import { Users } from "lucide-react";
import Image from "next/image";
import { formatNumber } from "@/lib/utils";

export const ServerListItem = ({ server, idx }) => {
  const beautifiedMembersCount = formatNumber(server.membersCount);
  const beautifiedMembersOnline = formatNumber(server.membersOnline);

  const isPriority = idx < 4;
  return (
    <div className="card bg-base-100 w-full shadow-md overflow-hidden rounded-xl relative">
      <div className="absolute top-3 left-3 z-20">
        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full font-semibold bg-base-100">
          {server.tagImg && (
            <Image
              src={`${server.tagImg}.webp?size=16`}
              alt={`${server.name} tag`}
              width={16}
              height={16}
              className="w-4 h-4"
              unoptimized
              priority={isPriority}
              data-idx={idx}
            />
          )}
          <span className="text-base">{server.tagName}</span>
        </span>
      </div>

      {server.nsfw && (
        <div className="absolute top-4 right-3 z-20 opacity-65">
          <div className="badge badge-error badge-sm">
            <span className="text-sm">NSFW</span>
          </div>
        </div>
      )}

      <div className="relative">
        <figure className="h-32 w-full overflow-hidden bg-primary relative">
          {server.banner && (
            <Image
              src={`${server.banner}.webp?size=480`}
              alt="Server banner"
              width={500}
              height={500}
              className="w-full h-full object-cover object-center"
              unoptimized
              priority={isPriority}
            />
          )}
          {server.nsfw && (
            <span className="absolute top-0 left-0 h-full backdrop-blur-sm w-[102%] -translate-x-[1%]"></span>
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
              priority={isPriority}
            />
          )}
          {!server.avatar && (
            <div className="h-full w-full flex items-center justify-center">
              <span className="text-base font-extrabold">{server.name.slice(0, 1)}</span>
            </div>
          )}
        </figure>
      </div>

      <div className="card-body pt-10">
        <h2 className="card-title">{server.name}</h2>
        <div className="flex gap-0.5 justify-between">
          <p className="flex gap-1 items-center text-sm text-base-content/60">
            <Users height={14} width={14} className="text-primary" />
            {beautifiedMembersCount} members
          </p>
          <p className="flex gap-1 items-center justify-end text-sm text-base-content/60">
            <span aria-label="success" className="status status-success"></span>
            {beautifiedMembersOnline} online
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
  );
};
