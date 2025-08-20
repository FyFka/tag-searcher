/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  productionBrowserSourceMaps: false,
  output: "standalone",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
