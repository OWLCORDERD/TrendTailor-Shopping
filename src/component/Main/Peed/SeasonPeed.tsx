import { useState, useEffect, useRef } from "react";
import { AiOutlineLeft, AiOutlineRight, AiOutlinePlus } from "react-icons/ai";
import "styles/seasonPeed.scss";
import UseFetch from "component/UseFetch";

interface seasonType {
  month: number;
  season: string;
}

export interface clothes {
  type: string;
  title: string;
  link: string;
  image: string;
  price: string;
  mallName: string;
  productId: string;
  productType: string;
  brand: string;
  maker: string;
  category1: string;
  category2: string;
  category3: string;
  category4: string;
}

const SeasonPeed = (): JSX.Element => {
  const clothesItem: clothes[] = UseFetch("http://localhost:3001/items");

  const seasonlist: seasonType[] = UseFetch("http://localhost:3001/season");

  const productRef = useRef<HTMLDivElement>(null);

  const [productWidth, setProductWidth] = useState<number>(0);

  const [slideWidth, setSlideWidth] = useState<number>(0);

  const date = new Date();

  const nowMonth = date.getMonth();

  const monthState = seasonlist.filter((item) => item.month === nowMonth);

  const seasonClothes = clothesItem.filter(
    (item) => item.category4 === monthState[0]?.season
  );

  useEffect(() => {
    if (productWidth) return;
    const itemWidth = productRef.current?.clientWidth;

    if (itemWidth !== undefined) {
      setProductWidth(productWidth + itemWidth + 20);
    }
  }, [seasonClothes]);

  const beforeSlide = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (slideWidth > 0) {
      setSlideWidth(slideWidth - productWidth);
    }
  };

  const nextSlide = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (slideWidth < 3520) {
      setSlideWidth(slideWidth + productWidth);
    }
  };

  return (
    <div className='SeasonPeed-container'>
      <div className='Season-titleBox'>
        <h1 className='Season-title'>{monthState[0]?.season}</h1>

        <button type='button' className='viewMore-button'>
          <span>view more</span>
          <AiOutlinePlus fill='#656565' fontSize='1rem' />
        </button>
      </div>

      <div className='Season-slider'>
        <div className='Slide-control'>
          <button
            type='button'
            className='slide-before'
            onClick={(e) => beforeSlide(e)}
          >
            <AiOutlineLeft />
          </button>

          <button
            type='button'
            className='slide-next'
            onClick={(e) => nextSlide(e)}
          >
            <AiOutlineRight />
          </button>
        </div>
        <div
          className='slider-wrap'
          style={{ left: `-${slideWidth}px`, transition: "all 0.5s ease-in" }}
        >
          {seasonClothes.map((item) => {
            return (
              <div
                className='product-item'
                key={item.productId}
                ref={productRef}
              >
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
    </div>
  );
};

export default SeasonPeed;
