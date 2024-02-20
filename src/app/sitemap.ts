import axios from "axios";
import { MetadataRoute } from "next";
import { NoticeType } from "./notice/page";
import { collection, getDocs } from "firebase/firestore";
import { db } from "component/fetchDB/firebase";

interface example {
  url: string;
  lastModified: string;
}

const publicURL = "https://wish-jade.vercel.app";

const getNoticePosts = async () => {
  const docsRef = collection(db, "notice");
  const querySnapShot = await getDocs(docsRef);

  if (querySnapShot.empty) {
    return [];
  }

  const noticeData: NoticeType[] = [];

  querySnapShot.forEach((doc) => {
    const docData = {
      id: doc.id,
      title: doc.data()["title"],
      writer: doc.data()["writer"],
      image: doc.data()["image"],
      date: doc.data()["date"].toDate(),
      text: doc.data()["text"],
      view_cnt: doc.data()["view_cnt"],
    };

    noticeData.push(docData);
  });

  return noticeData;
};

const Sitemap = async (): Promise<MetadataRoute.Sitemap> => {
  const posts: NoticeType[] = await getNoticePosts();

  const postUrls: example[] = posts?.map((post) => ({
    url: `${publicURL}/notice/${post.id}`,
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
