import axios from "axios";
import { MetadataRoute } from "next";
import { NoticeType } from "./notice/page";

const publicURL = "https://wish-jade.vercel.app";

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
  const posts = await getNoticePosts();

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
};

export default Sitemap;
