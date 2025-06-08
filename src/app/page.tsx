import React from "react";
import ClothesPeed from "@/component/Main/Peed/Contents/ClothesPeed";
import MainBoard from "@/component/Main/Peed/MainBoard";
import SeasonPeed from "@/component/Main/Peed/Contents/SeasonPeed";
import "./globals.scss";

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

const page = async () => {
  const seasonClothesDB: clothes[] | undefined = await getSeasonClothesDB();
  const allClothesDB: clothes[] | undefined = await getTrendClothes();

  return (
    <section className='MainPeed-container'>
      <MainBoard />
      <div className='Peed-wrapper'>
        <SeasonPeed seasonClothes={seasonClothesDB} />
        <ClothesPeed clothesData={allClothesDB} />
      </div>
    </section>
  );
};

export default page;
