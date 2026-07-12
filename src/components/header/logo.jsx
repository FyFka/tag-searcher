"use client";

import { Link } from "@/i18n/navigation";
import { usePathname } from "@/i18n/navigation";
import Image from "next/image";

export const Logo = () => {
  const pathname = usePathname();

  const handleClickOnLogo = (evt) => {
    if (pathname === "/") {
      evt.preventDefault();
      globalThis.history.pushState(null, "", globalThis.location.pathname.replace(/\/$/, "") || "/");
      globalThis.scrollTo({ top: 0 });
      globalThis.dispatchEvent(new PopStateEvent("popstate"));
    }
  };

  return (
    <Link onClick={handleClickOnLogo} href="/" className="flex items-center flex-row gap-2" prefetch={false}>
      <Image className="h-8.25 w-10 msm:h-9.5 msm:w-11.25" src="/logo.webp" height={38} width={45} alt="logo" quality={100} />
      <span className="font-bold font-mono text-base msm:text-xl">TagSearcher</span>
    </Link>
  );
};
