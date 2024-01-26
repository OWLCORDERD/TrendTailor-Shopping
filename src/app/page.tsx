import Navbar from "component/Main/Navbar";
import Peed from "component/Main/Peed/Peed";
import Footer from "component/Main/Footer";
import "./page.module.css";
import { NoticeType } from "./notice/page";

export interface slideType {
  id: number;
  image: string;
  title: string;
  info: string;
}

const slideDBFetch = async () => {
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

const noticeFetch = async () => {
  const res = await fetch(`${process.env.SERVER_HOST}/limitNotice`, {
    cache: "no-store",
  });

  if (!res.ok) {
    console.log(res);
  }

  const data = await res.json();

  return data;
};

export const dynamicPage = "force-dynamic";

export default async function Home() {
  const noticeDB: NoticeType[] = await noticeFetch();
  const slideDB: slideType[] = await slideDBFetch();

  return (
    <>
      <Navbar />
      <main className='container'>
        <Peed noticeDB={noticeDB} slideDB={slideDB} />
      </main>
      <Footer />
    </>
  );
}
