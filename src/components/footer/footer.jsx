"use client";

import { Link } from "@/i18n/navigation";
import { Feedback } from "./feedback";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";
import { LanguageSwitcher } from "@/components/language-switcher";

export const Footer = () => {
  const t = useTranslations("footer");
  const year = new Date().getFullYear();
  const [collapsed, setCollapsed] = useState(false);

  const toggleFooter = () => {
    const footerCollapsed = !collapsed;
    setCollapsed(footerCollapsed);
  };

  return (
    <footer className="z-40 w-full bg-base-300/90 backdrop-blur-md border-t border-[color-mix(in_oklab,var(--color-base-content)_10%,transparent)] transition-all duration-300 py-6">
      <div
        className={`max-w-7xl mx-auto px-4 md:px-10 xl:px-14 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-4 xl:gap-8 overflow-hidden transition-all duration-300 ${
          collapsed ? "max-h-0 opacity-0" : "max-h-200 opacity-100"
        }`}
      >
        <div className="space-y-3 max-w-80">
          <h2 className="font-extrabold text-lg font-mono">{t("aboutTitle")}</h2>
          <p className="text-sm opacity-80">
            {t.rich("aboutText", {
              year,
              discordLink: (chunks) => (
                <Link className="link" href="https://discord.com" target="_blank" rel="noopener noreferrer" prefetch={false}>
                  {chunks}
                </Link>
              ),
            })}
          </p>
        </div>

        <div className="space-y-3">
          <h2 className="font-extrabold text-lg font-mono">{t("linksTitle")}</h2>
          <ul className="flex flex-col gap-1 text-sm">
            <li>
              <Link className="link" href="/explore" prefetch={false}>
                {t("exploreTags")}
              </Link>
            </li>
            <li>
              <Link className="link" href="/trending-tags" prefetch={false}>
                {t("trendingTags")}
              </Link>
            </li>
            <li>
              <Link className="link" href="/contact" prefetch={false}>
                {t("contactUs")}
              </Link>
            </li>
            <li>
              <Link
                className="link"
                href="https://github.com/FyFka/tag-searcher/"
                target="_blank"
                rel="noopener noreferrer"
                prefetch={false}
              >
                {t("contribute")}
              </Link>
            </li>
          </ul>
        </div>

        <div className="space-y-3">
          <h2 className="font-extrabold text-lg font-mono">{t("resourcesTitle")}</h2>
          <ul className="flex flex-col gap-1 text-sm">
            <li>
              <Link className="link" href="/terms" prefetch={false}>
                {t("termsOfService")}
              </Link>
            </li>
            <li>
              <Link className="link" href="/privacy" prefetch={false}>
                {t("privacyPolicy")}
              </Link>
            </li>
          </ul>
        </div>
        <Feedback />
      </div>

      <div className="max-w-7xl mx-auto px-4 pt-2 md:px-10 xl:px-14 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <span className="text-sm opacity-60">{t("rightsReserved", { year })}</span>
        </div>
        <div className="flex items-center gap-1">
          <LanguageSwitcher align="right" up />
          <button className="btn btn-sm btn-ghost flex items-center gap-1" aria-label={t("toggleFooter")} onClick={toggleFooter}>
            <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${collapsed ? "rotate-180" : "rotate-0"}`} />
          </button>
        </div>
      </div>
    </footer>
  );
};
