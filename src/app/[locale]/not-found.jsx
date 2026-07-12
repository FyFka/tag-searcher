import { Footer } from "@/components/footer/footer";
import { Header } from "@/components/header/header";
import Link from "next/link";
import Image from "next/image";
import { getTranslations } from "next-intl/server";

export const metadata = {
  title: "Page not found",
};

export default async function NotFound() {
  const t = await getTranslations("notFound");
  const smiles = ["🐸", "🫠", "💥", "🌚", "😵", "😶‍🌫️", "🤖", "👾", "🚫", "🔍", "📦", "🤷‍♂️", "🧙‍♂️", "👻", "😬"];

  // eslint-disable-next-line react-hooks/purity
  const smile = smiles[Math.floor(Math.random() * smiles.length)];

  return (
    <>
      <Header />
      <main className="flex flex-col items-center justify-center text-center px-4 py-24 gap-4 grow">
        <Image src="/not-found.webp" height={225} width={225} alt="404" priority fetchPriority="high" />
        <h1 className="text-2xl md:text-4xl font-extrabold">{t("heading")}</h1>
        <p className="text-base-content max-w-md text-lg">{t("text", { smile })}</p>
        <Link href="/" className="btn btn-primary mt-2">
          {t("cta")}
        </Link>
      </main>
      <Footer />
    </>
  );
}
