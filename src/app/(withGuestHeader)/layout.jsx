import { Footer } from "@/components/footer";
import { Header } from "@/components/header/header";

export default async function RootLayout({ children }) {
  return (
    <>
      <Header />
      <main className="flex-grow relative">{children}</main>
      <Footer />
    </>
  );
}
