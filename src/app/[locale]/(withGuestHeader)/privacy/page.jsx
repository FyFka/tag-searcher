import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { getAlternates } from "@/lib/metadata";

export const generateMetadata = async () => {
  const t = await getTranslations("metadata.privacy");
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
    alternates: getAlternates("/privacy"),
  };
};

export default async function Privacy() {
  const t = await getTranslations("privacy");
  const bold = (chunks) => <strong>{chunks}</strong>;
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
      <div className="space-y-1">
        <p>{t("intro1")}</p>
        <p>{t("intro2")}</p>
      </div>
      <h2 className="font-extrabold my-4 text-xl md:text-2xl font-mono">{t("interpretationTitle")}</h2>
      <h3 className="font-bold my-1.75 text-lg md:text-xl font-mono">{t("interpretationSubtitle")}</h3>
      <p>{t("interpretationText")}</p>

      <h3 className="font-bold my-1.75 text-lg md:text-xl font-mono">{t("definitionsSubtitle")}</h3>
      <div className="space-y-1">
        <p>{t("definitionsIntro")}</p>
        <ul className="list-disc pl-8 space-y-1">
          <li>
            <p>{t.rich("defAccount", { bold })}</p>
          </li>
          <li>
            <p>{t.rich("defAffiliate", { bold })}</p>
          </li>
          <li>
            <p>{t.rich("defCompany", { bold })}</p>
          </li>
          <li>
            <p>{t.rich("defCookies", { bold })}</p>
          </li>
          <li>
            <p>{t.rich("defCountry", { bold })}</p>
          </li>
          <li>
            <p>{t.rich("defDevice", { bold })}</p>
          </li>
          <li>
            <p>{t.rich("defPersonalData", { bold })}</p>
          </li>
          <li>
            <p>{t.rich("defService", { bold })}</p>
          </li>
          <li>
            <p>{t.rich("defServiceProvider", { bold })}</p>
          </li>
          <li>
            <p>{t.rich("defUsageData", { bold })}</p>
          </li>
          <li>
            <p>{t.rich("defWebsite", { bold, link })}</p>
          </li>
          <li>
            <p>{t.rich("defYou", { bold })}</p>
          </li>
        </ul>
      </div>
      <h2 className="font-extrabold my-4 text-xl md:text-2xl font-mono">{t("collectingTitle")}</h2>
      <h3 className="font-bold my-1.75 text-lg md:text-xl font-mono">{t("typesOfDataSubtitle")}</h3>
      <h4 className="font-bold my-1.5 font-mono">{t("personalDataSubtitle")}</h4>
      <div className="space-y-1">
        <p>{t("personalDataIntro")}</p>
        <ul className="list-disc pl-8 space-y-1">
          <li>{t("personalDataList1")}</li>
        </ul>
      </div>
      <h4 className="font-bold my-1.5 font-mono">{t("usageDataSubtitle")}</h4>
      <div className="space-y-1">
        <p>{t("usageData1")}</p>
        <p>{t("usageData2")}</p>
        <p>{t("usageData3")}</p>
        <p>{t("usageData4")}</p>
      </div>
      <h4 className="font-bold my-1.5 font-mono">{t("trackingSubtitle")}</h4>
      <div className="space-y-1">
        <p>{t("trackingIntro")}</p>
        <ul className="list-disc pl-8 space-y-1">
          <li>{t.rich("trackingList1", { bold })}</li>
          <li>{t.rich("trackingList2", { bold })}</li>
        </ul>
        <p>{t("trackingCookies1")}</p>
        <p>{t("trackingCookies2")}</p>
        <ul className="list-disc pl-8 space-y-1">
          <li className="space-y-1">
            <p>{t.rich("cookieNecTitle", { bold })}</p>
            <p>{t("cookieNecType")}</p>
            <p>{t("cookieNecAdmin")}</p>
            <p>{t("cookieNecPurpose")}</p>
          </li>
        </ul>
        <ul className="list-disc pl-8 space-y-1">
          <li className="space-y-1">
            <p>{t.rich("cookieAccTitle", { bold })}</p>
            <p>{t("cookieAccType")}</p>
            <p>{t("cookieAccAdmin")}</p>
            <p>{t("cookieAccPurpose")}</p>
          </li>
          <li className="space-y-1">
            <p>{t.rich("cookieFuncTitle", { bold })}</p>
            <p>{t("cookieFuncType")}</p>
            <p>{t("cookieFuncAdmin")}</p>
            <p>{t("cookieFuncPurpose")}</p>
          </li>
        </ul>
        <p>{t("cookieMoreInfo")}</p>
      </div>
      <h3 className="font-bold my-1.75 text-lg md:text-xl font-mono">{t("usePersonalDataSubtitle")}</h3>
      <div className="space-y-1">
        <p>{t("usePersonalDataIntro")}</p>
        <ul className="list-disc pl-8 space-y-1">
          <li>
            <p>{t.rich("useDataList1", { bold })}</p>
          </li>
          <li>
            <p>{t.rich("useDataList2", { bold })}</p>
          </li>
          <li>
            <p>{t.rich("useDataList3", { bold })}</p>
          </li>
          <li>
            <p>{t.rich("useDataList4", { bold })}</p>
          </li>
          <li>
            <p>{t.rich("useDataList5", { bold })}</p>
          </li>
          <li>
            <p>{t.rich("useDataList6", { bold })}</p>
          </li>
          <li>
            <p>{t.rich("useDataList7", { bold })}</p>
          </li>
          <li>
            <p>{t.rich("useDataList8", { bold })}</p>
          </li>
        </ul>
        <p>{t("shareInfoIntro")}</p>
        <ul className="list-disc pl-8 space-y-1">
          <li>{t.rich("shareInfoList1", { bold })}</li>
          <li>{t.rich("shareInfoList2", { bold })}</li>
          <li>{t.rich("shareInfoList3", { bold })}</li>
          <li>{t.rich("shareInfoList4", { bold })}</li>
          <li>{t.rich("shareInfoList5", { bold })}</li>
          <li>{t.rich("shareInfoList6", { bold })}</li>
        </ul>
      </div>
      <h3 className="font-bold my-1.75 text-lg md:text-xl font-mono">{t("retentionSubtitle")}</h3>
      <div className="space-y-1">
        <p>{t("retention1")}</p>
        <p>{t("retention2")}</p>
      </div>
      <h3 className="font-bold my-1.75 text-lg md:text-xl font-mono">{t("transferSubtitle")}</h3>
      <div className="space-y-1">
        <p>{t("transfer1")}</p>
        <p>{t("transfer2")}</p>
        <p>{t("transfer3")}</p>
      </div>
      <h3 className="font-bold my-1.75 text-lg md:text-xl font-mono">{t("deleteSubtitle")}</h3>
      <div className="space-y-1">
        <p>{t("delete1")}</p>
        <p>{t("delete2")}</p>
        <p>{t("delete3")}</p>
        <p>{t("delete4")}</p>
      </div>
      <h3 className="font-bold my-1.75 text-lg md:text-xl font-mono">{t("disclosureSubtitle")}</h3>
      <h4 className="font-bold my-1.5 font-mono">{t("businessTransTitle")}</h4>
      <p>{t("businessTransText")}</p>
      <h4 className="font-bold my-1.5 font-mono">{t("lawEnforceTitle")}</h4>
      <p>{t("lawEnforceText")}</p>
      <h4 className="font-bold my-1.5 font-mono">{t("otherLegalTitle")}</h4>
      <div className="space-y-1">
        <p>{t("otherLegalIntro")}</p>
        <ul className="list-disc pl-8 space-y-1">
          <li>{t("otherLegalList1")}</li>
          <li>{t("otherLegalList2")}</li>
          <li>{t("otherLegalList3")}</li>
          <li>{t("otherLegalList4")}</li>
          <li>{t("otherLegalList5")}</li>
        </ul>
      </div>
      <h3 className="font-bold my-1.75 text-lg md:text-xl font-mono">{t("securitySubtitle")}</h3>
      <p>{t("securityText")}</p>
      <h2 className="font-extrabold my-4 text-xl md:text-2xl font-mono">{t("childrenTitle")}</h2>
      <div className="space-y-1">
        <p>{t("children1")}</p>
        <p>{t("children2")}</p>
      </div>
      <h2 className="font-extrabold my-4 text-xl md:text-2xl font-mono">{t("linksTitle")}</h2>
      <div className="space-y-1">
        <p>{t("links1")}</p>
        <p>{t("links2")}</p>
      </div>
      <h2 className="font-extrabold my-4 text-xl md:text-2xl font-mono">{t("changesTitle")}</h2>
      <div className="space-y-1">
        <p>{t("changes1")}</p>
        <p>{t("changes2")}</p>
        <p>{t("changes3")}</p>
      </div>
      <h2 className="font-extrabold my-4 text-xl md:text-2xl font-mono">{t("contactTitle")}</h2>
      <div className="space-y-1">
        <p>{t("contactIntro")}</p>
        <ul className="list-disc pl-8 space-y-1">
          <li>{t.rich("contactList1", { contactLink })}</li>
        </ul>
      </div>
    </div>
  );
}
