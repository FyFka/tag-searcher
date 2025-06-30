import { Hash, Users } from "lucide-react";

export const Search = ({ totalServers, totalMembers }) => {
  return (
    <form className="px-10 pt-4 bg-base-300 flex gap-2 flex-col md:flex-row">
      <input
        type="text"
        name="search"
        placeholder="Search by tag or server name..."
        className="input md:input-lg w-full"
      />
      <div className="flex gap-2 items-center">
        <div className="flex items-center text-nowrap gap-0.5">
          <Hash height={20} width={20} className="opacity-60" />
          {totalServers.toLocaleString()} servers
        </div>
        <div className="flex items-center text-nowrap gap-1">
          <Users height={20} width={20} className="text-primary" />
          {totalMembers.toLocaleString()} members
        </div>
      </div>
    </form>
  );
};
