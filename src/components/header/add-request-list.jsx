import { Search as SearchIcon } from "lucide-react";
import { useState } from "react";

export const AddRequestList = () => {
  const [search, setSearch] = useState("");

  const onSearchChange = (evt) => {
    const val = evt.target.value;
    if (val.length > 48) return;
    setSearch(val);
  };

  return (
    <div className="relative overflow-hidden rounded-box border border-base-content/5 bg-base-100 max-h-96">
      {/* overflow-x-auto */}
      <div className="absolute top-0 left-0 h-full w-full z-50 bg-base-300/70 flex items-center justify-center">
        <p>Currently not available</p>
      </div>
      <div className="p-2 w-full sticky top-auto left-0 z-10 bg-base-300/70">
        <label className="input w-full">
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
      </div>
      <table className="table table-pin-rows">
        <thead>
          <tr className="backdrop-blur-md bg-base-300/70">
            <th>Request Date</th>
            <th>Invite Code</th>
            <th>Status</th>
            <th>Resolve Date</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>-</th>
            <td>-</td>
            <td>-</td>
            <th>-</th>
          </tr>
          <tr>
            <th>-</th>
            <td>-</td>
            <td>-</td>
            <th>-</th>
          </tr>
          <tr>
            <th>-</th>
            <td>-</td>
            <td>-</td>
            <th>-</th>
          </tr>
          <tr>
            <th>-</th>
            <td>-</td>
            <td>-</td>
            <th>-</th>
          </tr>
          <tr>
            <th>-</th>
            <td>-</td>
            <td>-</td>
            <th>-</th>
          </tr>
          <tr>
            <th>-</th>
            <td>-</td>
            <td>-</td>
            <th>-</th>
          </tr>
          <tr>
            <th>-</th>
            <td>-</td>
            <td>-</td>
            <th>-</th>
          </tr>
          <tr>
            <th>-</th>
            <td>-</td>
            <td>-</td>
            <th>-</th>
          </tr>
          <tr>
            <th>-</th>
            <td>-</td>
            <td>-</td>
            <th>-</th>
          </tr>
          <tr>
            <th>-</th>
            <td>-</td>
            <td>-</td>
            <th>24.02.2025</th>
          </tr>
        </tbody>
      </table>
      <div className="flex items-center justify-center py-1 backdrop-blur-md bg-base-300/70 sticky bottom-auto left-0 z-10">
        <div className="join">
          <button className="join-item btn btn-sm">1</button>
          <button className="join-item btn btn-sm">2</button>
          <button className="join-item btn btn-sm btn-disabled">...</button>
          <button className="join-item btn btn-sm">99</button>
          <button className="join-item btn btn-sm">100</button>
        </div>
      </div>
    </div>
  );
};
