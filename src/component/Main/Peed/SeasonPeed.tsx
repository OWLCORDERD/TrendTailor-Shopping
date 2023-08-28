import { useState, useEffect, useRef } from "react";
import { AiOutlineLeft, AiOutlineRight, AiOutlinePlus } from "react-icons/ai";
import "styles/seasonPeed.scss";
import { commonService } from "component/fetchDB";
import { clothes } from "./Peed";

interface seasonType {
  month: number;
  season: string;
}

const SeasonPeed = (): JSX.Element => {
  const [clothesDB, setClothesDB] = useState<clothes[]>([]);

  const [seasonDB, setSeasonDB] = useState<seasonType[]>([]);

  const date = new Date();

  const nowMonth = date.getMonth();

  const monthState = seasonDB.filter((item) => item.month === nowMonth);

  const seasonClothes = clothesDB.filter(
    (item) => item.category4 === monthState[0]?.season
  );

  useEffect(() => {
    getClothesDB();
    getSeasonDB();
  }, []);

  const getClothesDB = async () => {
    commonService
      .getClothes()
      .then((res) => res.data)
      .then((data) => setClothesDB(data));
  };

  const getSeasonDB = async () => {
    commonService
      .getSeason()
      .then((res) => res.data)
      .then((data) => setSeasonDB(data));
  };

  return (
    <div className='SeasonPeed-container'>
      <div className='Season-titleBox'>
        <h1 className='Season-title'>{monthState[0]?.season}</h1>
        <p className='season-info'>
          현재 계절에 맞는 WISH 독점 의류들을 추천합니다.
        </p>
      </div>

      <div className='slider-wrap'>
        {seasonClothes.map((item) => {
          return (
            <div className='product-item' key={item.productId}>
              <div className='slide-ImgBox'>
                <img src={item.image} alt='ClothesImg' />
              </div>

              <div className='product-content'>
                <h2 className='product-title'>{item.title}</h2>
                <p className='product-mall'>{item.mallName}</p>
                <span className='product-price'>{item.price}원</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SeasonPeed;
