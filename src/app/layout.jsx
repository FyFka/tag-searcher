import { Open_Sans, Montserrat } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";

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
  metadataBase: new URL("https://tagsearcher.lol"),
  openGraph: { siteName: "Server tag searcher", type: "website", locale: "en_US" },
  robots: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  appleWebApp: { title: "Server tag searcher", statusBarStyle: "default", capable: true },
  applicationName: "Server tag searcher",
  icons: {
    icon: "/favicon.ico",
    other: [
      {
        rel: "icon",
        url: "/favicon-32x32.png",
        sizes: "32x32",
      },
      {
        rel: "icon",
        url: "/favicon-16x16.png",
        sizes: "16x16",
      },
      {
        rel: "apple-touch-icon",
        url: "/apple-touch-icon.png",
        sizes: "180x180",
      },
    ],
  },
};

export default function RootLayout({ children }) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID || "G-XXXXXXXXXX";
  return (
    <html lang="en" data-theme="dark" className="bg-base-300">
      <body className={`${openSans.variable} ${montserrat.variable} antialiased flex flex-col min-h-screen`}>
        {children}
        <GoogleAnalytics debugMode gaId={gaId} />
      </body>
    </html>
  );
}
