"use client";

import NewsSlider from "component/Main/Peed/NewsSlider";
import ProductList from "component/Product/ProductList";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import "styles/shop.scss";

interface searchDataType {
  type: string;
  title: string;
  link: string;
  image: string;
  price: string;
  mallName: string;
  productId: string;
  productType: string;
  brand: string;
  maker: string;
  category1: string;
  category2: string;
  category3: string;
  category4: string;
}

export default function page() {
  const search = useSearchParams();
  const searchQuery = search ? search?.get("q") : null;

  const [searchData, setSearchData] = useState<searchDataType[] | undefined>();

  const url = `http://localhost:3001/items?q=${searchQuery}`;

  const fetchKeyword = async (url: string) => {
    const res = await fetch(url);

    const data: searchDataType[] = await res.json();

    setSearchData(data);
  };

  useEffect(() => {
    fetchKeyword(url);
  }, [searchQuery]);

  return (
    <div className='shop-container'>
      <div className='wrap'>
        <NewsSlider />

        <ProductList searchData={searchData} />
      </div>
    </div>
  );
}
