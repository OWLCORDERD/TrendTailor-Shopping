import axios from "axios";
import { MetadataRoute } from "next";
import { NoticeType } from "./notice/page";

const publicURL = "https://wish-jade.vercel.app";

export async function fetchNotice() {
  const res = await fetch("/api/viewNotice", {
    method: "GET",
  });

  const data = res.json();

  return data;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts: NoticeType[] = await fetchNotice();

  const postUrls = posts.map((post) => ({
    url: `${publicURL}/notice/${post.idx}`,
    lastModefied: new Date(),
  }));

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
    ...postUrls,
  ];
}
