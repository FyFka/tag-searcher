import { Footer } from "@/components/footer/footer";
import { Header } from "@/components/header/header";
import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "Page not found",
};

export default function NotFound() {
  const smiles = ["🐸", "🫠", "💥", "🌚", "😵", "😶‍🌫️", "🤖", "👾", "🚫", "🔍", "📦", "🤷‍♂️", "🧙‍♂️", "👻", "😬"];
  const smile = smiles[Math.floor(Math.random() * smiles.length)];

  return (
    <>
      <Header />
      <main className="flex flex-col items-center justify-center text-center px-4 py-24 gap-4 grow bg-base-100">
        <Image src="/not-found.webp" height={225} width={225} alt="404" priority fetchPriority="high" />
        <h1 className="text-2xl md:text-4xl font-extrabold">Oops... this page ghosted us (404)</h1>
        <p className="text-base-content max-w-md text-lg">
          Looks like the page you're looking for doesn't exist. Maybe it exploded, maybe it was never real {smile}
        </p>
        <Link href="/" className="btn btn-primary mt-2">
          Take me home
        </Link>
      </main>
      <Footer />
    </>
  );
}
