"use client";

import axios from "axios";
import Footer from "component/Main/Footer";
import Navbar from "component/Main/Navbar";
import { clothes } from "component/Main/Peed/Peed";
import ProductList from "component/Product/ProductList";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
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
      <Navbar />
      <div className='wrap'>
        <ProductList searchData={searchData} />
      </div>
      <Footer />
    </main>
  );
}
