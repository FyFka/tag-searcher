import { formatDate } from "@/lib/datetime";

export const RequestListTable = ({ requests, loading }) => {
  return (
    <table className="table table-pin-rows">
      <thead>
        <tr className="bg-base-300">
          <th>Request Date</th>
          <th>Invite Code</th>
          <th>Status</th>
          <th>Resolve Date</th>
        </tr>
      </thead>
      <tbody>
        {requests.length === 0 && !loading && (
          <tr>
            <td colSpan={4} className="text-center">
              <div className="min-h-48 flex justify-center items-center flex-col col-span-full">
                <p className="text-center text-xl font-extrabold">No results found</p>
                <p className="text-center text-sm">Try searching for something else.</p>
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
            <tr key={i}>
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
