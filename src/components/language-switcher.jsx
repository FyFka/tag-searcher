"use client";

import { useLocale, useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { Globe } from "lucide-react";

export const LanguageSwitcher = ({ align = "left", up = false }) => {
  const t = useTranslations("languages");
  const commonT = useTranslations("common");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();

  const handleSelect = (nextLocale) => {
    // Closes the DaisyUI dropdown by removing CSS focus
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }

    if (nextLocale === locale) return;
    router.replace({ pathname, params }, { locale: nextLocale });
  };

  return (
    <div className={`dropdown ${align === "right" ? "dropdown-end" : ""} ${up ? "dropdown-top" : ""}`}>
      <div
        tabIndex={0}
        role="button"
        className="btn btn-sm btn-ghost flex items-center gap-1.5 overflow-hidden m-0"
        aria-label={commonT("language")}
      >
        <Globe width={16} height={16} />
        <span className="uppercase text-xs font-semibold">{locale}</span>
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content menu z-[100] mt-1 min-w-32 bg-base-100 border border-[color-mix(in_oklab,var(--color-base-content)_15%,transparent)] rounded-box shadow-lg p-2"
      >
        {routing.locales.map((loc) => (
          <li key={loc}>
            <button
              type="button"
              aria-selected={loc === locale}
              onClick={() => handleSelect(loc)}
              className={loc === locale ? "text-primary font-semibold active" : ""}
            >
              {t(loc)}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
