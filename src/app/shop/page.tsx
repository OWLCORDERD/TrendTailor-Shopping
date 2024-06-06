"use client";

import ProductList from "component/Product/ProductList";
import { useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import { getClothesAsync, getSearchClothesAsync } from "store/asyncAction";
import { useAppDispatch } from "store/hooks";
import "styles/shop.scss";

export default function Shop() {
  const search = useSearchParams();
  const searchQuery = search ? search?.get("q") : null;

  const dispatch = useAppDispatch();

  const fetchKeyword = async () => {
    if (searchQuery !== null) {
      dispatch(getSearchClothesAsync(searchQuery));
    }
  };

  const getClothesDB = async () => {
    /*Naver OpenApi 개발자 애플리케이션에 클라이언트 도메인을 등록하였기에
    /v1/search/shop.json 라우터에 파라미터값과 clientId, clientSecret값을 함께 전송하여 데이터 요청 */
    dispatch(getClothesAsync());
  };

  useEffect(() => {
    if (searchQuery !== null) {
      fetchKeyword();
    }
  }, [searchQuery]);

  useEffect(() => {
    getClothesDB();
  }, []);

  return (
    <main className='shop-container'>
      <div className='wrap'>
        <ProductList searchQuery={searchQuery} />
      </div>
    </main>
  );
}
