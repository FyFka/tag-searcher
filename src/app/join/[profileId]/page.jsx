"use client";

import { useState } from "react";
import { Turnstile } from "next-turnstile";

export default function JoinPage({ params }) {
  const { profileId } = params;
  const [turnstileToken, setTurnstileToken] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleJoin = async () => {
    if (!turnstileToken) {
      setError("Please complete the captcha first");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`/api/get-invite/${profileId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ turnstileToken }),
      });

      const data = await res.json();

      if (!res.ok || !data.inviteCode) {
        setError(data.error || "Failed to get invite");
        setLoading(false);
        return;
      }

      window.location.href = `https://discord.com/invite/${data.inviteCode}`;
    } catch (err) {
      console.error(err);
      setError("Unexpected error");
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-3xl font-bold mb-4">Join our Discord</h1>
      {error && <div className="text-red-500 mb-2">{error}</div>}

      <button onClick={handleJoin} disabled={loading} className="btn btn-primary mb-4">
        {loading ? "Redirecting..." : "Join Discord"}
      </button>

      <Turnstile
        siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY}
        onVerify={(token) => {
          setTurnstileToken(token);
          setError(null);
        }}
      />
    </div>
  );
}
