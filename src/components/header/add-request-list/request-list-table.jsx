import { formatDate } from "@/lib/datetime";
import { useTranslations } from "next-intl";

export const RequestListTable = ({ requests, loading }) => {
  const t = useTranslations("requestList");
  const ts = useTranslations("servers");
  return (
    <table className="table table-pin-rows">
      <thead>
        <tr className="bg-base-300">
          <th>{t("requestDate")}</th>
          <th>{t("inviteCode")}</th>
          <th>{t("status")}</th>
          <th>{t("resolveDate")}</th>
        </tr>
      </thead>
      <tbody>
        {requests.length === 0 && !loading && (
          <tr>
            <td colSpan={4} className="text-center">
              <div className="min-h-48 flex justify-center items-center flex-col col-span-full">
                <p className="text-center text-xl font-extrabold">{ts("noResults")}</p>
                <p className="text-center text-sm">{ts("trySearching")}</p>
              </div>
            </td>
          </tr>
        )}
        {loading && (
          <tr>
            <td colSpan={4} className="text-center">
              <div className="min-h-48 flex justify-center items-center flex-col col-span-full">
                <span className="loading loading-spinner loading-lg text-primary" />
              </div>
            </td>
          </tr>
        )}
        {!loading &&
          requests.map((req, i) => (
            <tr className="text-nowrap" key={i}>
              <td>{formatDate(req.requestedAt)}</td>
              <td>{req.inviteCode}</td>
              <td>{req.status}</td>
              <td>{req.resolvedAt ? formatDate(req.resolvedAt) : "-"}</td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};
