"use client";

import axios from "axios";
import React, { useState, useEffect } from "react";
import Pagenation from "./Pagenation";
import { RotatingLines } from "react-loader-spinner";
import { useContext } from "react";
import { ThemeContext } from "../../../context/ThemeContext";
import Image from "next/image";
import { clothes } from "component/Main/Peed/Peed";

interface propsType {
  searchData: clothes[] | undefined;
}

const ProductList = ({ searchData }: propsType) => {
  const { mode } = useContext(ThemeContext);

  const [clothData, setClothData] = useState<clothes[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const postMaxLength: number = 12;

  const indexOfLast = currentPage * postMaxLength;
  const indexOfFirst = indexOfLast - postMaxLength;

  const [currentPost, setCurrentPost] = useState<clothes[]>([]);

  const [loading, setLoading] = useState<boolean>(true);

  const getClothesDB = async () => {
    /*데이터 fetching 하는동안 로딩 스피너 활성화 */
    setLoading(true);

    const query: string = "스트릿패션";
    const maxResults: number = 100;
    /*Naver OpenApi 개발자 애플리케이션에 클라이언트 도메인을 등록하였기에
    /v1/search/shop.json 라우터에 파라미터값과 clientId, clientSecret값을 함께 전송하여 데이터 요청 */
    const res = await axios.get(`/api/clothes`, {
      params: {
        query: query,
        display: maxResults,
      },
      headers: {
        "X-Naver-Client-Id": process.env.NEXT_PUBLIC_NAVER_API_CLIENT_ID,
        "X-Naver-Client-Secret":
          process.env.NEXT_PUBLIC_NAVER_API_CLIENT_SECRET,
      },
    });

    if (res.status === 200) {
      const data: clothes[] = res.data.items;

      /*네이버 API에서 응답값으로 전송받은 clothess 배열의 의류 데이터 객체 내부에서
        title 의류 제목에 문자열 내부에 태그가 포함되어있어 정규식으로 제거하는 작업 진행 */
      const replaceTxt: clothes[] = await new Promise((res, rej) => {
        const replaceTxtData: clothes[] = data.map((cloth) => {
          return {
            title: cloth.title.replace(/<[^>]*>?/g, ""),
            link: cloth.link,
            image: cloth.image,
            lprice: cloth.lprice,
            hprice: cloth.hprice,
            mallName: cloth.mallName,
            productId: cloth.productId,
            productType: cloth.productType,
            brand: cloth.brand,
            maker: cloth.maker,
            category1: cloth.category1,
            category2: cloth.category2,
            category3: cloth.category3,
            category4: cloth.category4,
          };
        });

        if (replaceTxtData) {
          res(replaceTxtData);
        } else {
          rej(new Error("not doing to replace Txt"));
        }
      });

      /* title 속성값을 변경한 값을 포함한 새로운 clothess data 객체 배열을 clothData state에 저장 */
      setClothData(replaceTxt);

      /*Naver Api Data Fetch -> title 필드 값 replace 변경 -> clothData state에 새로운 clothess 객체 배열 저장 
      이 모든 단계가 성공적으로 끝날 시 Loading 스피너 종료 */
      setLoading(false);
    } else {
      console.log(res.status);
    }
  };

  useEffect(() => {
    const currentPosts = (clothDB: clothes[]) => {
      if (searchData !== undefined && searchData.length > 0) {
        const currentPostDB = searchData.slice(indexOfFirst, indexOfLast);

        setCurrentPost(currentPostDB);

        setLoading(false);
      } else {
        const currentPostDB = clothDB.slice(indexOfFirst, indexOfLast);

        setCurrentPost(currentPostDB);

        setLoading(false);
      }
    };

    currentPosts(clothData);
  }, [clothData, currentPage, searchData]);

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
              : clothData.length}
            개의 상품
          </span>
        </div>
      </div>

      <div className='product-Box'>
        {loading === false ? (
          currentPost.map((clothes) => {
            return (
              <div className='product-item' key={clothes.productId}>
                <a href='#' className='product-image'>
                  <Image
                    src={clothes.image}
                    alt={`${clothes.title} 의류 이미지 사진`}
                    width='400'
                    height='480'
                  />
                </a>

                <div className='product-content'>
                  <span className='product-mall'>{clothes.mallName}</span>
                  <h2 className='product-title'>{clothes.title}</h2>
                  <span className='product-price'>{clothes.lprice}</span>
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
        DBlength={clothData.length}
        currentPage={currentPage}
        searchDBlength={searchData?.length}
        setLoading={setLoading}
      />
    </section>
  );
};

export default ProductList;
