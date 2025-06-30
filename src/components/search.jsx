import { Hash, Users } from "lucide-react";

export const Search = () => {
  return (
    <form className="px-10 py-2 bg-base-300 flex gap-2">
      <input
        type="text"
        name="search"
        placeholder="Search tags, servers, or descriptions"
        className="input input-lg w-full"
      />
      <div className="flex gap-2 items-center justify-center">
        <div className="flex items-center text-nowrap gap-0.5">
          <Hash height={20} width={20} className="opacity-60" />
          1000 servers
        </div>
        <div className="flex items-center text-nowrap gap-1">
          <Users height={20} width={20} className="text-primary" /> 83,990 members
        </div>
      </div>
    </form>
  );
};
