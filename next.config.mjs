/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  productionBrowserSourceMaps: false,
  experimental: { webpackMemoryOptimizations: true, serverSourceMaps: false, preloadEntriesOnStart: false },
  typescript: { ignoreBuildErrors: true },
  images: { unoptimized: true, qualities: [75, 100] },
  turbopack: {
    resolveAlias: {
      "../build/polyfills/polyfill-module": "./src/lib/modern-polyfill.js",
      "next/dist/build/polyfills/polyfill-module": "./src/lib/modern-polyfill.js",
    },
  },
};

export default nextConfig;
