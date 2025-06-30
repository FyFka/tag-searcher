import { Hash, Users } from "lucide-react";

export const Search = ({ totalServers, totalMembers }) => {
  return (
    <form className="sticky top-16 left-0 backdrop-blur-md bg-base-300/70 z-50 py-4 flex gap-2 flex-col md:flex-row px-2 md:px-10">
      <input type="text" name="search" placeholder="Search by tag or server name..." className="input w-full" />
      <div className="flex gap-2 items-center">
        <div className="flex items-center text-nowrap gap-0.5">
          <Hash height={20} width={20} className="opacity-60" />
          <span>{totalServers.toLocaleString()} servers</span>
        </div>
        <div className="flex items-center text-nowrap gap-1">
          <Users height={20} width={20} className="text-primary" />
          <span>{totalMembers.toLocaleString()} members</span>
        </div>
      </div>
    </form>
  );
};
