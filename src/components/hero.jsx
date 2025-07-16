"use client";

import { formatNumber } from "@/lib/utils";
import { Globe, Heart } from "lucide-react";
import { useMemo } from "react";

export const Hero = ({ totalServers, totalMembers }) => {
  const beautifiedServers = useMemo(() => formatNumber(totalServers), [totalServers]);
  const beautifiedMembers = useMemo(() => formatNumber(totalMembers), [totalMembers]);

  return (
    <div className="py-26 text-center flex flex-col items-center gap-4 px-2 md:px-10 xl:px-14 bg-base-100 relative">
      <h1 className="font-extrabold text-4xl md:text-6xl font-mono z-50">Discord server tag searcher</h1>
      <h2 className="text-base max-w-[768px] z-50">
        Explore the most up-to-date collection of Discord server tags and profile badges for 2025. Search thousands of
        tags, discover new communities, and personalize your profile to stand out.
      </h2>
      <div className="flex gap-x-4 gap-y-1.5 gap items-center flex-row flex-wrap justify-center z-50">
        <div className="flex items-center gap-1.25">
          <Globe height={18} width={18} className="text-primary" />
          <span className="text-nowrap">
            <span className="font-semibold">{beautifiedServers}</span> servers
          </span>
        </div>
        <div className="flex items-center gap-1.25">
          <span className="status bg-base-content/80 status-md"></span>
          <span className="text-nowrap">
            <span className="font-semibold">{beautifiedMembers}</span> members
          </span>
        </div>
        <div className="flex items-center gap-1.25">
          <Heart height={18} width={18} className="text-error" />
          <span className="text-nowrap">
            <span className="font-semibold">100%</span> satisfaction
          </span>
        </div>
      </div>
    </div>
  );
};
