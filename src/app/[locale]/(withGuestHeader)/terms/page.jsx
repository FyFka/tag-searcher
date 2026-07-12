import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { getAlternates } from "@/lib/metadata";

export const generateMetadata = async () => {
  const t = await getTranslations("metadata.terms");
  return {
    title: t("title"),
    description: t("description"),
    keywords: [
      "Discord special name",
      "Discord channel symbols",
      "Discord guilds list",
      "Discord server tags",
      "Discord badges",
      "Discord tags",
      "Server tag directory",
      "Username badges 2026",
      "Discord server icons",
      "Discord servers",
    ],
    alternates: getAlternates("/terms"),
  };
};

export default async function Terms() {
  const t = await getTranslations("terms");
  const link = (chunks) => (
    <Link className="link" href="https://tagsearcher.net/" rel="external nofollow noopener" target="_blank" prefetch={false}>
      {chunks}
    </Link>
  );
  const contactLink = (chunks) => (
    <Link className="link" href="https://tagsearcher.net/contact" rel="external nofollow noopener" target="_blank" prefetch={false}>
      {chunks}
    </Link>
  );

  return (
    <div className="px-1 md:px-0 py-4 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-4 flex-col md:flex-row">
        <h1 className="font-extrabold text-3xl md:text-4xl font-mono text-center">{t("title")}</h1>
        <p className="text-sm opacity-80">{t("lastUpdated")}</p>
      </div>
      <div className="space-y-2">
        <p>{t.rich("intro1", { link })}</p>
        <p>{t("intro2")}</p>
        <p>{t("intro3")}</p>
      </div>
      <h2 className="font-extrabold my-4 text-xl md:text-2xl font-mono">{t("tocTitle")}</h2>
      <ol className="list-decimal pl-6 space-y-1">
        <li>
          <a className="link" href="#age-requirement">
            {t("toc1")}
          </a>
        </li>
        <li>
          <a className="link" href="#user-content">
            {t("toc2")}
          </a>
        </li>
        <li>
          <a className="link" href="#backups">
            {t("toc3")}
          </a>
        </li>
        <li>
          <a className="link" href="#links-to-other-resources">
            {t("toc4")}
          </a>
        </li>
        <li>
          <a className="link" href="#changes-and-amendments">
            {t("toc5")}
          </a>
        </li>
        <li>
          <a className="link" href="#acceptance-of-these-terms">
            {t("toc6")}
          </a>
        </li>
        <li>
          <a className="link" href="#contacting-us">
            {t("toc7")}
          </a>
        </li>
      </ol>
      <h2 id="age-requirement" className="font-extrabold my-4 text-xl md:text-2xl font-mono">
        {t("ageReqTitle")}
      </h2>
      <p>{t("ageReqText")}</p>

      <h2 id="user-content" className="font-extrabold my-4 text-xl md:text-2xl font-mono">
        {t("userContentTitle")}
      </h2>
      <p>{t("userContent1")}</p>
      <p>{t("userContent2")}</p>

      <h2 id="backups" className="font-extrabold my-4 text-xl md:text-2xl font-mono">
        {t("backupsTitle")}
      </h2>
      <p>{t("backupsText")}</p>

      <h2 id="links-to-other-resources" className="font-extrabold my-4 text-xl md:text-2xl font-mono">
        {t("linksResTitle")}
      </h2>
      <p>{t("linksResText")}</p>

      <h2 id="changes-and-amendments" className="font-extrabold my-4 text-xl md:text-2xl font-mono">
        {t("changesTitle")}
      </h2>
      <p>{t("changes1")}</p>
      <p>{t("changes2")}</p>

      <h2 id="acceptance-of-these-terms" className="font-extrabold my-4 text-xl md:text-2xl font-mono">
        {t("acceptanceTitle")}
      </h2>
      <p>{t("acceptanceText")}</p>

      <h2 id="contacting-us" className="font-extrabold my-4 text-xl md:text-2xl font-mono">
        {t("contactTitle")}
      </h2>
      <p>{t("contactIntro")}</p>
      <p>{t.rich("contactLink", { contactLink })}</p>
    </div>
  );
}
