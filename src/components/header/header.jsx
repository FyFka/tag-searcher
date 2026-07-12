import { AddServer } from "@/components/header/add-server";
import { Logo } from "@/components/header/logo";
import { LanguageSwitcher } from "@/components/language-switcher";

export function Header() {
  return (
    <header className="sticky top-0 z-100 bg-base-300 flex justify-between items-center h-16 px-2 md:px-10 xl:px-14 border-b border-[color-mix(in_oklab,var(--color-base-content)_10%,transparent)]">
      <Logo />
      <div className="flex items-center gap-1 md:gap-3">
        <LanguageSwitcher align="right" />
        <AddServer />
      </div>
    </header>
  );
}
