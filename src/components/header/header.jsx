import Link from "next/link";
import Image from "next/image";
import { AddServer } from "@/components/header/add-server";

export function Header() {
  return (
    <header className="sticky top-0 z-[100] bg-base-300 flex justify-between items-center h-16 px-2 md:px-10 xl:px-14">
      <Link href="/" className="flex items-center flex-row gap-2">
        <Image src="/logo.webp" height={38} width={45} alt="logo" quality={100} />
        <span className="font-bold font-mono text-xl">TagSearcher</span>
      </Link>
      <AddServer />
    </header>
  );
}
