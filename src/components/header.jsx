import Link from "next/link";
import Image from "next/image";

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-base-300 flex justify-between items-center h-16 px-2 md:px-10 xl:px-14">
      <div className="flex items-center flex-row gap-1">
        <Image src="/logo.svg" height={36} width={36} alt="logo" />
        <Link className="font-extrabold font-mono text-xl" href="/">
          TagSearcher
        </Link>
      </div>
      <nav className="hidden">
        <ul className="flex gap-4">
          <li>Explore</li>
          <li>Popular</li>
          <li>Categories</li>
        </ul>
      </nav>
      <button className="btn btn-primary" disabled>
        Add Server
      </button>
    </header>
  );
}
