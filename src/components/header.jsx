import Link from "next/link";
import Image from "next/image";

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-base-300 flex justify-between items-center h-16 px-2 md:px-10 xl:px-14">
      <Link
        href="/"
        className="flex items-center flex-row gap-2 py-0.75 px-3.5 bg-base-100 rounded-full border-1 border-base-300/50"
      >
        <Image src="/logo.svg" height={32} width={32} alt="logo" priority />
        <span className="font-extrabold font-mono text-xl">TagSearcher</span>
      </Link>
      <button className="btn btn-primary" disabled>
        Add Server
      </button>
    </header>
  );
}
