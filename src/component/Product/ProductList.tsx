"use client";

import React, { useState, useEffect } from "react";
import Pagenation from "./Pagenation";
import Image from "next/image";
import { clothes } from "component/Main/Peed/Peed";
import { useAppSelector } from "store/hooks";
import { RootState } from "store/store";
import Link from "next/link";
import Loading from "component/fetchDB/loading/Loading";

interface searchQueryType {
  searchQuery: string | null;
}

const ProductList = ({ searchQuery }: searchQueryType) => {
  const clothesData = useAppSelector((state: RootState) => {
    return state.clothes.data;
  });

  const searchData = useAppSelector((state) => state.clothes.searchData);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const postMaxLength: number = 12;

  const indexOfLast = currentPage * postMaxLength;
  const indexOfFirst = indexOfLast - postMaxLength;

  const [currentPost, setCurrentPost] = useState<clothes[]>([]);

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (searchData && searchData.length > 0) {
      const currentPostDB = searchData.slice(indexOfFirst, indexOfLast);

      setCurrentPost(currentPostDB);

      setLoading(false);
    } else {
      const currentPostDB = clothesData.slice(indexOfFirst, indexOfLast);

      setCurrentPost(currentPostDB);

      setLoading(false);
    }
  }, [clothesData, currentPage, searchData]);

  return (
    <section className='productList-container'>
      <div className='List-tabMenu'>
        <div className='tabMenu-title'>
          {searchQuery !== null ? (
            <h1 className='search-title'>{`'${searchQuery}' 통합 검색 결과`}</h1>
          ) : (
            <h1 className='default-title'>all wish clothes</h1>
          )}
        </div>

        <div className='product-count'>
          <span>
            {searchData && searchData.length > 0
              ? searchData.length
              : clothesData?.length}
            개의 상품
          </span>
        </div>
      </div>

      <div className='product-Box'>
        {!loading ? (
          currentPost.map((clothes) => {
            return (
              <div className='product-item' key={clothes.productId}>
                <Link
                  href={{
                    pathname: `/shop/${clothes.productId}`,
                    query: {
                      searchData: searchData.length > 0 ? "Search" : "Default",
                    },
                  }}
                >
                  <div className='product-image'>
                    <Image
                      src={clothes.image}
                      alt={`${clothes.title} 의류 이미지 사진`}
                      width='400'
                      height='480'
                    />
                  </div>
                  <div className='product-content'>
                    <span className='product-mall'>{clothes.mallName}</span>
                    <div className='product-title'>{clothes.title}</div>
                    <span className='product-price'>{clothes.lprice}원</span>
                  </div>
                </Link>
              </div>
            );
          })
        ) : (
          <Loading />
        )}
      </div>
      {clothesData.length > 0 || searchData.length > 0 ? (
        <Pagenation
          setCurrentPage={setCurrentPage}
          postMaxLength={postMaxLength}
          totalDBlength={clothesData.length}
          currentPage={currentPage}
          searchDBlength={searchData.length}
          setLoading={setLoading}
        />
      ) : null}
    </section>
  );
};

export default ProductList;
