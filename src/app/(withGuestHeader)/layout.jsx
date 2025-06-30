import { Footer } from "@/components/footer";
import { Header } from "@/components/header/header";
import "../globals.css";

export const metadata = {
  title: "tagsearcher",
  description: "discord tag search",
};

export default async function RootLayout({ children }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
