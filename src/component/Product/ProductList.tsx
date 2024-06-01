"use client";

import React, { useState, useEffect } from "react";
import Pagenation from "./Pagenation";
import { RotatingLines } from "react-loader-spinner";
import { useContext } from "react";
import { ThemeContext } from "../../../context/ThemeContext";
import Image from "next/image";
import { clothes } from "component/Main/Peed/Peed";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { RootState } from "store/store";
import { currentProduct, getClothesAsync } from "store/asyncAction";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface propsType {
  searchData: clothes[];
}

const ProductList = ({ searchData }: propsType) => {
  const clothesData = useAppSelector((state: RootState) => {
    return state.clothes.data;
  });

  const router = useRouter();

  const dispatch = useAppDispatch();

  const getClothesDB = async () => {
    /*데이터 fetching 하는동안 로딩 스피너 활성화 */
    setLoading(true);

    /*Naver OpenApi 개발자 애플리케이션에 클라이언트 도메인을 등록하였기에
    /v1/search/shop.json 라우터에 파라미터값과 clientId, clientSecret값을 함께 전송하여 데이터 요청 */
    dispatch(getClothesAsync());

    /*Naver Api Data Fetch -> title 필드 값 replace 변경 -> clothData state에 새로운 clothess 객체 배열 저장 
    이 모든 단계가 성공적으로 끝날 시 Loading 스피너 종료 */
    setLoading(false);
  };

  const { mode } = useContext(ThemeContext);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const postMaxLength: number = 12;

  const indexOfLast = currentPage * postMaxLength;
  const indexOfFirst = indexOfLast - postMaxLength;

  const [currentPost, setCurrentPost] = useState<clothes[]>([]);

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const currentPosts = (clothesDB: clothes[]) => {
      if (searchData !== null && searchData.length > 0) {
        const currentPostDB = searchData.slice(indexOfFirst, indexOfLast);

        setCurrentPost(currentPostDB);

        setLoading(false);
      } else {
        const currentPostDB = clothesDB.slice(indexOfFirst, indexOfLast);

        setCurrentPost(currentPostDB);

        setLoading(false);
      }
    };

    currentPosts(clothesData);
  }, [clothesData, currentPage, searchData]);

  useEffect(() => {
    getClothesDB();
  }, []);

  return (
    <section className='productList-container'>
      <div className='List-tabMenu'>
        <div className='tabMenu-title'>
          <h1>all wish clothes</h1>
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
        {loading === false ? (
          currentPost.map((clothes) => {
            return (
              <Link
                href={`/shop/${clothes.productId}`}
                className='product-item'
                key={clothes.productId}
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
                  <h2 className='product-title'>{clothes.title}</h2>
                  <span className='product-price'>{clothes.lprice}원</span>
                </div>
              </Link>
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
        DBlength={clothesData.length}
        currentPage={currentPage}
        searchDBlength={searchData?.length}
        setLoading={setLoading}
      />
    </section>
  );
};

export default ProductList;
