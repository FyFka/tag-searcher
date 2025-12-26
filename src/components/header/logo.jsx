"use client";

import Link from "next/link";
import Image from "next/image";

export const Logo = () => {
  const handleClickOnLogo = (evt) => {
    if (window.location.pathname === "/") {
      evt.preventDefault();
      window.history.pushState(null, "", "/");
      window.scrollTo({ top: 0 });
      window.dispatchEvent(new PopStateEvent("popstate"));
    }
  };

  return (
    <Link onClick={handleClickOnLogo} href="/" className="flex items-center flex-row gap-2" prefetch={false}>
      <Image
        className="h-8.25 w-10 msm:h-9.5 msm:w-11.25"
        src="/logo.webp"
        height={38}
        width={45}
        alt="logo"
        quality={100}
      />
      <span className="font-bold font-mono text-base msm:text-xl">TagSearcher</span>
    </Link>
  );
};
