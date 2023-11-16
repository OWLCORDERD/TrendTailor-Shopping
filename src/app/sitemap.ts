import axios from "axios";
import { MetadataRoute } from "next";
import { NoticeType } from "./notice/page";

const publicURL = "https://wish-jade.vercel.app";

export async function fetchNotice() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_CLIENT_DOMAIN}/api/viewNotice`
  );

  const data = res.json();

  return data;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await fetchNotice();

  const postsData: NoticeType[] = posts.data;

  const postUrls = postsData.map((post) => ({
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
    {
      url: `${publicURL}/about`,
      lastModified: new Date(),
    },
    ...postUrls,
  ];
}
