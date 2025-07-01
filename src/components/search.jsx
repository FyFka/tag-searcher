"use client";

import { Hash, Users } from "lucide-react";
import { useMemo } from "react";
import { debounce } from "@/lib/time";
import { useState } from "react";

export const Search = ({ refetchServersWithSearch, totalServers, totalMembers }) => {
  const [search, setSearch] = useState("");

  const formatNumber = (num) => {
    if (num >= 1_000_000_000) return (num / 1_000_000_000).toFixed(1).replace(/\.0$/, "") + "B";
    if (num >= 1_000_000) return (num / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
    if (num >= 1_000) return (num / 1_000).toFixed(1).replace(/\.0$/, "") + "K";
    return num.toString();
  };

  const debouncedRefetch = useMemo(
    () => debounce((searchValue) => refetchServersWithSearch(searchValue), 1000),
    [refetchServersWithSearch]
  );

  const onSearchChange = (evt) => {
    const val = evt.target.value;
    setSearch(val);
    debouncedRefetch(val);
  };

  const beautifiedServers = useMemo(() => formatNumber(totalServers), [totalServers]);
  const beautifiedMembers = useMemo(() => formatNumber(totalMembers), [totalMembers]);

  const handleSubmit = (evt) => {
    evt.preventDefault();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="sticky top-16 left-0 backdrop-blur-md bg-base-300/70 z-50 py-4 flex gap-2 flex-col md:flex-row px-2 md:px-10 xl:px-14"
    >
      <input
        onChange={onSearchChange}
        val={search}
        type="text"
        name="search"
        placeholder="Search"
        className="input w-full"
      />
      <div className="flex gap-2 items-center">
        <div className="flex items-center text-nowrap gap-0.5">
          <Hash height={20} width={20} className="opacity-60" />
          <span>{beautifiedServers} servers</span>
        </div>
        <div className="flex items-center text-nowrap gap-1">
          <Users height={20} width={20} className="text-primary" />
          <span>{beautifiedMembers} members</span>
        </div>
      </div>
    </form>
  );
};
