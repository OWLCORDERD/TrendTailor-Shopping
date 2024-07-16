import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://wishstore.vercel.app/sitemap.xml",
    host: "https://wishstore.vercel.app",
  };
}
