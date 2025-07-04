import { Footer } from "@/components/footer";
import { Header } from "@/components/header/header";
import Link from "next/link";

export default function NotFound() {
  const smiles = ["🐸", "🫠", "💥", "🌚", "😵", "😶‍🌫️", "🤖", "👾", "🚫", "🔍", "📦", "🤷‍♂️", "🧙‍♂️", "👻", "😬"];
  const smile = smiles[Math.floor(Math.random() * smiles.length)];

  return (
    <>
      <Header />
      <main className="flex flex-col items-center justify-center text-center px-4 py-24 gap-4 flex-grow bg-base-100">
        <h1 className="text-4xl font-extrabold">Oops... this page ghosted us (404)</h1>
        <p className="text-base-content max-w-md text-lg">
          Looks like the page you're looking for doesn't exist. Maybe it exploded, maybe it was never real {smile}
        </p>
        <Link href="/" className="btn btn-primary mt-4">
          Take me home
        </Link>
      </main>
      <Footer />
    </>
  );
}
