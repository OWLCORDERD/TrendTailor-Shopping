"use client";
import React from "react";
import { clothes, peedFetchDBType, seasonType } from "./Peed";
import Image from "next/image";
import "styles/seasonPeed.scss";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const SeasonPeed = ({ seasonDB, clothesDB }: peedFetchDBType) => {
  const date = new Date();

  const month = date.getMonth() + 1;

  const filterSeason: seasonType[] = seasonDB.filter(
    (season) => season.month === month
  );

  const seasonClothes: clothes[] = clothesDB.filter(
    (clothes) => clothes.category4 === filterSeason[0].season
  );
  return (
    <div className='SeasonPeed-container'>
      <div className='SeasonPeed-title'>
        <h1>Seasonal collection</h1>
      </div>

      <div className='SeasonPeed-slider'>
        <div className='slide-wrap'>
          {seasonClothes.map((clothes) => {
            return (
              <div className='slide-item' key={clothes.productId}>
                <div className='product-imgBox'>
                  <Image
                    src={clothes.image}
                    alt='시즌 추천 의류'
                    width='600'
                    height='600'
                  />
                </div>

                <div className='product-info'>
                  <div className='product-name'>
                    <h2>{clothes.title}</h2>
                  </div>

                  <div className='product-brand'>
                    <p>{clothes.brand}</p>
                  </div>

                  <div className='product-price'>
                    <span>{clothes.price}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className='slide-prev'>
          <IoIosArrowBack color='#fff' fontSize={40} />
        </div>

        <div className='slide-next'>
          <IoIosArrowForward color='#fff' fontSize={40} />
        </div>
      </div>
    </div>
  );
};

export default SeasonPeed;
