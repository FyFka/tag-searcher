import { ServerList } from "@/components/server-list/server-list";

export const Servers = ({ servers, serversLoading, hasMore, fetchNextServers }) => {
  const isServersForceLoading = serversLoading.loading && serversLoading.force;
  return (
    <div className="grid relative grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 bg-base-300 py-4 pt-0 px-2 md:px-10 xl:px-14">
      {!isServersForceLoading && servers.length === 0 && (
        <div className="min-h-64 flex justify-center items-center flex-col col-span-full">
          <p className="text-center text-2xl font-extrabold">No results found</p>
          <p className="text-center text-base">Try searching for something else.</p>
        </div>
      )}
      {!isServersForceLoading && (
        <ServerList
          servers={servers}
          hasMore={hasMore}
          serversLoading={serversLoading}
          fetchNextServers={fetchNextServers}
        />
      )}
      {isServersForceLoading && (
        <div className="min-h-64 col-span-full flex justify-center py-4">
          <span className="loading loading-spinner loading-lg" />
        </div>
      )}
    </div>
  );
};
