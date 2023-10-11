import "styles/seasonPeed.scss";
import { clothes } from "./Peed";

interface seasonType {
  month: number;
  season: string;
}

async function getClothesDB() {
  const res = await fetch(`/api/clothes`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("not connect clothes db");
  }

  return res.json();
}

async function getSeasonDB() {
  const res = await fetch(`/api/season`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("not connect season db");
  }

  return res.json();
}

const SeasonPeed: any = async () => {
  const clothesDB: clothes[] = await getClothesDB().then((res) => res.data);

  const seasonDB: seasonType[] = await getSeasonDB().then((res) => res.data);

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
                <img src={item.image} alt='ClothesImg' />
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
