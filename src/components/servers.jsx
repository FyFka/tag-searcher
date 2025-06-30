import Link from "next/link";
import { Users } from "lucide-react";

export const Servers = () => {
  const servers = [...new Array(10)].map((_, i) => ({
    id: i,
    tag: {
      label: "aj",
      icon: "https://cdn.discordapp.com/clan-badges/1369716917010563092/d0a9f69ebef53aea82c28b9683df334d.png",
    },
    title: "The Server of AJs",
    description:
      "ajjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj",
    cover: "https://cdn.discordapp.com/icons/1369716917010563092/9b0cfac697a1572315c754db3a1fd4f6.png",
    avatar: "https://cdn.discordapp.com/icons/1369716917010563092/9b0cfac697a1572315c754db3a1fd4f6.png",
    membersOnline: 100,
    membersCount: 6416,
  }));

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 bg-base-300 px-10 py-4">
      {servers.map((server) => (
        <div key={server.id} className="card bg-base-100 w-full shadow-md overflow-hidden rounded-xl relative">
          <div className="absolute top-3 left-3 z-10">
            <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-semibold bg-base-100`}>
              <img src={server.tag.icon} alt="" className="w-4 h-4" />
              {server.tag.label}
            </span>
          </div>

          <div className="relative">
            <figure className="h-28 w-full overflow-hidden">
              <img src={server.cover} alt="Server cover" className="w-full h-full object-cover" />
            </figure>

            <figure className="h-16 w-16 rounded-full absolute -bottom-8 left-4 border-4 border-base-100 overflow-hidden">
              <img src={server.avatar} alt="Server avatar" className="h-full w-full object-cover" />
            </figure>
          </div>

          <div className="card-body py-10">
            <h2 className="card-title">{server.title}</h2>
            <p className="text-sm text-base-content/80 overflow-hidden line-clamp-2">{server.description}</p>
            <div className="flex justify-between">
              <p className="flex gap-1 items-center text-sm text-base-content/60">
                <Users height={14} width={14} className="text-primary" /> {server.membersCount.toLocaleString()} members
              </p>
              <p className="flex gap-1 items-center justify-end text-sm text-base-content/60">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span> {server.membersOnline.toLocaleString()}{" "}
                online
              </p>
            </div>
            <div className="card-actions justify-end mt-2">
              <Link
                href="https://discord.com/invite/e6ChczScqB"
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
