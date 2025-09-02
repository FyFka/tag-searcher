import { Open_Sans, Montserrat } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Disclaimer } from "@/components/disclaimer/disclaimer";

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin", "cyrillic"],
  preload: true,
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata = {
  title: { template: "%s | Discord Guild Tag Searcher" },
  metadataBase: new URL("https://tagsearcher.org"),
  openGraph: {
    url: "https://tagsearcher.org/",
    type: "website",
    title: "Search Discord Tags & Badges",
    description:
      "Search, find, and explore the most complete collection of Discord guild tags and badges for 2025. Customize your profile and discover new communities.",
    images: [
      {
        url: "https://tagsearcher.org/preview.webp",
        width: 1200,
        height: 630,
        alt: "A display of various Discord Guild Tags and Badges available to search on TagSearcher.org",
      },
    ],
  },
  appleWebApp: { title: "Discord Guild Tag Searcher", statusBarStyle: "default", capable: true },
  applicationName: "Discord Guild Tag Searcher",
  icons: {
    icon: [
      { url: "/favicon.ico", rel: "icon" },
      { url: "/favicon.ico", rel: "shortcut icon" },
      { url: "/favicon-32x32.png", sizes: "32x32" },
      { url: "/favicon-192x192.png", sizes: "192x192" },
    ],
    apple: "/apple-touch-icon.png",
  },
  twitter: {
    card: "summary_large_image",
    title: "Search Discord Tags & Badges",
    description:
      "Search, find, and explore the most complete collection of Discord guild tags and badges for 2025. Customize your profile and discover new communities.",
    images: [
      {
        url: "https://tagsearcher.org/preview.webp",
        width: 1200,
        height: 630,
        alt: "A display of various Discord Guild Tags and Badges available to search on TagSearcher.org",
      },
    ],
  },
};

export default function RootLayout({ children }) {
  const clarityTagId = process.env.NEXT_PUBLIC_CLARITY_TAG_ID || "";
  return (
    <html lang="en" data-theme="dark" className="bg-base-300 scroll-smooth">
      <body className={`${openSans.variable} ${montserrat.variable} antialiased flex flex-col min-h-screen`}>
        {children}
        <Script
          strategy="afterInteractive"
          data-cfasync="false"
          src="//pl27496434.profitableratecpm.com/a3853da0402d9b70eb6612e70db53061/invoke.js"
        ></Script>
        {clarityTagId && (
          <Script strategy="afterInteractive">
            {`(function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "${clarityTagId}");`}
          </Script>
        )}
        <Disclaimer />
      </body>
    </html>
  );
}
