"use client";

import { Search as SearchIcon } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { RequestListTable } from "@/components/header/add-request-list/request-list-table";
import { Pagination } from "@/components/header/add-request-list/pagination";
import { debounce } from "@/lib/utils";
import { maxSearchInviteCodeLength } from "@/config";

export const AddRequestList = ({ page, setPage, refetchTrigger }) => {
  const [search, setSearch] = useState("");
  const [requests, setRequests] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const fetchRequests = async (pageNum, searchTerm = "") => {
    try {
      setLoading(true);
      const query = new URLSearchParams({ page: pageNum });
      if (searchTerm) query.set("s", searchTerm);

      const res = await fetch(`/api/request-server?${query.toString()}`);
      const data = await res.json();

      setRequests(data.items || []);
      setTotalPages(data.totalPages || 1);
      setPage(data.page || 1);
    } catch (err) {
      console.error("Failed to fetch requests:", err);
    } finally {
      setLoading(false);
    }
  };

  const debouncedFetch = useMemo(() => debounce((pageNum, searchTerm) => fetchRequests(pageNum, searchTerm), 750), []);

  useEffect(() => {
    debouncedFetch(page, search);
  }, [search, debouncedFetch, refetchTrigger]);

  const onSearchChange = (evt) => {
    const val = evt.target.value;
    if (val.length > maxSearchInviteCodeLength) return;
    setSearch(val);
    setPage(1);
  };

  const handlePageChange = async (pageNum) => {
    if (pageNum === page) return;
    await fetchRequests(pageNum, search);
  };

  return (
    <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100 liq-table">
      <div className="p-2 w-full sticky top-auto left-0 z-10 bg-base-300">
        <label className="input w-full">
          <SearchIcon width={22} height={22} />
          <input
            onChange={onSearchChange}
            value={search}
            type="text"
            name="search"
            placeholder="Search by invite code"
            className="w-full"
          />
        </label>
      </div>
      <RequestListTable requests={requests} loading={loading} />
      <div className="flex items-center justify-center py-1 bg-base-300 sticky bottom-auto left-0 z-10">
        <Pagination totalPages={totalPages} currentPage={page} onPageChange={handlePageChange} loading={loading} />
      </div>
    </div>
  );
};
