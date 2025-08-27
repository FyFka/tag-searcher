import Link from "next/link";

export const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="z-40 w-full bg-base-300/80 backdrop-blur-md border-t border-base-100/50 py-2">
      <div className="flex flex-col md:flex-row items-center justify-center gap-2 px-0 md:px-10 xl:px-14">
        <div className="flex-10">
          <p className="text-sm inline-block text-center">
            Made in {year} for the community | Not affiliated with{" "}
            <Link
              className="link"
              href="https://discord.com"
              target="_blank"
              rel="noopener noreferrer"
              prefetch={false}
            >
              Discord
            </Link>
          </p>
        </div>
        <div className="flex items-center justify-center gap-2 text-sm">
          <ul className="flex gap-x-3 gap-y-1 flex-wrap items-center justify-center">
            <li>
              <Link className="link" href="/trending-tags" prefetch={false}>
                Trending Tags
              </Link>
            </li>
            <li>
              <Link className="link" href="/terms" prefetch={false}>
                Terms of Service
              </Link>
            </li>
            <li>
              <Link className="link" href="/privacy" prefetch={false}>
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link className="link" href="/contact" prefetch={false}>
                Contact Us
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};
