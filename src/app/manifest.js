export default function manifest() {
  return {
    id: "/",
    name: "Discord Guild Tag Searcher",
    short_name: "TagSearcher",
    description:
      "Find and explore Discord guild tags and badges. Discover communities and personalize your profile in 2026.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    display_override: ["standalone", "browser"],
    background_color: "#15191e",
    theme_color: "#605dff",
    orientation: "portrait",
    lang: "en-US",
    icons: [
      {
        src: "/favicon-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/favicon-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any maskable",
      },
      {
        src: "/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
