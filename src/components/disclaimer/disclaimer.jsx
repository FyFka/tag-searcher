"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { getCookie, setCookie } from "@/lib/cookie";
import { useTranslations } from "next-intl";

export const Disclaimer = () => {
  const t = useTranslations("disclaimer");
  const [isMore, setIsMore] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = getCookie("privacy-policy-cookie-consent");
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    setCookie("privacy-policy-cookie-consent", "true", 365); // 1 year
    setIsVisible(false);
  };

  const handleToggleMore = () => setIsMore(!isMore);

  if (!isVisible) return null;

  const text = isMore ? t("longText") : t("shortText");
  return (
    <aside className="fixed bottom-2 md:bottom-9 right-3 left-3 w-auto md:left-auto md:right-12 xl:right-16 z-50 md:w-80 flex flex-col gap-4 p-4 rounded-2xl shadow-md backdrop-blur-md bg-base-300/90 border-[color-mix(in_oklab,var(--color-base-content)_10%,transparent)] border">
      <button
        onClick={handleAccept}
        className="btn btn-neutral absolute top-4 right-4 h-7 w-7 p-0 rounded-full z-50 group"
        aria-label="Close"
        type="button"
      >
        <X className="opacity-85 group-hover:opacity-100" height={14} width={14} />
      </button>
      <span className="text-xl font-bold">{t("title")}</span>
      <div className="flex flex-col gap-1">
        <p className="text-sm">{text}</p>
        {!isMore && (
          <span className="text-sm">
            <button onClick={handleToggleMore} className="link text-sm inline rounded-lg">
              {t("learnMore")}
            </button>
          </span>
        )}
      </div>
      <button onClick={handleAccept} className="btn btn-neutral gap-1 btn-sm msm:btn-md">
        {t("gotIt")}
      </button>
    </aside>
  );
};
