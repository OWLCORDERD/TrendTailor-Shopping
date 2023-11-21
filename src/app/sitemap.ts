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

export const getNoticePosts = () => {
  return fetch(`${process.env.NEXT_PUBLIC_CLIENT_DOMAIN}/api/viewNotice`, {
    cache: "no-store",
  })
    .then((res) => {
      if (!res.ok) {
        return Promise.reject();
      }
      return res.json();
    })
    .catch(() => {
      return [];
    });
};

const Sitemap = async (): Promise<MetadataRoute.Sitemap> => {
  const posts: NoticeType2[] = await getNoticePosts().then((res) => res.data);

  console.log(posts);

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
