"use client";

import { TriangleAlert } from "lucide-react";
import { useState } from "react";
import { parseInviteCodeFromUrl } from "@/lib/parse";

export const SubmitServer = () => {
  const [inviteCode, setInviteCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState({});

  const handleSubmit = async (evt) => {
    try {
      evt.preventDefault();
      setLoading(true);

      const res = await fetch("/api/request-server", { method: "POST", body: JSON.stringify({ inviteCode }) });
      const data = await res.json();

      if (data.type === "error") {
        setNotification({ message: data.message, type: "error" });
      } else if (data.type === "success") {
        setNotification({ message: data.message, type: "success" });
      } else {
        setNotification({ message: data.message || "Unexpected error", type: "error" });
      }
    } catch (err) {
      setNotification({ message: data.message || "Unexpected error", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  const handleInviteCodeInput = (evt) => {
    const inputVal = evt.target.value;
    const code = parseInviteCodeFromUrl(inputVal);
    setInviteCode(code);
  };

  const isValidInviteCode = inviteCode.length > 0;
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-1 items-end">
      <fieldset className="fieldset py-0 w-full">
        <legend className="fieldset-legend m-0! pt-0 pb-1 w-full block">Discord Invite Link</legend>
        <div className="flex gap-1 flex-col md:flex-row">
          <label className="input w-full gap-0">
            <span className="text-muted-foreground">https://discord.com/invite/</span>
            <input
              value={inviteCode}
              onInput={handleInviteCodeInput}
              name="Server Name"
              type="text"
              className="grow"
              placeholder="viggle"
            />
          </label>
          <button className="btn btn-primary w-full md:w-32" disabled={loading || !isValidInviteCode} type="submit">
            {loading && <span className="loading loading-spinner loading-sm"></span>}
            {!loading && "Submit Server"}
          </button>
        </div>
      </fieldset>
      {notification.type === "error" && (
        <div className="badge badge-soft badge-error w-full">{notification.message}</div>
      )}
      {notification.type === "success" && (
        <div className="badge badge-soft badge-success w-full">{notification.message}</div>
      )}
      <div className="flex gap-0.5 items-center">
        <TriangleAlert className="inline-block mr-0.75 min-w-4 min-h-4" height={16} width={16} color="#ffd60a" />
        <p className="text-xs text-muted-foreground">
          Make sure your invite link has <strong>infinite uses</strong> and{" "}
          <strong>temporary membership disabled</strong> to avoid removal.
        </p>
      </div>
    </form>
  );
};
