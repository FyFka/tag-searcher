"use client";

import { AddServer } from "@/components/header/add-server";
import { Logo } from "@/components/header/logo";

export function Header() {
  return (
    <>
      <header className="sticky top-0 z-100 bg-base-300 flex justify-between items-center h-16 px-2 md:px-10 xl:px-14 shadow-sm">
        <Logo />
        <AddServer />
      </header>
    </>
  );
}
