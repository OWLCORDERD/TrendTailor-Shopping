"use client";

import React, { useState, useEffect } from "react";
import Pagenation from "./Pagenation";
import Image from "next/image";
import { clothes } from "component/Main/Peed/Peed";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { RootState } from "store/store";
import Link from "next/link";
import Loading from "component/fetchDB/loading/Loading";
import { useSearchParams } from "next/navigation";
import { canselSearch, getSearchClothesAsync } from "store/searchClothes";

const ProductList = () => {
  const search = useSearchParams();
  const searchQuery = search ? search?.get("q") : null;

  const clothesData = useAppSelector((state: RootState) => {
    return searchQuery === null
      ? state.staticDB.allData
      : state.searchDB.searchData;
  });

  const dispatch = useAppDispatch();

  const fetchKeyword = async () => {
    if (searchQuery !== null) {
      dispatch(getSearchClothesAsync(searchQuery));
    }
  };

  useEffect(() => {
    if (searchQuery !== null) {
      fetchKeyword();
    } else {
      dispatch(canselSearch());
    }
  }, [searchQuery]);

  const searchKeyword = useAppSelector((state) => state.searchDB.keyword);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [mobileMQuery, setMobileMQuery] = useState<boolean>(false);
  const postMaxLength: number = mobileMQuery ? 8 : 15;

  const indexOfLast = currentPage * postMaxLength;
  const indexOfFirst = indexOfLast - postMaxLength;

  const [currentPost, setCurrentPost] = useState<clothes[]>([]);

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const currentPostDB = clothesData.slice(indexOfFirst, indexOfLast);

    setCurrentPost(currentPostDB);

    setLoading(false);
  }, [currentPage, clothesData]);

  useEffect(() => {
    const mql = window.matchMedia("screen and (max-width : 768px)");

    if (mql.matches) {
      setMobileMQuery(mql.matches);
    }
  }, []);

  return (
    <section className='productList-container'>
      <div className='List-tabMenu'>
        <div className='tabMenu-title'>
          {searchQuery ? (
            <h1 className='search-title'>{`'${searchKeyword}' 통합 검색 결과`}</h1>
          ) : (
            <h1 className='default-title'>all wish clothes</h1>
          )}
        </div>

        <div className='product-count'>
          <span>
            {clothesData.length}
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
                </li>
              );
            })
          ) : (
            <Loading />
          )}
        </ul>
      </div>
      {clothesData.length > 0 ? (
        <Pagenation
          setCurrentPage={setCurrentPage}
          postMaxLength={postMaxLength}
          totalDBlength={clothesData.length}
          currentPage={currentPage}
          setLoading={setLoading}
        />
      ) : null}
    </section>
  );
};

export default ProductList;
