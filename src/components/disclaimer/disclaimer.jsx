"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { getCookie, setCookie } from "@/lib/cookie";

export const Disclaimer = () => {
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

  const shortText = "Our website uses cookies to improve its performance.";
  const longText =
    "Our website uses cookies to improve its performance, convenience, and efficiency. By continuing to use the website, you consent to the processing of personal data by TagSearcher using the Clarity analytics program. This allows us to analyze visitor interactions with the website and make it better.";
  const text = isMore ? longText : shortText;
  return (
    <aside className="fixed bottom-2 md:bottom-14 right-3 left-3 w-auto md:left-auto md:right-12 xl:right-16 z-50 md:w-80 flex flex-col gap-4 p-4 rounded-2xl shadow-lg backdrop-blur-md bg-base-300/90 border-[color-mix(in_oklab,var(--color-base-content)_10%,transparent)] border-1">
      <button
        onClick={handleAccept}
        className="btn btn-neutral absolute top-4 right-4 h-7 w-7 p-0 rounded-full z-50 group"
        type="button"
      >
        <X className="opacity-85 group-hover:opacity-100" height={14} width={14} />
      </button>
      <span className="text-xl font-bold">Cookies</span>
      <div className="flex flex-col gap-1">
        <p className="text-sm">{text}</p>
        {!isMore && (
          <span onClick={handleToggleMore} className="link text-sm">
            Learn more
          </span>
        )}
      </div>
      <div onClick={handleAccept} className="btn btn-neutral gap-1 btn-sm msm:btn-md">
        Got it
      </div>
    </aside>
  );
};
