import { ServerList } from "@/components/server-list/server-list";
import { useTranslations } from "next-intl";

export const Servers = ({ servers, serversLoading, hasMore, fetchNextServers }) => {
  const t = useTranslations("servers");
  const isServersForceLoading = serversLoading.loading && serversLoading.force;
  return (
    <div className="grid relative grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 bg-base-300 py-4 pt-0 px-2 md:px-10 xl:px-14">
      {!isServersForceLoading && servers.length === 0 && (
        <div className="min-h-96 flex justify-center items-center flex-col col-span-full">
          <p className="text-center text-2xl font-extrabold">{t("noResults")}</p>
          <p className="text-center text-base">{t("trySearching")}</p>
        </div>
      )}
      {!isServersForceLoading && (
        <ServerList servers={servers} hasMore={hasMore} serversLoading={serversLoading} fetchNextServers={fetchNextServers} />
      )}
      {isServersForceLoading && (
        <div className="min-h-96 col-span-full flex justify-center py-4">
          <span className="loading loading-spinner loading-lg text-primary" />
        </div>
      )}
    </div>
  );
};
