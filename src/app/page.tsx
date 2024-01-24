import Navbar from "component/Main/Navbar";
import Peed from "component/Main/Peed/Peed";
import "./page.module.css";
import Footer from "component/Main/Footer";

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

export interface seasonType {
  month: number;
  season: string;
}

export interface slideType {
  id: number;
  image: string;
  title: string;
  info: string;
}

const SlideDBFetch = async () => {
  const res = await fetch(`${process.env.SERVER_HOST}/wishMainSlider`, {
    cache: "no-store",
  });

  try {
    if (res.ok) {
      const data = await res.json();
      return data;
    }
  } catch (err) {
    console.log(err);
  }
};

const getClothesDB = async () => {
  const res = await fetch(`${process.env.SERVER_HOST}/clothes`, {
    cache: "no-store",
  });

  try {
    if (res.ok) {
      const data = await res.json();
      return data;
    }
  } catch (err) {
    console.log(err);
  }
};

const getSeasonDB = async () => {
  const res = await fetch(`${process.env.SERVER_HOST}/season`, {
    cache: "no-store",
  });

  try {
    if (res.ok) {
      const data = await res.json();
      return data;
    }
  } catch (err) {
    console.log(err);
  }
};

export default async function Home() {
  const clothesDB: clothes[] = await getClothesDB();
  const seasonDB: seasonType[] = await getSeasonDB();
  const slideDB: slideType[] = await SlideDBFetch();

  return (
    <>
      <Navbar />
      <main className='container'>
        <Peed clothesDB={clothesDB} seasonDB={seasonDB} slideDB={slideDB} />
      </main>
      <Footer />
    </>
  );
}
