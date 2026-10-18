import { MetadataRoute } from "next";
import { getNoticeList } from "@/feature/notice/notice.service";

// 2026.10.18: 새 공지사항이 반영되도록 1시간마다 재생성
export const revalidate = 3600;

const publicURL: string = "https://trendtailor-store.vercel.app";

const Sitemap = async (): Promise<MetadataRoute.Sitemap> => {
  const posts = await getNoticeList();

  const postUrls: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${publicURL}/notice/${post.id}`,
    lastModified: post.isoDate,
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
    {
      url: `${publicURL}/trendly`,
      lastModified: new Date(),
    },
    ...postUrls,
  ];
};

export default Sitemap;
