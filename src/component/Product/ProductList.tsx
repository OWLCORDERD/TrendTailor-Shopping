"use client";

import Search from "component/Search/Search";
import UseFetch from "component/UseFetch";
import React, { useState, useEffect } from "react";
import Pagenation from "./Pagenation";

export interface clothes {
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

interface propsType {
  searchData: clothes[] | undefined;
}

const ProductList = ({ searchData }: propsType) => {
  const clothDB: clothes[] = UseFetch("http://localhost:3001/items");

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [postMaxLength, setPostMaxLength] = useState<number>(12);

  const indexOfLast = currentPage * postMaxLength;
  const indexOfFirst = indexOfLast - postMaxLength;

  const [currentPost, setCurrentPost] = useState<clothes[]>([]);

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

  return (
    <div className='productList-container'>
      <div className='List-tabMenu'>
        <div className='tabMenu-title'>
          <h1>all wish clothes</h1>
        </div>

        <ul className='tab-Menu'>
          <li>
            <a href='#'>전체보기</a>
          </li>
          <li>
            <a href='#'>블라우스 & 셔츠</a>
          </li>
          <li>
            <a href='#'>아우터</a>
          </li>
          <li>
            <a href='#'>하의</a>
          </li>
        </ul>

        <div className='searchCount-Box'>
          <Search />

          <div className='product-count'>
            <span>
              {searchData?.length ? searchData.length : clothDB.length}
              개의 상품
            </span>
          </div>
        </div>
      </div>

      <div className='product-Box'>
        {currentPost.map((item) => {
          return (
            <div className='product-item'>
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
        })}
      </div>
      <Pagenation
        setCurrentPage={setCurrentPage}
        postMaxLength={postMaxLength}
        DBlength={clothDB.length}
        currentPage={currentPage}
        searchDBlength={searchData?.length}
      />
    </div>
  );
};

export default ProductList;
