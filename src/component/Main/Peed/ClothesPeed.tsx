"use client";

import Image from "next/image";
import "styles/clothesPeed.scss";
import { useCallback, useContext, useEffect, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { clothes } from "./Peed";
import { Oval } from "react-loader-spinner";
import { ThemeContext } from "../../../../context/ThemeContext";

const ClothesPeed = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [clothesData, setClothesData] = useState<clothes[] | undefined>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const postMaxlength = 8;
  const lastIndex = currentPage * postMaxlength;
  const firstIndex = lastIndex - postMaxlength;
  const [currentDB, setCurrentDB] = useState<clothes[]>([]);
  const { mode } = useContext(ThemeContext);

  const currentDBUpdate = useCallback(() => {
    if (clothesData !== undefined) {
      const currentData: clothes[] = clothesData.slice(firstIndex, lastIndex);

      const pushdata = [...currentDB];

      pushdata.push(...currentData);

      setCurrentDB(pushdata);

      setLoading(false);
    }
  }, [currentPage]);

  const nextPage = (e: React.MouseEvent<HTMLDivElement>) => {
    if (clothesData !== undefined) {
      const maxPage = Math.ceil(clothesData.length / postMaxlength);

      if (currentPage < maxPage) {
        setCurrentPage((prev) => {
          return prev + 1;
        });
      }
    }
  };

  const naverApiHeaders: any = {
    "X-Naver-Client-Id": process.env.NEXT_PUBLIC_NAVER_API_CLIENT_ID,
    "X-Naver-Client-Secret": process.env.NEXT_PUBLIC_NAVER_API_CLIENT_SECRET,
  };

  const fetchClothesData = async () => {
    const res = await fetch(`/api/clothes?query=스트릿패션&display=50`, {
      cache: "no-store",
      headers: naverApiHeaders,
    });

    if (!res.ok) {
      new Error("not connect to naver open api");
    }

    const data = await res.json();

    /*응답 값중 items 배열에 검색결과 의류 더미데이터들이 있음 */
    const clothesItems: clothes[] = data.items;

    /* 네이버 의류 API shop.json에서 데이터를 불러올때 title string값에 태그가 포함되어있음
    items배열에 map함수를 사용하여 각 item마다의 title값에만 replace 메소드 정규식을 통하여 태그 string 제거 */
    const replaceTitle: clothes[] = clothesItems.map((cloth) => {
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

    setClothesData(replaceTitle);
  };

  const firstCurrentDB = () => {
    if (clothesData) {
      const currentData: clothes[] = clothesData.slice(firstIndex, lastIndex);

      const pushdata = [...currentDB];

      pushdata.push(...currentData);

      setCurrentDB(pushdata);

      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchClothesData();
  }, []);

  useEffect(() => {
    if (currentDB.length > 0) return;

    if (clothesData && clothesData.length > 0) {
      firstCurrentDB();
    }
  }, [clothesData]);

  useEffect(() => {
    setLoading(true);
    currentDBUpdate();
  }, [currentPage]);

  return (
    <div className='ClothesPeed-container'>
      <div className='ClothesPeed-titleBox'>
        <h1 className='ClothesPeed-title'>More Wish Clothes</h1>
        <p className='ClothesPeed-info'>
          WISH에서 단독으로 추천하는 의류들을 소개합니다.
        </p>
      </div>

      <div className='slider-wrap'>
        {currentDB.map((item) => {
          return (
            <div className='product-item' key={item.productId}>
              <div className='slide-ImgBox'>
                <Image
                  src={item.image}
                  alt='ClothesImg'
                  width='500'
                  height='500'
                />
              </div>

              <div className='product-content'>
                <h2 className='product-title'>{item.title}</h2>
                <p className='product-mall'>{item.mallName}</p>
                <span className='product-price'>{item.lprice}</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className='viewMore-container'>
        {!!loading ? (
          <div className='loading'>
            <Oval
              visible={true}
              height='50'
              width='50'
              color={mode === "light" ? "#000" : "#fff"}
              secondaryColor={
                mode === "light" ? "rgba(0,0,0,0.5)" : "rgba(255,255,255,0.5)"
              }
              ariaLabel='oval-loading'
              wrapperStyle={{}}
              wrapperClass=''
            />
          </div>
        ) : null}

        {!loading && clothesData !== undefined ? (
          <div
            className={
              currentPage === Math.ceil(clothesData.length / postMaxlength)
                ? "viewMore-button remove"
                : "viewMore-button"
            }
            onClick={(e) => nextPage(e)}
          >
            <span>view more</span>
            <IoIosArrowDown />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default ClothesPeed;
