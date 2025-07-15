import Link from "next/link";

export const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="w-full bg-base-300/80 backdrop-blur-md border-t border-base-100/50 py-2 px-4">
      <div className="flex flex-col md:flex-row items-center justify-center gap-2 px-2 md:px-10 xl:px-14">
        <div className="flex-10">
          <p className="text-sm">
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
          <ul className="flex gap-3">
            <li>
              <Link className="link" href="/terms">
                Terms of Service
              </Link>
            </li>
            <li>
              <Link className="link" href="/privacy">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link className="link" href="/contact">
                Contact Us
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};
