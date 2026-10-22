import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  poweredByHeader: false,
  // Indexing stays off until launch, on any host.
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [
          { type: "host" as const, value: "www\\.prettyaveragesoftware\\.com" },
        ],
        destination: "https://prettyaveragesoftware.com/:path*",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "host" as const, value: "prettyaveragesoftware\\.net" }],
        destination: "https://prettyaveragesoftware.com/:path*",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [
          { type: "host" as const, value: "www\\.prettyaveragesoftware\\.net" },
        ],
        destination: "https://prettyaveragesoftware.com/:path*",
        permanent: true,
      },
      ...[
        ["/about", "/#about"],
        ["/contact", "/#contact"],
        ["/oss", "/#about"],
        ["/studio", "/#about"],
        ["/work", "/#about"],
        ["/engineering", "/#about"],
        ["/open-source", "/#about"],
        ["/experiments", "/#about"],
      ].map(([source, destination]) => ({
        source,
        destination,
        permanent: true,
      })),
    ];
  },
};
export default nextConfig;
