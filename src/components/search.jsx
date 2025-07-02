"use client";

import { Hash, Users } from "lucide-react";
import { useMemo } from "react";
import { debounce, formatNumber } from "@/lib/utils";
import { useState } from "react";

export const Search = ({ refetchServers, totalServers, totalMembers }) => {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("popular");
  const [NSFW, setNSFW] = useState(true);

  const debouncedRefetch = useMemo(
    () => debounce((searchValue) => refetchServers(searchValue, sortBy, NSFW), 1000),
    [refetchServers, sortBy, NSFW]
  );

  const handleChangeSortBy = (evt) => {
    const newSortBy = evt.target.value;
    setSortBy(newSortBy);
    refetchServers(search, newSortBy, NSFW);
  };

  const handleToggleNSFW = (evt) => {
    const newNSFW = evt.target.checked;
    setNSFW(newNSFW);
    refetchServers(search, sortBy, newNSFW);
  };

  const onSearchChange = (evt) => {
    const val = evt.target.value;
    if (val.trim().length > 200) return;
    setSearch(val);
    debouncedRefetch(val);
  };

  const beautifiedServers = useMemo(() => formatNumber(totalServers), [totalServers]);
  const beautifiedMembers = useMemo(() => formatNumber(totalMembers), [totalMembers]);

  const handleSubmit = (evt) => {
    evt.preventDefault();
  };

  const NSFWHighlight = NSFW ? "text-base-content" : "";
  return (
    <form
      onSubmit={handleSubmit}
      className="sticky top-16 left-0 backdrop-blur-md bg-base-300/70 z-50 flex flex-col gap-1 py-2 px-2 md:px-10 xl:px-14"
    >
      <div className="flex gap-2 flex-col md:flex-row">
        <input
          onChange={onSearchChange}
          value={search}
          type="text"
          name="search"
          placeholder="Search"
          className="input w-full"
        />
        <div className="gap-2 items-center hidden md:flex min-w-[260px]">
          <div className="flex items-center gap-0.5">
            <Hash height={20} width={20} className="opacity-60" />
            <span className="text-nowrap">{beautifiedServers} servers</span>
          </div>
          <div className="flex items-center gap-0.5">
            <Users height={20} width={20} className="text-primary" />
            <span className="text-nowrap">{beautifiedMembers} members</span>
          </div>
        </div>
      </div>
      <div className="flex gap-1 items-center">
        <select
          onChange={handleChangeSortBy}
          defaultValue="Xsmall"
          name="Sort by"
          className="select select-sm max-w-40"
        >
          <option value="popular">Most popular</option>
          <option value="relevant">Most relevant</option>
          <option value="newest">Newest</option>
        </select>
        <label className="label px-2.5 py-1.25 bg-base-100 border-1 border-input-color border-[color-mix(in_oklab,var(--color-base-content)_20%,transparent)] rounded-2xl">
          <input
            onChange={handleToggleNSFW}
            name="NSFW toggle"
            type="checkbox"
            defaultChecked={NSFW}
            className="toggle toggle-sm"
          />
          <span className={`text-sm ${NSFWHighlight}`}>NSFW</span>
        </label>
      </div>
    </form>
  );
};
