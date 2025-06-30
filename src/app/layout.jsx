import { Open_Sans, Montserrat } from "next/font/google";
import "./globals.css";
import { Providers } from "@/providers/providers";

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata = {
  title: "MetrixWay",
  description: "Measure and optimize your website performance",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="dark">
      <body className={`${openSans.variable} ${montserrat.variable} antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
