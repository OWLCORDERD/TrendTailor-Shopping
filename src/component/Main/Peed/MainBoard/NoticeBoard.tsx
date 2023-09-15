import { NoticeType } from "app/notice/page";
import React, { useState, useEffect } from "react";
import { Oval } from "react-loader-spinner";

interface propsNotice {
  noticeDB: NoticeType[];
  loader: boolean;
}

const NoticeBoard = ({ noticeDB, loader }: propsNotice) => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [loop, setLoop] = useState<any>();

  useEffect(() => {
    const swiperLoop = setTimeout(() => {
      setCurrentSlide((prev) => {
        if (prev < noticeDB.length - 1) {
          return prev + 1;
        }
        return 0;
      });
    }, 5000);

    setLoop(swiperLoop);

    return () => {
      clearTimeout(loop);
    };
  }, [currentSlide, setCurrentSlide, noticeDB]);
  return (
    <div className='Notice-container'>
      <div className='Notice-board'>
        <div className='Notice-titleBox'>
          <h1 className='Notice-title'>Notice</h1>
        </div>

        <div className='Notice-slider'>
          {loader ? (
            <div className='loader'>
              <Oval
                height={40}
                width={40}
                color='#333333'
                wrapperStyle={{}}
                wrapperClass=''
                visible={true}
                ariaLabel='oval-loading'
                secondaryColor='#999999'
                strokeWidth={2}
                strokeWidthSecondary={2}
              />
            </div>
          ) : (
            <ul
              className='list-slider'
              style={{
                top: `-${currentSlide}00%`,
                transitionDuration: "1s",
              }}
            >
              {noticeDB.map((item) => {
                return (
                  <li key={item.idx}>
                    <a href='#'>
                      <h2>{item.title}</h2>
                      <span>{item.date.slice(0, 10)}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default NoticeBoard;
