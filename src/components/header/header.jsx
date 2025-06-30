import Link from "next/link";
import Image from "next/image";

export function Header() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/70 dark:bg-neutral-900/70 border-b border-white/30 dark:border-neutral-800/50 flex justify-between items-center h-16 px-10">
      <div className="flex items-center flex-row gap-1">
        <Image src="/logo.svg" height={32} width={32} alt="logo" />
        <Link className="font-extrabold font-mono text-xl" href="/">
          TagSearcher
        </Link>
      </div>
      <nav>
        <ul className="flex gap-4">
          <li>Explore</li>
          <li>Popular</li>
          <li>Categories</li>
        </ul>
      </nav>
      <button className="btn btn-primary">Add Server</button>
    </header>
  );
}
