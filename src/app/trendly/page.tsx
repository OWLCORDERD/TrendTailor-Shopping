import ChatIntro from "@/component/Trend/Intro";
import React from "react";

/*
const getYoutubeDB = async () => {
  const youtubeAPI = "https://www.googleapis.com/youtube/v3/search";

  try {
    const res = await fetch(
      `${youtubeAPI}?part=snippet&maxResults=50&channelId=UC8a6z7i9qypp9PqJ_0HhBrw&type=video&videoDuration=medium&key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}`,
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
*/

/*
const getChannelData = async () => {
  const youtubeAPI = "https://www.googleapis.com/youtube/v3/channels";

  try {
    const res = await fetch(
      `${youtubeAPI}?part=snippet&id=UC8a6z7i9qypp9PqJ_0HhBrw&key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}`,
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
*/

const page = async () => {
  return (
    <section className='trendly-container'>
      {/* 인트로 화면 */}
      <ChatIntro />
      {/* <TrendVideoList channelData={channelData} videoData={videoData} /> */}
    </section>
  );
};

export default page;
