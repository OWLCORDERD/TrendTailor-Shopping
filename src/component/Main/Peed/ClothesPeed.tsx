"use client";

import Image from "next/image";
import "styles/clothesPeed.scss";
import { clothes } from "./Peed";
import { useCallback, useEffect, useState } from "react";
import { RotatingLines } from "react-loader-spinner";
import { useContext } from "react";
import { ThemeContext } from "../../../../context/ThemeContext";
import { IoIosArrowDown } from "react-icons/io";

interface propsClothesType {
  clothesDB: clothes[];
}

const ClothesPeed = ({ clothesDB }: any) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const postMaxlength = 8;
  const lastIndex = currentPage * postMaxlength;
  const firstIndex = lastIndex - postMaxlength;
  const [currentDB, setCurrentDB] = useState<clothes[]>([]);
  const { mode } = useContext(ThemeContext);

  const currentDBUpdate = useCallback(() => {
    const currentData: clothes[] = clothesDB.slice(firstIndex, lastIndex);

    const pushdata = [...currentDB];

    pushdata.push(...currentData);

    setCurrentDB(pushdata);
  }, [currentPage]);

  const nextPage = (e: React.MouseEvent<HTMLDivElement>) => {
    const maxPage = Math.ceil(clothesDB.length / postMaxlength);

    if (currentPage < maxPage) {
      setCurrentPage((prev) => {
        return prev + 1;
      });
    }
  };

  useEffect(() => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      currentDBUpdate();
    }, 1500);
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
        {currentDB?.map((item) => {
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
        {loading ? (
          <div className='loading-spinner'>
            <RotatingLines
              strokeColor={
                mode === "dark" ? "rgba(255,255,255,0.8)" : "rgba(0,0,0,0.8)"
              }
              strokeWidth='3'
              animationDuration='0.75'
              width='50'
              visible={true}
            />
          </div>
        ) : (
          <div
            className={
              currentPage === Math.ceil(clothesDB.length / postMaxlength)
                ? "viewMore-button remove"
                : "viewMore-button"
            }
            onClick={(e) => nextPage(e)}
          >
            <span>view more</span>
            <IoIosArrowDown />
          </div>
        )}
      </div>
    </div>
  );
};

export default ClothesPeed;
