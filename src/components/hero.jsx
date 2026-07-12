"use client";

import { formatNumber } from "@/lib/utils";
import { Globe, Heart, User, Zap } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { LightRays } from "./light-rays";

export const Hero = ({ totalServers, totalMembers, totalVisits, customDescription, customTitle, linkToSearchPage }) => {
  const t = useTranslations("hero");
  const beautifiedServers = formatNumber(totalServers);
  const beautifiedMembers = formatNumber(totalMembers);
  const beautifiedVisits = formatNumber(totalVisits);

  const title = customTitle ? customTitle : t("defaultTitle");
  const description = customDescription ? customDescription : t("defaultDescription");
  return (
    <div className="py-22 msm:py-26 text-center flex flex-col items-center gap-4 px-2 md:px-10 xl:px-14 bg-base-100 relative">
      <h1 className="font-extrabold text-4xl md:text-6xl xl:text-7xl font-mono z-50">{title}</h1>
      <h2 className="text-base max-w-3xl z-50">{description}</h2>
      <div className="flex gap-x-4 gap-y-1.5 gap items-center flex-row flex-wrap justify-center z-50">
        <div className="flex items-center gap-1.25">
          <Globe height={18} width={18} className="text-primary" />
          <span className="text-nowrap">
            <span className="font-semibold">{beautifiedServers}</span> {t("servers")}
          </span>
        </div>
        <div className="flex items-center gap-1.25">
          <Zap height={18} width={18} className="text-warning" />
          <span className="text-nowrap">
            <span className="font-semibold">{beautifiedVisits}</span> {t("visits")}
          </span>
        </div>
        <div className="flex items-center gap-1.25">
          <User height={18} width={18} className="text-base-content/80" />
          <span className="text-nowrap">
            <span className="font-semibold">{beautifiedMembers}</span> {t("members")}
          </span>
        </div>
        <div className="flex items-center gap-1.25">
          <Heart height={18} width={18} className="text-error" />
          <span className="text-nowrap">
            <span className="font-semibold">100%</span> {t("satisfaction")}
          </span>
        </div>
      </div>
      <div className="absolute top-0 left-0 w-full h-full z-10">
        <LightRays
          raysOrigin="top-center"
          raysSpeed={0.7}
          lightSpread={1}
          rayLength={1.5}
          followMouse={true}
          mouseInfluence={0.05}
          noiseAmount={0}
          distortion={0.05}
        />
      </div>
      {linkToSearchPage && (
        <Link href="/" className="btn btn-primary w-full max-w-80 mt-1.5 relative z-50" prefetch={false}>
          {t("findTag")}
        </Link>
      )}
    </div>
  );
};
