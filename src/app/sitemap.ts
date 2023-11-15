import { MetadataRoute } from "next";

const publicURL = "https://wish-jade.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: publicURL,
      lastModified: new Date(),
    },
    {
      url: `${publicURL}/notice`,
      lastModified: new Date(),
    },
    {
      url: `${publicURL}/shop`,
      lastModified: new Date(),
    },
  ];
}
