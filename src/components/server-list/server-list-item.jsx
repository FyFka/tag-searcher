"use client";

import Link from "next/link";
import Image from "next/image";
import { formatNumber } from "@/lib/utils";
import {
  useClick,
  useDismiss,
  useRole,
  useInteractions,
  useFloating,
  offset,
  flip,
  shift,
  autoUpdate,
  FloatingFocusManager,
  FloatingPortal,
} from "@floating-ui/react";
import { useState } from "react";
import { ServerTagPreview } from "./server-tag-preview";

export const ServerListItem = ({ server, idx }) => {
  const [isOpen, setIsOpen] = useState(false);

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    middleware: [offset(4), flip(), shift({ padding: 8 })],
    whileElementsMounted: autoUpdate,
  });

  const click = useClick(context);
  const dismiss = useDismiss(context);
  const role = useRole(context);

  const { getReferenceProps, getFloatingProps } = useInteractions([click, dismiss, role]);

  const beautifiedMembersCount = formatNumber(server.membersCount);
  const beautifiedMembersOnline = formatNumber(server.membersOnline);
  const beautifiedVisits = formatNumber(server.visits);

  const isPriority = idx < 4;
  return (
    <div className="card group bg-base-100 w-full shadow-md overflow-hidden rounded-xl relative border-1 border-[color-mix(in_oklab,var(--color-base-content)_10%,transparent)]">
      <button
        ref={refs.setReference}
        {...getReferenceProps()}
        className="btn btn-sm border-none flex items-center gap-1 absolute px-2.5 rounded-full bg-base-100 font-semibold overflow-hidden top-3 left-3 z-20 cursor-pointer shimmer"
      >
        {server.tagImg && (
          <Image
            src={`https://cdn.discordapp.com/${server.tagImg}.webp?size=32`}
            alt={`[${server.tagName}]`}
            width={16}
            height={16}
            className="w-4 h-4 text-transparent"
            unoptimized
            priority={isPriority}
          />
        )}
        <span className="text-base">{server.tagName}</span>
      </button>

      {isOpen && (
        <FloatingPortal>
          <FloatingFocusManager context={context} modal={true}>
            <div ref={refs.setFloating} style={floatingStyles} {...getFloatingProps()}>
              <ServerTagPreview tagImg={server.tagImg} tagName={server.tagName} />
            </div>
          </FloatingFocusManager>
        </FloatingPortal>
      )}

      {server.nsfw && (
        <div className="absolute top-4 right-3 z-20 opacity-65">
          <div className="badge badge-warning badge-sm">
            <span className="text-sm font-bold">NSFW</span>
          </div>
        </div>
      )}

      <div className="relative">
        <figure className="h-40 w-full overflow-hidden bg-primary relative">
          {server.banner && (
            <Image
              src={`https://cdn.discordapp.com/${server.banner}.webp?size=480`}
              alt={`${server.name} banner`}
              width={500}
              height={500}
              className="w-full h-full object-cover object-center text-transparent"
              unoptimized
              priority={isPriority}
            />
          )}
          {server.nsfw && (
            <span className="absolute top-0 left-0 h-full backdrop-blur-xl w-[102%] -translate-x-[1%]"></span>
          )}
        </figure>

        <figure className="h-16 w-16 rounded-2xl absolute -bottom-8 left-4 border-4 border-base-100 bg-base-200 overflow-hidden">
          {server.avatar && (
            <Image
              src={`https://cdn.discordapp.com/${server.avatar}?size=56`}
              className="w-full h-full text-transparent"
              alt={`${server.name} avatar`}
              width={56}
              height={56}
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

      <div className="card-body gap-2 pt-10">
        <h3 className="card-title">{server.name}</h3>
        <div className="flex gap-0.5 justify-between">
          <p className="flex gap-1 items-center text-sm text-base-content/60">
            <span className="status status-success"></span>
            {beautifiedMembersOnline} online
          </p>
          <p className="flex gap-1 items-center justify-end text-sm text-base-content/60">
            <span className="status bg-base-content/80"></span>
            {beautifiedMembersCount} members
          </p>
        </div>
        <p className="text-sm text-base-content/80 overflow-hidden line-clamp-3">{server.description}</p>

        <div className="card-actions items-center justify-end mt-2">
          <p className="text-sm text-base-content/60">
            <span className="font-semibold">{beautifiedVisits}</span> visits
          </p>
          <Link
            href={`/join/${server.profileId}`}
            rel="nofollow noopener noreferrer"
            target="_blank"
            className="btn btn-primary"
            prefetch={false}
          >
            Join Server
          </Link>
        </div>
      </div>
    </div>
  );
};
