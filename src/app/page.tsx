import React from "react";
import ClothesPeed from "@/component/Main/Peed/Contents/ClothesPeed";
import MainBoard from "@/component/Main/Peed/MainBoard";
import SeasonPeed from "@/component/Main/Peed/Contents/SeasonPeed";
import TrendConsultant from "@/component/Main/Peed/MainBoard/TrendConsultant";

const getSeasonClothesDB = async () => {
  const seasonQuery = "봄 의류";

  const naverApiHeaders: any = {
    "X-Naver-Client-Id": process.env.NEXT_PUBLIC_NAVER_API_CLIENT_ID,
    "X-Naver-Client-Secret": process.env.NEXT_PUBLIC_NAVER_API_CLIENT_SECRET,
  };

  try {
    const res = await fetch(
      `https://openapi.naver.com/v1/search/shop.json?query=${seasonQuery}&display=20`,
      {
        headers: naverApiHeaders,
      }
    );

    if (res.ok) {
      const resData = await res.json();

      const clothesData: clothes[] = resData.items;

      /*Naver Open API 비동기 데이터 통신 결과값의 items 배열의 데이터들마다
    title 속성 문자열 값에 포함된 태그 제거하는 replace 작업 진행 */
      const replaceTitle: clothes[] = clothesData.map((clothes) => {
        return {
          title: clothes.title.replace(/<[^>]*>?/g, ""),
          link: clothes.link,
          image: clothes.image,
          lprice: clothes.lprice,
          hprice: clothes.hprice,
          mallName: clothes.mallName,
          productId: clothes.productId,
          productType: clothes.productType,
          brand: clothes.brand,
          maker: clothes.maker,
          category1: clothes.category1,
          category2: clothes.category2,
          category3: clothes.category3,
          category4: clothes.category4,
        };
      });
      console.log(replaceTitle);

      return replaceTitle;
    }
  } catch (err) {
    console.log(err);
  }
};

const getTrendClothes = async () => {
  const naverApiHeaders: any = {
    "X-Naver-Client-Id": process.env.NEXT_PUBLIC_NAVER_API_CLIENT_ID,
    "X-Naver-Client-Secret": process.env.NEXT_PUBLIC_NAVER_API_CLIENT_SECRET,
  };

  const apiEndPoint = "https://openapi.naver.com/v1/search/shop.json";
  const searchQuery = "미니멀 패션";

  try {
    const res = await fetch(`${apiEndPoint}?query=${searchQuery}&display=100`, {
      headers: naverApiHeaders,
    });

    if (res.ok) {
      const resData = await res.json();

      const clothesData: clothes[] = resData.items;

      /*Naver Open API 비동기 데이터 통신 결과값의 items 배열의 데이터들마다
  title 속성 문자열 값에 포함된 태그 제거하는 replace 작업 진행 */
      const replaceTitle: clothes[] = clothesData.map((clothes) => {
        return {
          title: clothes.title.replace(/<[^>]*>?/g, ""),
          link: clothes.link,
          image: clothes.image,
          lprice: clothes.lprice,
          hprice: clothes.hprice,
          mallName: clothes.mallName,
          productId: clothes.productId,
          productType: clothes.productType,
          brand: clothes.brand,
          maker: clothes.maker,
          category1: clothes.category1,
          category2: clothes.category2,
          category3: clothes.category3,
          category4: clothes.category4,
        };
      });

      return replaceTitle;
    }
  } catch (err) {
    console.log(err);
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
  const seasonClothes: clothes[] | undefined = await getSeasonClothesDB();
  const allClothes: clothes[] | undefined = await getTrendClothes();
  const trendYoutuber: channelDataType[] | undefined = await getChannelData();
  const trendYoutubeVideo: videoType[] | undefined = await getYoutuberVideo();

  return (
    <section className='MainPeed-container'>
      <MainBoard />
      <div className='Peed-wrapper'>
        <SeasonPeed seasonClothes={seasonClothes} />
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
