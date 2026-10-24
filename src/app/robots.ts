import type { MetadataRoute } from "next";
import { siteUrl } from "@/data/site";

// Lets all search engines crawl the site and points them to the sitemap.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
