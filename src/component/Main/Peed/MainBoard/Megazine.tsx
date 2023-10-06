import Link from "next/link";
import React from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";

interface itemType {
  id: number;
  img_url: string;
  title: string;
  username: string;
  info: string;
}

const Megazine = () => {
  const items: itemType[] = [
    {
      id: 1,
      img_url: "/News/Avandress.jpg",
      title: "스트릿 폼 제대로! 지금 가볍게 레이서 룩",
      username: "무신사스토어",
      info: "요즘 딱 필요한 나일론 아이템, 낫포너드만 기억하자.",
    },
    {
      id: 2,
      img_url: "/News/Avandress.jpg",
      title: "스트릿 폼 제대로! 지금 가볍게 레이서 룩",
      username: "무신사스토어",
      info: "요즘 딱 필요한 나일론 아이템, 낫포너드만 기억하자.",
    },
    {
      id: 3,
      img_url: "/News/Avandress.jpg",
      title: "스트릿 폼 제대로! 지금 가볍게 레이서 룩",
      username: "무신사스토어",
      info: "요즘 딱 필요한 나일론 아이템, 낫포너드만 기억하자.",
    },
    {
      id: 4,
      img_url: "/News/Avandress.jpg",
      title: "스트릿 폼 제대로! 지금 가볍게 레이서 룩",
      username: "무신사스토어",
      info: "요즘 딱 필요한 나일론 아이템, 낫포너드만 기억하자.",
    },
    {
      id: 5,
      img_url: "/News/Avandress.jpg",
      title: "스트릿 폼 제대로! 지금 가볍게 레이서 룩",
      username: "무신사스토어",
      info: "요즘 딱 필요한 나일론 아이템, 낫포너드만 기억하자.",
    },
    {
      id: 6,
      img_url: "/News/Avandress.jpg",
      title: "스트릿 폼 제대로! 지금 가볍게 레이서 룩",
      username: "무신사스토어",
      info: "요즘 딱 필요한 나일론 아이템, 낫포너드만 기억하자.",
    },
  ];
  return (
    <div className='Megazine-container'>
      <div className='Megazine-titleBox'>
        <div className='Megazine-title'>
          <h1>Style Megazine</h1>
          <Link href='/' className='view-more'>
            <AiOutlinePlus />
          </Link>
        </div>

        <ul className='Megazine-list'>
          <li>
            <a href='#' className='active'>
              musinsa
            </a>
          </li>

          <li>
            <a href='#'>sona</a>
          </li>
        </ul>
      </div>

      <div className='Megazine-slideBox'>
        <div className='slide-control'>
          <button className='slide-before' type='button'>
            <IoIosArrowBack color={"#000"} />
          </button>

          <button className='slide-next' type='button'>
            <IoIosArrowForward color={"#000"} />
          </button>
        </div>

        <div className='Megazine-slider'>
          {items.map((item) => {
            return (
              <div className='Megazine-Card' key={item.id}>
                <div className='item-imgBox'>
                  <img src={item.img_url} alt='' />
                </div>

                <div className='item-infoBox'>
                  <h2 className='item-title'>{item.title}</h2>

                  <div className='item-info'>
                    <p>{item.info}</p>
                  </div>
                </div>

                <div className='Megazine-publisher'>
                  <span>{item.username}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Megazine;
