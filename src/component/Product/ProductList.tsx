"use client";

import React, { useState, useEffect } from "react";
import Pagenation from "./Pagenation";
import Image from "next/image";
import { clothes } from "component/Main/Peed/Peed";
import Link from "next/link";
import Loading from "component/fetchDB/loading/Loading";

interface allClothesType {
  trendClothes: clothes[];
}

const ProductList = ({ trendClothes }: allClothesType) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [mobileMQuery, setMobileMQuery] = useState<boolean>(false);
  const [currentPost, setCurrentPost] = useState<clothes[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const postMaxLength: number = mobileMQuery ? 8 : 15;

  const indexOfLast = currentPage * postMaxLength;
  const indexOfFirst = indexOfLast - postMaxLength;

  const currentPostData = () => {
    const currentPostDB = trendClothes.slice(indexOfFirst, indexOfLast);

    setCurrentPost(currentPostDB);

    setLoading(false);
  };

  useEffect(() => {
    currentPostData();
  }, [currentPage]);

  const screenChange = (e: MediaQueryListEvent) => {
    setMobileMQuery(e.matches);
  };

  useEffect(() => {
    const mql = window.matchMedia("screen and (max-width : 768px)");

    if (mql.matches) {
      setMobileMQuery(mql.matches);
    }

    mql.addEventListener("change", screenChange);

    return () => {
      mql.removeEventListener("change", screenChange);
    };
  }, []);

  useEffect(() => {
    currentPostData();
  }, [mobileMQuery]);

  return (
    <section className='productList-container'>
      <div className='List-tabMenu'>
        <div className='tabMenu-title'>
          <h1 className='default-title'>금주 추천 트렌드 의류</h1>
        </div>

        <div className='product-count'>
          <span>
            {trendClothes.length}
            개의 상품
          </span>
        </div>
      </div>

      <div className='product-Box'>
        <ul className='all-product'>
          {!loading ? (
            currentPost.map((clothes) => {
              return (
                <li className='product-item' key={clothes.productId}>
                  <Link
                    href={{
                      pathname: `/shop/${clothes.productId}`,
                    }}
                  >
                    <div className='product-image'>
                      <Image
                        src={clothes.image}
                        alt={`${clothes.title} 이미지`}
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
                </li>
              );
            })
          ) : (
            <Loading />
          )}
        </ul>
      </div>
      {trendClothes.length > 0 ? (
        <Pagenation
          setCurrentPage={setCurrentPage}
          postMaxLength={postMaxLength}
          totalDBlength={trendClothes.length}
          currentPage={currentPage}
          setLoading={setLoading}
        />
      ) : null}
    </section>
  );
};

export default ProductList;
