/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  productionBrowserSourceMaps: false,
  experimental: { webpackMemoryOptimizations: true, serverSourceMaps: false, preloadEntriesOnStart: false },
  typescript: { ignoreBuildErrors: true },
  images: { unoptimized: true, qualities: [75, 100] },
};

export default nextConfig;
