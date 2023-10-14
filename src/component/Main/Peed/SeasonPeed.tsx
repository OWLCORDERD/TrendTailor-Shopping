import Image from "next/image";
import "styles/seasonPeed.scss";
import { clothes, seasonType } from "./Peed";

interface propsDataType {
  clothesDB: clothes[];
  seasonDB: seasonType[];
}

const SeasonPeed = ({ clothesDB, seasonDB }: propsDataType) => {
  const date = new Date();

  const nowMonth = date.getMonth() + 1;

  const monthState = seasonDB.filter((item) => item.month === nowMonth);

  const seasonClothes = clothesDB.filter(
    (item) => item.category4 === monthState[0]?.season
  );

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
                <Image src={item.image} alt='ClothesImg' />
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
    </div>
  );
};

export default SeasonPeed;
