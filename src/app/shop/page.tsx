"use client";

import axios from "axios";
import Footer from "component/Main/Footer";
import Navbar from "component/Main/Navbar";
import ProductList from "component/Product/ProductList";
import { useSearchParams } from "next/navigation";
import React, { use, useEffect, useState } from "react";
import "styles/shop.scss";

interface searchDataType {
  type: string;
  title: string;
  link: string;
  image: string;
  price: string;
  mallName: string;
  productId: number;
  productType: string;
  brand: string;
  maker: string;
  category1: string;
  category2: string;
  category3: string;
  category4: string;
}

export default function Shop() {
  const search = useSearchParams();
  const searchQuery = search ? search?.get("q") : null;

  const [searchData, setSearchData] = useState<searchDataType[] | undefined>();

  const fetchKeyword = async () => {
    const res = await axios.post("https://iuprofile.site/search", {
      keyword: searchQuery,
    });

    setSearchData(res.data);
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
