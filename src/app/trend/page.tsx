import Footer from "component/Main/Footer";
import Navbar from "component/Main/Navbar";
import { getYoutubeDB, videoType } from "component/Main/Peed/Peed";
import TrendChannel from "component/Trend/TrendChannel";
import TrendVideoList from "component/Trend/TrendVideoList";
import React from "react";
import "styles/trend.scss";

const page = async () => {
  const youtubeDB: videoType[] = await getYoutubeDB();

  /*
  const ExampleData: videoType[] = [
    {
      id: {
        kind: "video",
        videoId: "1",
      },
      snippet: {
        channelId: "1",
        channelTitle: "크리스마스 캐롤 송",
        description:
          "유튜브 api 요청 초과로 fetch 실패 시 임시로 사용할 더미 데이터입니다.",
        thumbnails: {
          high: {
            url: "https://i.ytimg.com/vi/yrU3ac44mWQ/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLASvsu_CTkbK4VPcT3IfS6ah-ThDg",
          },
        },
        title: "임시 비디오 더미 데이터입니다.",
      },
    },
    {
      id: {
        kind: "video",
        videoId: "2",
      },
      snippet: {
        channelId: "2",
        channelTitle: "QWER OUR STAGE",
        description:
          "유튜브 api 요청 초과로 fetch 실패 시 임시로 사용할 더미 데이터입니다.",
        thumbnails: {
          high: {
            url: "https://i.ytimg.com/vi/Ieb8IOiFfhk/hqdefault.jpg?sqp=-oaymwEXCOADEI4CSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLC5sGOPZcOWUtuDSqrs2ynhrZH58w",
          },
        },
        title: "임시 비디오 더미 데이터입니다.",
      },
    },
    {
      id: {
        kind: "video",
        videoId: "3",
      },
      snippet: {
        channelId: "3",
        channelTitle:
          "너와 맞잡고 있었던 핫팩처럼 겨울에 들으려고 모아둔 따뜻한 노래",
        description:
          "유튜브 api 요청 초과로 fetch 실패 시 임시로 사용할 더미 데이터입니다.",
        thumbnails: {
          high: {
            url: "https://i.ytimg.com/vi/-KQABrJMVO4/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDq21_m1kEh5QdtdaexkCIkPbs3mw",
          },
        },
        title: "임시 비디오 더미 데이터입니다.",
      },
    },
    {
      id: {
        kind: "video",
        videoId: "4",
      },
      snippet: {
        channelId: "4",
        channelTitle: "크리스마스 캐롤 송",
        description:
          "유튜브 api 요청 초과로 fetch 실패 시 임시로 사용할 더미 데이터입니다.",
        thumbnails: {
          high: {
            url: "https://i.ytimg.com/vi/yrU3ac44mWQ/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLASvsu_CTkbK4VPcT3IfS6ah-ThDg",
          },
        },
        title: "임시 비디오 더미 데이터입니다.",
      },
    },
    {
      id: {
        kind: "video",
        videoId: "5",
      },
      snippet: {
        channelId: "5",
        channelTitle: "QWER OUR STAGE",
        description:
          "유튜브 api 요청 초과로 fetch 실패 시 임시로 사용할 더미 데이터입니다.",
        thumbnails: {
          high: {
            url: "https://i.ytimg.com/vi/Ieb8IOiFfhk/hqdefault.jpg?sqp=-oaymwEXCOADEI4CSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLC5sGOPZcOWUtuDSqrs2ynhrZH58w",
          },
        },
        title: "임시 비디오 더미 데이터입니다.",
      },
    },
    {
      id: {
        kind: "video",
        videoId: "6",
      },
      snippet: {
        channelId: "6",
        channelTitle: "",
        description:
          "유튜브 api 요청 초과로 fetch 실패 시 임시로 사용할 더미 데이터입니다.",
        thumbnails: {
          high: {
            url: "https://i.ytimg.com/vi/-KQABrJMVO4/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDq21_m1kEh5QdtdaexkCIkPbs3mw",
          },
        },
        title: "임시 비디오 더미 데이터입니다.",
      },
    },
    {
      id: {
        kind: "video",
        videoId: "7",
      },
      snippet: {
        channelId: "7",
        channelTitle: "",
        description:
          "유튜브 api 요청 초과로 fetch 실패 시 임시로 사용할 더미 데이터입니다.",
        thumbnails: {
          high: {
            url: "https://i.ytimg.com/vi/-KQABrJMVO4/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDq21_m1kEh5QdtdaexkCIkPbs3mw",
          },
        },
        title: "임시 비디오 더미 데이터입니다.",
      },
    },
    {
      id: {
        kind: "video",
        videoId: "8",
      },
      snippet: {
        channelId: "8",
        channelTitle: "",
        description:
          "유튜브 api 요청 초과로 fetch 실패 시 임시로 사용할 더미 데이터입니다.",
        thumbnails: {
          high: {
            url: "https://i.ytimg.com/vi/-KQABrJMVO4/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDq21_m1kEh5QdtdaexkCIkPbs3mw",
          },
        },
        title: "임시 비디오 더미 데이터입니다.",
      },
    },
    {
      id: {
        kind: "video",
        videoId: "9",
      },
      snippet: {
        channelId: "9",
        channelTitle: "",
        description:
          "유튜브 api 요청 초과로 fetch 실패 시 임시로 사용할 더미 데이터입니다.",
        thumbnails: {
          high: {
            url: "https://i.ytimg.com/vi/-KQABrJMVO4/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDq21_m1kEh5QdtdaexkCIkPbs3mw",
          },
        },
        title: "임시 비디오 더미 데이터입니다.",
      },
    },
    {
      id: {
        kind: "video",
        videoId: "10",
      },
      snippet: {
        channelId: "10",
        channelTitle: "",
        description:
          "유튜브 api 요청 초과로 fetch 실패 시 임시로 사용할 더미 데이터입니다.",
        thumbnails: {
          high: {
            url: "https://i.ytimg.com/vi/-KQABrJMVO4/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDq21_m1kEh5QdtdaexkCIkPbs3mw",
          },
        },
        title: "임시 비디오 더미 데이터입니다.",
      },
    },
    {
      id: {
        kind: "video",
        videoId: "11",
      },
      snippet: {
        channelId: "11",
        channelTitle: "",
        description:
          "유튜브 api 요청 초과로 fetch 실패 시 임시로 사용할 더미 데이터입니다.",
        thumbnails: {
          high: {
            url: "https://i.ytimg.com/vi/-KQABrJMVO4/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDq21_m1kEh5QdtdaexkCIkPbs3mw",
          },
        },
        title: "임시 비디오 더미 데이터입니다.",
      },
    },
    {
      id: {
        kind: "video",
        videoId: "12",
      },
      snippet: {
        channelId: "12",
        channelTitle: "",
        description:
          "유튜브 api 요청 초과로 fetch 실패 시 임시로 사용할 더미 데이터입니다.",
        thumbnails: {
          high: {
            url: "https://i.ytimg.com/vi/-KQABrJMVO4/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDq21_m1kEh5QdtdaexkCIkPbs3mw",
          },
        },
        title: "임시 비디오 더미 데이터입니다.",
      },
    },
  ];
  */
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
