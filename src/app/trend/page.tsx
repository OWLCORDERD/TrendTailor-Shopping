import Footer from "component/Main/Footer";
import Navbar from "component/Main/Navbar";
import { videoType } from "component/Main/Peed/Peed";
import TrendChannel from "component/Trend/TrendChannel";
import TrendVideoList from "component/Trend/TrendVideoList";
import React from "react";
import "styles/trend.scss";

const getYoutubeDB = async () => {
  const youtubeAPI = "https://www.googleapis.com/youtube/v3/search";

  try {
    const res = await fetch(
      `${youtubeAPI}?part=snippet&maxResults=20&channelId=UC8a6z7i9qypp9PqJ_0HhBrw&type=video&videoDuration=medium&key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}`,
      {
        cache: "no-store",
      }
    );

    const data = await res.json();

    return data.items;
  } catch (err) {
    console.log(err);
  }
};

const page = async () => {
  const youtubeDB: videoType[] = await getYoutubeDB();

  return (
    <>
      <Navbar />
      <main>
        <section className='Trend-container'>
          <TrendChannel />
          <TrendVideoList youtubeDB={youtubeDB} />
        </section>
      </main>
      <Footer />
    </>
  );
};

export default page;
