"use client";

import Image from "next/image";
import "styles/clothesPeed.scss";
import { useCallback, useContext, useEffect, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { clothes } from "./Peed";
import { commonService } from "component/fetchDB";
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

  const fetchClothesData = () => {
    commonService.getClothes().then((res) => setClothesData(res));
  };

  const firstCurrentData = () => {
    if (clothesData !== undefined) {
      const currentData: clothes[] = clothesData.slice(firstIndex, lastIndex);

      const pushdata = [...currentDB];

      pushdata.push(...currentData);

      setCurrentDB(pushdata);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchClothesData();
  }, []);

  useEffect(() => {
    setLoading(true);

    setTimeout(() => {
      currentDBUpdate();
      setLoading(false);
    }, 1000);
  }, [currentPage]);

  useEffect(() => {
    if (clothesData !== undefined) {
      setTimeout(() => {
        firstCurrentData();
        setLoading(false);
      }, 1000);
    }
  }, [clothesData]);

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
                <span className='product-price'>{item.price}</span>
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
