import axios from "axios";
import { MetadataRoute } from "next";
import { NoticeType } from "./notice/page";

const publicURL = "https://wish-jade.vercel.app";

export async function fetchNotice() {
  const res = await fetch(`${publicURL}/api/viewNotice`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("not connect to notice db");
  }

  return res.json();
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await fetchNotice();

  const postsData: NoticeType[] = posts.data;

  const postUrls = postsData.map((post) => ({
    url: `${publicURL}/notice/${post.idx}`,
    lastModified: post.date,
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
    {
      url: `${publicURL}/about`,
      lastModified: new Date(),
    },
    ...postUrls,
  ];
}
