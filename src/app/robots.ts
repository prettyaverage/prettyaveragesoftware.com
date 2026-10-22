import type { MetadataRoute } from "next";
export default function robots(): MetadataRoute.Robots {
  // Indexing stays off until launch: pages are allowed so crawlers can see the noindex header.
  return { rules: { userAgent: "*", allow: "/" } };
}
