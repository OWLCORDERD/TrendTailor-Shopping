"use client";

import axios from "axios";
import Footer from "component/Main/Footer";
import Navbar from "component/Main/Navbar";
import { clothes } from "component/Main/Peed/Peed";
import ProductList from "component/Product/ProductList";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import "styles/shop.scss";

export default function Shop() {
  const search = useSearchParams();
  const searchQuery = search ? search?.get("q") : null;

  const [searchData, setSearchData] = useState<clothes[] | undefined>([]);

  const fetchKeyword = async () => {
    if (searchQuery !== null) {
      const maxResults: number = 50;
      const res = await axios.get(`/api/clothes`, {
        params: {
          query: searchQuery,
          display: maxResults,
        },
        headers: {
          "X-Naver-Client-Id": process.env.NEXT_PUBLIC_NAVER_API_CLIENT_ID,
          "X-Naver-Client-Secret":
            process.env.NEXT_PUBLIC_NAVER_API_CLIENT_SECRET,
        },
      });

      if (res.status === 200) {
        const clothesData: clothes[] = res.data.items;

        /*네이버 API에서 응답값으로 전송받은 items 배열의 의류 데이터 객체 내부에서
        title 의류 제목에 문자열 내부에 태그가 포함되어있어 정규식으로 제거하는 작업 진행 */
        const replaceTxt: clothes[] = clothesData.map((cloth) => {
          return {
            title: cloth.title.replace(/<[^>]*>?/g, ""),
            link: cloth.link,
            image: cloth.image,
            lprice: cloth.lprice,
            hprice: cloth.hprice,
            mallName: cloth.mallName,
            productId: cloth.productId,
            productType: cloth.productType,
            brand: cloth.brand,
            maker: cloth.maker,
            category1: cloth.category1,
            category2: cloth.category2,
            category3: cloth.category3,
            category4: cloth.category4,
          };
        });

        /* 기존 title 값을 replace 메소드로 생성된 새로운 string 값으로 대체하여 title 프로퍼티로 설정하고, 나머지 속성값은
        기존에 응답값으로 받은 속성값으로 설정하여 하나의 객체로 생성하고 searchData state값에 업데이트 */
        setSearchData(replaceTxt);
      } else {
        console.log(res.status);
      }
    }
  };

  useEffect(() => {
    fetchKeyword();
  }, [searchQuery]);

  return (
    <main className='shop-container'>
      <Navbar />
      <div className='wrap'>
        <ProductList searchData={searchData} />
      </div>
      <Footer />
    </main>
  );
}
