import Footer from "component/Main/Footer";
import Navbar from "component/Main/Navbar";
import TrendChannel from "component/Trend/TrendChannel";
import TrendVideoList from "component/Trend/TrendVideoList";
import { ScrollToTop } from "component/fetchDB/ScrollToTop";
import React from "react";
import "styles/trend.scss";

export interface channelDataType {
  etag: string;
  id: string;
  kind: string;
  snippet: {
    country: string;
    customUrl: string;
    defaultLanguage: string;
    description: string;
    thumbnails: {
      default: {
        height: number;
        url: string;
        width: number;
      };
      high: {
        height: number;
        url: string;
        width: number;
      };
      medium: {
        height: number;
        url: string;
        width: number;
      };
    };
    title: string;
    publishedAt: string;
  };
}

export interface videoType {
  id: {
    kind: string;
    videoId: string;
  };
  snippet: {
    channelId: string;
    channelTitle: string;
    description: string;
    thumbnails: {
      high: {
        url: string;
      };
    };
    title: string;
  };
}

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

const page = async () => {
  const videoData: videoType[] = await getYoutubeDB();
  const channelData: channelDataType[] = await getChannelData();
  return (
    <main>
      <section className='Trend-container'>
        <TrendChannel channelData={channelData} />
        <TrendVideoList channelData={channelData} videoData={videoData} />
      </section>
    </main>
  );
};

export default page;
