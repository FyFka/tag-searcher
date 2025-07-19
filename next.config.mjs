const cspHeader = `default-src 'self';
script-src 'self' 'unsafe-eval' 'unsafe-inline' https://challenges.cloudflare.com https://static.cloudflareinsights.com;
style-src 'self' 'unsafe-inline';
img-src 'self' blob: data: cdn.discordapp.com;
font-src 'self';
object-src 'none';
base-uri 'self';
form-action 'self';
frame-src https://challenges.cloudflare.com;
frame-ancestors 'none';
upgrade-insecure-requests;`;

/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "Content-Security-Policy", value: cspHeader.replace(/\n/g, "") },
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
        ],
      },
    ];
  },
};

export default nextConfig;
