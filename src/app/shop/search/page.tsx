import React from "react";
import type { Metadata } from "next";
import "styles/shop.scss";
import SearchProductList from "component/Product/SearchProductList";

// 2026.10.18: 내부 검색 결과 페이지는 검색 결과에서 제외
export const metadata: Metadata = {
  title: "상품 검색 결과",
  robots: { index: false, follow: true },
};

const page = () => {
  return (
    <main className='shop-container'>
      <div className='wrap'>
        <SearchProductList />
      </div>
    </main>
  );
};

export default page;
