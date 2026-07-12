import { routing } from "@/i18n/routing";

export const getAlternates = (basePath) => {
  const siteUrl = process.env.SITE_URL || "https://tagsearcher.net";
  const languages = {
    "x-default": `${siteUrl}${basePath}`,
  };

  for (const locale of routing.locales) {
    const localePath = locale === routing.defaultLocale ? basePath : `/${locale}${basePath === "/" ? "" : basePath}`;
    languages[locale] = `${siteUrl}${localePath}`;
  }

  return {
    canonical: languages[routing.defaultLocale],
    languages,
  };
};
