import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "de", "es", "fr", "it", "nl", "pl", "pt", "ru", "tr"],
  defaultLocale: "en",
  localePrefix: "as-needed",
  localeCookie: { name: "NEXT_LOCALE" },
});
