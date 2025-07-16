import { Open_Sans, Montserrat } from "next/font/google";
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
  title: { template: "%s | Discord server tag searcher" },
  metadataBase: new URL("https://tagsearcher.lol"),
  openGraph: { siteName: "Discord server tag searcher", type: "website", locale: "en_US" },
  robots: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  appleWebApp: { title: "Discord server tag searcher", statusBarStyle: "default", capable: true },
  applicationName: "Discord server tag searcher",
  icons: {
    icon: [
      { url: "/favicon.ico", rel: "icon" },
      { url: "/favicon-32x32.png", sizes: "32x32" },
      { url: "/favicon-192x192.png", sizes: "192x192" },
    ],
    apple: "/favicon-apple.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="dark" className="bg-base-300 scroll-smooth">
      <body className={`${openSans.variable} ${montserrat.variable} antialiased flex flex-col min-h-screen`}>
        {children}
      </body>
    </html>
  );
}
