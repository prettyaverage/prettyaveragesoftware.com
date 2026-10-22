import type { MetadataRoute } from "next";
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://prettyaveragesoftware.com",
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
