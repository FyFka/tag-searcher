import { Open_Sans, Montserrat } from "next/font/google";
import "./globals.css";

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata = {
  title: "TagSearcher",
  description: "TagSearcher",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="dark">
      <body className={`${openSans.variable} ${montserrat.variable} antialiased flex flex-col min-h-screen`}>
        {children}
      </body>
    </html>
  );
}
