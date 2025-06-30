import Link from "next/link";
import { Users } from "lucide-react";
import Image from "next/image";

export const Servers = ({ servers }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 bg-base-300 py-4 pt-0 px-2 md:px-10">
      {servers.length === 0 && (
        <div className="min-h-48 flex justify-center items-center col-span-full">
          <p className="text-center text-2xl font-extrabold">No servers found</p>
        </div>
      )}
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
            <figure className="h-28 w-full overflow-hidden">
              <Image
                src={`${server.cover}.webp?size=480`}
                alt="Server cover"
                width={500}
                height={500}
                className="w-full h-full object-cover"
                unoptimized
              />
            </figure>

            <figure className="h-16 w-16 rounded-full absolute -bottom-8 left-4 border-4 border-base-100 overflow-hidden">
              <Image
                src={`${server.avatar}.webp?size=64`}
                className="w-full h-full"
                alt="Server avatar"
                width={64}
                height={64}
                unoptimized
              />
            </figure>
          </div>

          <div className="card-body py-10">
            <h2 className="card-title">{server.name}</h2>
            <div className="flex gap-1 justify-between">
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
    </div>
  );
};
