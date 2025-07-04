import Link from "next/link";

export const Footer = () => {
  const fullYear = new Date().getFullYear();
  return (
    <footer className="w-full flex justify-center items-center h-16 px-4 bg-base-300/80 backdrop-blur-md text-sm text-base-content border-t border-base-100/50">
      <p className="text-center">
        Made in {fullYear} with <span className="text-error">♥</span> for the community | Not affiliated with{" "}
        <Link className="link" href="https://discord.com/" target="_blank" rel="noopener noreferrer" prefetch={false}>
          Discord
        </Link>
      </p>
    </footer>
  );
};
