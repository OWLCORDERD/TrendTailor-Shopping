import axios from "axios";
import { MetadataRoute } from "next";

const publicURL = "https://wish-jade.vercel.app";

export interface NoticeType2 {
  idx: number;
  title: string;
  writer: string;
  image: string;
  date: string;
  text: string;
  view_cnt: number;
}

const getNoticePosts = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_CLIENT_DOMAIN}/api/viewNotice`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    return Promise.reject();
  }

  const data = await res.json();

  return data;
};

const Sitemap = async (): Promise<MetadataRoute.Sitemap> => {
  const posts: NoticeType2[] = await getNoticePosts();

  const postUrls = posts.map((post) => ({
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
};

export default Sitemap;
