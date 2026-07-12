"use client";

import { useState } from "react";
import { Turnstile } from "next-turnstile";
import { useTranslations } from "next-intl";

export const RedirectJoin = ({ profileId }) => {
  const t = useTranslations("captcha");
  const tApi = useTranslations("api");

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
        globalThis.location.href = `https://discord.com/invite/${data.inviteCode}`;
      } else {
        throw new Error(data.message ? tApi(data.message) : t("verificationFailed"));
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
      {loading && <p className="font-semibold">{t("verifying")}</p>}
      {error && <p className="text-error font-semibold">{error}</p>}
    </div>
  );
};
