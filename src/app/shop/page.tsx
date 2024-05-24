"use client";

import ProductList from "component/Product/ProductList";
import { useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import { getSearchClothesAsync } from "store/asyncAction";
import { useAppDispatch, useAppSelector } from "store/hooks";
import "styles/shop.scss";

export default function Shop() {
  const search = useSearchParams();
  const searchQuery = search ? search?.get("q") : null;

  const dispatch = useAppDispatch();

  const searchData = useAppSelector((state) => state.clothes.searchData);

  const fetchKeyword = async () => {
    if (searchQuery !== null) {
      dispatch(getSearchClothesAsync(searchQuery));
    }
  };

  useEffect(() => {
    if (searchQuery !== null) {
      fetchKeyword();
    }
  }, [searchQuery]);

  return (
    <main className='shop-container'>
      <div className='wrap'>
        <ProductList searchData={searchData} />
      </div>
    </main>
  );
}
