"use client";

import axios from "axios";
import React, { useState, useEffect } from "react";
import Pagenation from "./Pagenation";
import { RotatingLines } from "react-loader-spinner";
import { useContext } from "react";
import { ThemeContext } from "../../../context/ThemeContext";

export interface clothes {
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

interface propsType {
  searchData: clothes[] | undefined;
}

const ProductList = ({ searchData }: propsType) => {
  const { mode } = useContext(ThemeContext);

  const [clothDB, setClothDB] = useState<clothes[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const postMaxLength: number = 12;

  const indexOfLast = currentPage * postMaxLength;
  const indexOfFirst = indexOfLast - postMaxLength;

  const [currentPost, setCurrentPost] = useState<clothes[]>([]);

  const [loading, setLoading] = useState<boolean>(true);

  const getClothesDB = async () => {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_CLIENT_DOMAIN}/api/clothes`
    );

    const { data } = res.data;

    setClothDB(data);
  };

  useEffect(() => {
    const currentPosts = (clothDB: clothes[]) => {
      if (searchData !== undefined && searchData.length > 0) {
        const currentPostDB = searchData.slice(indexOfFirst, indexOfLast);

        setCurrentPost(currentPostDB);
      } else {
        const currentPostDB = clothDB.slice(indexOfFirst, indexOfLast);

        setCurrentPost(currentPostDB);
      }
    };

    currentPosts(clothDB);
  }, [clothDB, currentPage, searchData]);

  useEffect(() => {
    getClothesDB();

    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  return (
    <section className='productList-container'>
      <div className='List-tabMenu'>
        <div className='tabMenu-title'>
          <h1>all wish clothes</h1>
        </div>

        <div className='product-count'>
          <span>
            {searchData?.length ? searchData.length : clothDB.length}
            개의 상품
          </span>
        </div>
      </div>

      <div className='product-Box'>
        {loading === false ? (
          currentPost.map((item) => {
            return (
              <div className='product-item' key={item.productId}>
                <div className='product-image'>
                  <img src={item.image} alt='product-image' />
                </div>

                <div className='product-content'>
                  <span className='product-mall'>{item.mallName}</span>
                  <h2 className='product-title'>{item.title}</h2>
                  <span className='product-price'>{item.price}</span>
                </div>
              </div>
            );
          })
        ) : (
          <div className='loader'>
            <RotatingLines
              strokeColor={mode === "dark" ? "white" : "black"}
              strokeWidth='3'
              animationDuration='0.75'
              width='50'
              visible={true}
            />
          </div>
        )}
      </div>
      <Pagenation
        setCurrentPage={setCurrentPage}
        postMaxLength={postMaxLength}
        DBlength={clothDB.length}
        currentPage={currentPage}
        searchDBlength={searchData?.length}
        setLoading={setLoading}
      />
    </section>
  );
};

export default ProductList;
