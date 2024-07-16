"use client";

import { clothes } from "component/Main/Peed/Peed";
import Loading from "component/fetchDB/loading/Loading";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "store/hooks";
import Pagenation from "./Pagenation";
import { useSearchParams } from "next/navigation";
import { getSearchClothesAsync } from "store/searchClothes";

const SearchProductList = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currentPost, setCurrentPost] = useState<clothes[]>([]);
  const [mobileMQuery, setMobileMQuery] = useState<boolean>(false);
  const postMaxLength: number = mobileMQuery ? 8 : 15;
  const lastDataIndex = currentPage * postMaxLength;
  const firstDataIndex = lastDataIndex - postMaxLength;

  const searchParams = useSearchParams();

  const searchQuery = searchParams ? searchParams.get("q") : null;

  const dispatch = useAppDispatch();

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

  const searchClothesData = useAppSelector((state) => {
    return state.searchDB.searchData;
  });

  const searchKeyword = useAppSelector((state) => {
    return state.searchDB.keyword;
  });

  const currentPostData = () => {
    const searchDataSlice = searchClothesData.slice(
      firstDataIndex,
      lastDataIndex
    );

    setCurrentPost(searchDataSlice);

    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
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
    if (searchClothesData) {
      setCurrentPage(1);
      currentPostData();
    }
  }, [searchClothesData]);

  useEffect(() => {
    currentPostData();
  }, [mobileMQuery]);

  return (
    <section className='productList-container'>
      <div className='List-tabMenu'>
        <div className='tabMenu-title'>
          <h1 className='default-title'>{`'${searchKeyword}' 통합 검색 결과`}</h1>
        </div>

        <div className='product-count'>
          <span>
            {searchClothesData.length}
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
                      pathname: `/shop/search/${clothes.productId}`,
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
      {searchClothesData.length > 0 ? (
        <Pagenation
          setCurrentPage={setCurrentPage}
          postMaxLength={postMaxLength}
          totalDBlength={searchClothesData.length}
          currentPage={currentPage}
          setLoading={setLoading}
        />
      ) : null}
    </section>
  );
};

export default SearchProductList;
