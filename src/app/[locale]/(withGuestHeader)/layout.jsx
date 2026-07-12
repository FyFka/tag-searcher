import { Footer } from "@/components/footer/footer";
import { Header } from "@/components/header/header";

export default async function RootLayout({ children }) {
  return (
    <>
      <Header />
      <main className="grow relative">{children}</main>
      <Footer />
    </>
  );
}
