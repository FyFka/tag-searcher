import { Footer } from "@/components/footer";
import { Header } from "@/components/header/header";
import "../globals.css";

export default async function RootLayout({ children }) {
  return (
    <>
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
    </>
  );
}
