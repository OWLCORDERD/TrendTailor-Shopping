import React from 'react';
import type { Metadata } from 'next';
import 'styles/shop.scss';
import ClothesPeed from '@/component/Main/Peed/Contents/ClothesPeed';
import Banner, { slideType } from '@/component/Main/Peed/Clothes/Banner';
import NoticeBoard from '@/component/Main/Peed/Clothes/NoticeBoard';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/shared/lib/firebase';
import TrendConsultant from '@/component/Main/Peed/TrendConsultant';
import {
  getNoticeList,
  NoticeType,
} from '@/feature/notice/notice.service';
import { getFilteredChannelVideos } from '@/feature/trend/services/api/youtube';

// const fetchClothes = async () => {
//   const endPoint = "https://openapi.naver.com/v1/search/shop.json";
//   const headerParams: any = {
//     "X-Naver-Client-Id": process.env.NEXT_PUBLIC_NAVER_API_CLIENT_ID,
//     "X-Naver-Client-Secret": process.env.NEXT_PUBLIC_NAVER_API_CLIENT_SECRET,
//   };
//   const query = "미니멀 패션";
//   const display = 100;
//   const res = await fetch(`${endPoint}?query=${query}&display=${display}`, {
//     headers: headerParams,
//   });

//   if (res.ok) {
//     const data = await res.json();

//     return data.items;
//   } else {
//     return new Error(`${res.status}, 데이터 요청 실패`);
//   }
// };

// 2026.01.01: 1달마다 cron 스케줄링으로 업데이트되는 트랜드 의류 데이터 조회
const getTrendClothes = async () => {
  const collectionRef = collection(db, 'clothes');

  const docs = await getDocs(collectionRef);

  if (docs.empty) {
    return [];
  } else {
    const clothesData: trendClothes[] = [];
    docs.forEach(doc => {
      const data = doc.data();
      clothesData.push({
        ...data,
        createdAt: data.createdAt.toDate?.()?.toISOString?.() ?? '',
        updatedAt: data.updatedAt.toDate?.()?.toISOString?.() ?? '',
      } as trendClothes);
    });
    return clothesData;
  }
};

// 2025.06.22: 금주 1위 컨설턴트 유튜버 채널 영상 조회
const getYoutuberVideo = async () => {
  const channelId = 'UC8a6z7i9qypp9PqJ_0HhBrw'; // 채널 ID
  const apiKey = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY ?? '';

  try {
    // 유튜버 채널 추천 영상 > 유튜브 서비스 객체 파이프라인 호출
    const videos = await getFilteredChannelVideos(channelId, apiKey);

    return videos;
  } catch (err) {
    console.log(err);
    return [];
  }
};

// 2025.06.15: 금주 1위 컨설턴트 유튜버 채널 정보 조회
const getChannelData = async () => {
  const youtubeAPI = 'https://www.googleapis.com/youtube/v3/channels';

  const trendYoutuber = 'UC8a6z7i9qypp9PqJ_0HhBrw'; // 채널 ID
  try {
    const res = await fetch(
      `${youtubeAPI}?part=snippet&id=${trendYoutuber}&key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}`,
      {
        // 특정 유튜버 ID에 따라 불러오는 정보는 고정적이므로 정적 캐싱 활성화
        cache: 'force-cache',
      }
    );

    const data = await res.json();

    return data.items;
  } catch (err) {
    console.log(err);
  }
};

// 상단 배너 슬라이드 조회
const bannerList = async () => {
  const docs = await getDocs(collection(db, 'slide'));

  const slideList: slideType[] = [];

  docs.forEach(doc => {
    const data = doc.data();
    slideList.push({
      id: Number(doc.id),
      image: data.image,
      title: data.title,
      info: data.info,
    });
  });

  return slideList;
};

export const metadata: Metadata = {
  title: '트렌드 쇼핑',
  description:
    '월간 트렌드 키워드로 수집한 금주 트렌드 의류와 패션 컨설턴트 유튜버 영상을 한 곳에서 살펴보세요.',
  alternates: { canonical: '/shop' },
};

export default async function Shop() {
  const allClothes: trendClothes[] | undefined = await getTrendClothes();
  const trendYoutuber: channelDataType[] | undefined = await getChannelData();
  const trendYoutubeVideo: videoType[] | undefined = await getYoutuberVideo();
  const slideList: slideType[] = await bannerList();
  const noticeList: NoticeType[] = await getNoticeList();
  return (
    <section className="shop-container">
      <Banner slideDB={slideList} />
      <NoticeBoard noticeDB={noticeList} />
      <div className="Peed-wrapper">
        <TrendConsultant
          trendYoutuber={trendYoutuber}
          trendYoutubeVideo={trendYoutubeVideo}
        />
        <ClothesPeed clothesData={allClothes} />
      </div>
    </section>
  );
}
