import { useAppDispatch, useAppSelector } from "@/store/hooks";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Trendly as CSS, Search } from "@/styles";
import { v4 as uuidV4 } from "uuid";
import Image from "next/image";
import Chatbot from "@/assets/images/chatbot.png";
import { useSession } from "next-auth/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Scrollbar } from "swiper/modules";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import searchError from "@/assets/images/search-error.png";
import {
  retryRecommendOpenAI,
  updateChannelDetail,
} from "@/store/chatBubbleSlice";
import Detail from "./Detail";

interface ResultTemplate {
  index: {
    templateId: string;
    title: string;
  };
  channelList: {
    title: string;
    content: consultantChannelType[];
  };
}

const Result = () => {
  const { data } = useSession();
  // 실시간 결과 저장할 고유 세션 아이디 생성 (대화 내역 세션 저장용)
  const sessionId = uuidV4();
  // 컨설팅 검색 결과 채널 목록 데이터
  const consultingResultData = useAppSelector(
    (state) => state.chatBubble.consultingResultData
  );
  const dispatch = useAppDispatch();

  // 채널 선택 시, 채널 상세 모드 관리
  const detailMode = useAppSelector(
    (state) => state.chatBubble.consultantDetailMode
  );

  const aiRecommendTemplate: ResultTemplate = useMemo(() => {
    const template: ResultTemplate = {
      index: {
        templateId: sessionId,
        title: "회원님에게 딱 맞는 컨설턴트 탐색을 완료했어요!",
      },
      // 컨설턴트 유튜버 목록
      channelList: {
        title: `${data?.user?.name}님의 설문 답변들을 통한 컨설턴트 검색이 완료되었습니다!
        각 컨설턴트를 선택하여 상세 프로필을 확인해보세요!`,
        content: [],
      },
    };

    //
    if (consultingResultData) {
      template.channelList.content =
        consultingResultData.content.channelList || [];
    }

    return template;
  }, [consultingResultData]);

  const currentChannelDetail = (channel: consultantChannelType) => {
    dispatch(updateChannelDetail(channel));
  };

  const chatArea = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatArea.current) {
      chatArea.current.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }, [detailMode]);

  return (
    <CSS.RecommendResult ref={chatArea}>
      {detailMode && <Detail />}
      {aiRecommendTemplate.channelList.content.length > 0 ? (
        <>
          {!detailMode && (
            <>
              <CSS.ResultHeader>
                <Image src={Chatbot} width={80} height={60} alt='챗봇 아이콘' />
                <h3 className='result-txt'>
                  {aiRecommendTemplate.index.title}
                </h3>
              </CSS.ResultHeader>

              <CSS.ResultSection>
                {/* 추천 컨설턴트 채널 조회된 경우, 슬라이드 목록 */}
                <div className='step-bubble'>
                  <span>{aiRecommendTemplate.channelList.title}</span>
                </div>

                <CSS.ChannelSlider>
                  <CSS.SlideWrap>
                    <Swiper
                      slidesPerView={"auto"}
                      navigation={{
                        nextEl: ".next-btn",
                        prevEl: ".prev-btn",
                      }}
                      modules={[Navigation, Scrollbar]}
                      speed={1000}
                      spaceBetween={20}
                    >
                      {aiRecommendTemplate.channelList.content.map(
                        (channel) => {
                          return (
                            <SwiperSlide key={channel.snippet.customUrl}>
                              <div
                                className='channel-item'
                                onClick={() => currentChannelDetail(channel)}
                              >
                                <div className='channel-thumbnail'>
                                  <Image
                                    src={channel.snippet.thumbnails.high.url}
                                    width={150}
                                    height={150}
                                    alt={
                                      channel.snippet.title +
                                      "유튜브 채널 썸네일"
                                    }
                                  />
                                </div>

                                <div className='channel-info'>
                                  <p className='channel-name'>
                                    {channel.snippet.title}
                                  </p>
                                  <div className='channel-subscriber'>
                                    <span>구독자</span>
                                    <span>
                                      {channel.statistics.subscriberCount}명
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </SwiperSlide>
                          );
                        }
                      )}
                    </Swiper>
                  </CSS.SlideWrap>

                  <CSS.ControlButton
                    aria-label='slide prev button'
                    className='prev-btn'
                    $type={"prev"}
                  >
                    <IoIosArrowBack />
                  </CSS.ControlButton>

                  <CSS.ControlButton
                    aria-label='slide next button'
                    className='next-btn'
                    $type={"next"}
                  >
                    <IoIosArrowForward />
                  </CSS.ControlButton>
                </CSS.ChannelSlider>
              </CSS.ResultSection>
            </>
          )}
        </>
      ) : (
        <CSS.ResultError>
          {/* 추천 컨설턴트 채널 검색 실패 시, 활성화 화면 */}
          <div className='error-icon'>
            <Image
              src={searchError}
              width={140}
              height={140}
              alt='검색 실패 아이콘'
            />
          </div>

          <div className='txt-wrap'>
            <h1 className='error-txt'>
              서버 혹은 프롬프트 오류로 인해 <br />
              컨설턴트 검색에 실패하였습니다.
            </h1>

            <span className='error-sub-txt'>
              선택한 답변들로 다시 시도하시겠습니까?
            </span>
          </div>

          <button
            type='button'
            className='retry-btn'
            onClick={() => dispatch(retryRecommendOpenAI())}
          >
            재요청하기
          </button>
        </CSS.ResultError>
      )}
    </CSS.RecommendResult>
  );
};

export default Result;
