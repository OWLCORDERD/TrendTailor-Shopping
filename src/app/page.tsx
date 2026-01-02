import React from "react";
import ClothesPeed from "@/component/Main/Peed/Contents/ClothesPeed";
import MainBoard from "@/component/Main/Peed/MainBoard";
import SeasonPeed from "@/component/Main/Peed/Contents/SeasonPeed";
import TrendConsultant from "@/component/Main/Peed/MainBoard/TrendConsultant";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

// 2026.01.01: 1달마다 cron 스케줄링으로 업데이트되는 트랜드 의류 데이터 조회
const getTrendClothes = async () => {
  const collectionRef = collection(db, "clothes");

  const docs = await getDocs(collectionRef);

  if (docs.empty) {
    return [];
  } else {
    const clothesData: clothes[] = [];
    docs.forEach((doc) => {
      const data = doc.data();
      clothesData.push({
        doc_id: doc.id,
        title: data.title,
        image: data.image,
        link: data.link,
        lprice: data.lprice,
        hprice: data.hprice,
        mallName: data.mallName,
        productId: data.productId,
        productType: data.productType,
        brand: data.brand,
        maker: data.maker,
        category1: data.category1,
        category2: data.category2,
        category3: data.category3,
        category4: data.category4,
        viewCount: data.viewCount,
        likeCount: data.likeCount,
        collectedAt: data.collectedAt,
        searchStyle: data.searchStyle,
        searchCategory: data.searchCategory,
      });
    });
    return clothesData;
  }
};

// 2025.06.22: 금주 1위 컨설턴트 유튜버 채널 영상 조회
const getYoutuberVideo = async () => {
  const youtubeAPI = "https://www.googleapis.com/youtube/v3/search";

  try {
    const res = await fetch(
      `${youtubeAPI}?part=snippet&maxResults=50&channelId=UC8a6z7i9qypp9PqJ_0HhBrw&type=video&videoDuration=medium&key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}`,
      {
        // 유튜버가 새로 올린 업로드 영상을 고려하여 1시간 캐싱 시간 제한
        next: { revalidate: 3600 }, // 동일한 요청 캐싱 후 1시간마다 데이터 갱신
      }
    );

    const data = await res.json();

    return data.items;
  } catch (err) {
    console.log(err);
  }
};

// 2025.06.15: 금주 1위 컨설턴트 유튜버 채널 정보 조회
const getChannelData = async () => {
  const youtubeAPI = "https://www.googleapis.com/youtube/v3/channels";

  const trendYoutuber = "UC8a6z7i9qypp9PqJ_0HhBrw"; // 채널 ID
  try {
    const res = await fetch(
      `${youtubeAPI}?part=snippet&id=${trendYoutuber}&key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}`,
      {
        // 특정 유튜버 ID에 따라 불러오는 정보는 고정적이므로 정적 캐싱 활성화
        cache: "force-cache",
      }
    );

    const data = await res.json();

    return data.items;
  } catch (err) {
    console.log(err);
  }
};

const page = async () => {
  const allClothes: clothes[] | undefined = await getTrendClothes();
  const trendYoutuber: channelDataType[] | undefined = await getChannelData();
  const trendYoutubeVideo: videoType[] | undefined = await getYoutuberVideo();
  return (
    <section className='MainPeed-container'>
      <MainBoard />
      <div className='Peed-wrapper'>
        {/* <SeasonPeed seasonClothes={seasonClothes} /> */}
        <TrendConsultant
          trendYoutuber={trendYoutuber}
          trendYoutubeVideo={trendYoutubeVideo}
        />
        <ClothesPeed clothesData={allClothes} />
      </div>
    </section>
  );
};

export default page;
