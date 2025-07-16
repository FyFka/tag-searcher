"use client";

import { Search as SearchIcon } from "lucide-react";
import { useMemo, useState, useEffect } from "react";
import { debounce } from "@/lib/utils";
import { maxSearchLength, searchDebounce } from "@/config";
import { SuggestedTags } from "./suggested-tags";

export const Search = ({ refetchServers, initSetup }) => {
  const [search, setSearch] = useState(initSetup.search);
  const [sortBy, setSortBy] = useState(initSetup.sortBy);
  const [NSFW, setNSFW] = useState(initSetup.NSFW);

  useEffect(() => {
    const onPopState = () => {
      const params = new URLSearchParams(window.location.search);
      const s = params.get("s") || "";
      const sortBy = params.get("sortBy") || "relevant";
      const nsfw = params.get("nsfw") !== "false";

      setSearch(s);
      setSortBy(sortBy);
      setNSFW(nsfw);
      refetchServers(s, sortBy, nsfw, true);
    };

    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  const debouncedRefetch = useMemo(
    () => debounce((searchValue) => refetchServers(searchValue, sortBy, NSFW), searchDebounce),
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
    if (val.trim().length > maxSearchLength) return;
    setSearch(val);
    debouncedRefetch(val);
  };

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
        <div className="relative flex-10">
          <label className="input w-full pr-32 md:pr-40 lg:pr-[300px]">
            <SearchIcon width={22} height={22} />
            <input
              onChange={onSearchChange}
              value={search}
              type="text"
              name="search"
              placeholder="Search"
              className="w-full"
            />
          </label>
          <SuggestedTags onSearchChange={onSearchChange} search={search} />
        </div>
      </div>
      <div className="flex gap-1 items-center">
        <select
          aria-label="Sort by"
          onChange={handleChangeSortBy}
          name="Sort by"
          value={sortBy}
          className="select select-sm max-w-40"
        >
          <option value="relevant">Most Relevant</option>
          <option value="popular">Most Popular</option>
          <option value="visited">Most Visited</option>
          <option value="newest">Newest</option>
        </select>
        <label className="label px-2.5 py-1.25 bg-base-100 border-1 border-[color-mix(in_oklab,var(--color-base-content)_20%,transparent)] rounded-2xl">
          <input
            onChange={handleToggleNSFW}
            name="NSFW toggle"
            type="checkbox"
            checked={NSFW}
            className="toggle toggle-sm"
          />
          <span className={`text-sm ${NSFWHighlight}`}>NSFW</span>
        </label>
      </div>
    </form>
  );
};
