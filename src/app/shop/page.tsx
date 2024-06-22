import { clothes } from "component/Main/Peed/Peed";
import ProductList from "component/Product/ProductList";
import React from "react";
import "styles/shop.scss";

export const fetchClothes = async () => {
  const endPoint = "https://openapi.naver.com/v1/search/shop.json";
  const headerParams: any = {
    "X-Naver-Client-Id": process.env.NEXT_PUBLIC_NAVER_API_CLIENT_ID,
    "X-Naver-Client-Secret": process.env.NEXT_PUBLIC_NAVER_API_CLIENT_SECRET,
  };
  const query = "미니멀 패션";
  const display = 100;
  const res = await fetch(`${endPoint}?query=${query}&display=${display}`, {
    headers: headerParams,
  });

  if (res.ok) {
    const data = await res.json();

    return data.items;
  } else {
    return new Error(`${res.status}, 데이터 요청 실패`);
  }
};

export default async function Shop() {
  const allClothesData: clothes[] = await fetchClothes();
  return (
    <main className='shop-container'>
      <div className='wrap'>
        <ProductList trendClothes={allClothesData} />
      </div>
    </main>
  );
}
