"use client";

import { useState } from "react";
import { Turnstile } from "next-turnstile";

export const RedirectJoin = ({ profileId }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleVerify = async (token) => {
    if (!token) return;

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/verify-join", {
        method: "POST",
        body: JSON.stringify({ profileId, turnstileToken: token }),
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();

      if (res.ok && data.inviteCode) {
        window.location.href = `https://discord.com/invite/${data.inviteCode}`;
      } else {
        throw new Error(data.message || "Verification failed. Please try again.");
      }
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div>
      <Turnstile
        siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY}
        retry="auto"
        refreshExpired="auto"
        theme="dark"
        sandbox={process.env.NODE_ENV === "development"}
        onVerify={handleVerify}
      />
      {loading && <p className="font-semibold">Verifying...</p>}
      {error && <p className="text-red-500 font-semibold">{error}</p>}
    </div>
  );
};
